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
    Col,
    Row,
    Table
} from 'reactstrap';

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
            color: row => editable(row, editedRow) ? 'danger' : 'primary'
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
        <Table>
            <thead>
                <tr>
                    {columns.map(column =>
                        <th
                            key={column.property.toString()}
                            {...(canSort(column) && { role: 'button' })}
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
                        </th>
                    )}
                    {actions && actions.length &&
                        <th>Actions</th>
                    }
                </tr>
            </thead>

            <tbody>
                {data.map(item =>
                    <tr key={String(item[rowKey])}>
                        {columns.map(column =>
                            <td key={column.property.toString()}>
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
                            </td>
                        )}
                        {actions && actions.length &&
                            <td>
                                <Row>
                                    {[...actions, ...(defaultActions ?? [])]
                                        .filter(action => !action.visible || action.visible(item))
                                        .map(action =>
                                            <Col
                                                xs="auto"
                                                key={action.title(item)}
                                            >
                                                <Button
                                                    onClick={() => action.onClick(item)}
                                                    color={action.color && action.color(item)}
                                                    size="sm"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={action.icon(item)}
                                                    />
                                                </Button>
                                            </Col>
                                        )}
                                </Row>
                            </td>
                        }
                    </tr>
                )}
            </tbody>
        </Table >
    );
};

export default AppTable;
