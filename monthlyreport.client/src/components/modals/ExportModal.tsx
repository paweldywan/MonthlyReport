import {
    useCallback,
    useMemo,
    useState
} from "react";

import AppForm from "../AppForm";

import AppModal from "../AppModal";

import {
    Export,
    ExportColumn,
    ExportType,
    FormInput
} from "../../interfaces";

import {
    exportData
} from "../../requests";

interface Props<T> {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data: T[];
    columns: ExportColumn<T>[];
    propertiesToSkip: number;
}

const ExportModal = <T,>({
    isOpen,
    setIsOpen,
    data,
    columns,
    propertiesToSkip
}: Props<T>) => {
    const [formData, setFormData] = useState<Export>({
        exportType: 'Xlsx'
    });

    const executeExport = useCallback(async () => {
        if (data) {
            exportData(data, columns, propertiesToSkip, formData.exportType);

            setIsOpen(false);
        }
    }, [columns, data, formData.exportType, propertiesToSkip, setIsOpen]);

    const inputs = useMemo<FormInput<Export>[]>(() => [
        {
            label: 'Type',
            property: 'exportType',
            required: true,
            type: 'select',
            options: Object.values(ExportType).filter(o => !Number.isInteger(o)) as string[]
        }
    ], []);

    return (
        <AppModal
            header="Export"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <AppForm
                data={formData}
                setData={setFormData}
                inputs={inputs}
                rowProps={{ xs: '1' }}
                onSubmit={executeExport}
                buttonColor="primary"
                buttonLabel="Export"
            />
        </AppModal>
    );
};

export default ExportModal;