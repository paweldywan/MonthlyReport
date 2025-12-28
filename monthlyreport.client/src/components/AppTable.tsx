import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
    Sort,
    TableAction,
    TableColumn
} from "../interfaces";

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box
} from '@mui/material';

import {
    useCallback,
    useMemo,
    useState
} from "react";

import {
    faCancel,
    faCheck,
    faPencil,
    faChevronUp,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import {
    IconProp
} from '@fortawesome/fontawesome-svg-core';

import {
    getErrors
} from "../utils";

import AppInput from "./AppInput";

interface Props<T> {
    data: T[];
    columns: TableColumn<T>[];
    rowKey: keyof T;
    actions?: TableAction<T>[];
    editable?: (row: T, currentRow?: T) => boolean;
    updateRow: (entry: T) => Promise<Response>;
    sort?: Sort<T>;
    setSort?: (sort: Sort<T>) => void;
}

const AppTable = <T,>({
    data,
    columns,
    rowKey,
    actions,
    editable,
    updateRow,
    sort,
    setSort
}: Props<T>) => {
    const [editedRow, setEditedRow] = useState<T>();

    const [errors, setErrors] = useState<Record<string, string>>();

    const defaultActions = useMemo<TableAction<T>[] | undefined>(() => editable && [
        {
            icon: row => editable(row, editedRow) ? faCancel as IconProp : faPencil as IconProp,
            title: row => editable(row, editedRow) ? 'Cancel' : 'Edit',
            onClick: row => {
                if (editable(row, editedRow)) {
                    setEditedRow(undefined);

                    setErrors(undefined);
                }
                else {
                    setEditedRow(row);
                }
            },
            color: row => editable(row, editedRow) ? 'error' : 'primary'
        },
        {
            icon: () => faCheck as IconProp,
            title: () => 'Save',
            onClick: async () => {
                if (editedRow) {
                    const response = await updateRow(editedRow);

                    const errors = await getErrors(response);

                    if (errors) {
                        setErrors(errors);
                    }
                    else {
                        setEditedRow(undefined);

                        setErrors(undefined);
                    }
                }
            },
            color: () => 'success',
            visible: row => editable(row, editedRow)
        }
    ], [editable, editedRow, updateRow]);

    const canSort = useCallback((column: TableColumn<T>) => column.sortable && sort && setSort, [setSort, sort]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(column =>
                            <TableCell
                                key={column.property.toString()}
                                sx={{ cursor: canSort(column) ? 'pointer' : 'default' }}
                                onClick={canSort(column) ? () =>
                                    setSort!({
                                        property: column.property,
                                        direction: sort!.property === column.property && sort!.direction === 'asc' ? 'desc' :
                                            sort!.direction === 'desc' ? undefined : 'asc'
                                    }) : undefined}
                            >
                                {column.label}
                                {" "}
                                {canSort(column) && sort!.property === column.property && sort!.direction &&
                                    <FontAwesomeIcon icon={sort!.direction == 'asc' ? faChevronUp as IconProp : faChevronDown as IconProp} />}
                            </TableCell>
                        )}
                        {actions && actions.length &&
                            <TableCell>Actions</TableCell>
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(item =>
                        <TableRow key={String(item[rowKey])}>
                            {columns.map(column =>
                                <TableCell key={column.property.toString()}>
                                    {column.editable && column.editable(item, editedRow) && editedRow ?
                                        <AppInput
                                            type={column.type}
                                            data={editedRow}
                                            setData={setEditedRow}
                                            property={column.property}
                                            errors={errors}
                                        /> :
                                        column.formatter ? column.formatter(String(item[column.property])) : String(item[column.property])
                                    }
                                </TableCell>
                            )}
                            {actions && actions.length &&
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {[...actions, ...(defaultActions ?? [])]
                                            .filter(action => !action.visible || action.visible(item))
                                            .map(action =>
                                                <Button
                                                    key={action.title(item)}
                                                    onClick={() => action.onClick(item)}
                                                    color={(action.color && action.color(item)) as 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined}
                                                    size="small"
                                                    variant="contained"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={action.icon(item)}
                                                    />
                                                </Button>
                                            )}
                                    </Box>
                                </TableCell>
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </TableContainer>
    );
};

export default AppTable;