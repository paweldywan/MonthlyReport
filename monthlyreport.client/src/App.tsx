import {
    useEffect,
    useState,
    useCallback,
    useMemo
} from 'react';

import {
    ConfirmationModalSettings,
    Entry,
    EntryFilter,
    FormAction,
    FormInput,
    NewEntry,
    TableAction,
    TableColumn
} from './interfaces';

import {
    getEntries,
    addEntry,
    deleteEntry,
    updateEntry,
    getUserName,
    logout
} from './requests';

import {
    Container
} from '@mui/material';

import AppTable from './components/AppTable';

import AppAccordion from './components/AppAccordion';

import AppForm from './components/AppForm';

import {
    formatDate,
    formatNumber,
    getEndOfCurrentMonth,
    getStartOfCurrentMonth,
    round,
    setColorScheme,
    sumArrayProperty
} from './utils';

import {
    faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
    IconProp
} from '@fortawesome/fontawesome-svg-core';

import ExportModal from './components/modals/ExportModal';

import ConfirmationModal from './components/modals/ConfirmationModal';

import AppNavbar from './components/AppNavbar';

function App() {
    const [data, setData] = useState<Entry[]>();

    const [newEntry, setNewEntry] = useState<NewEntry>({
        task: '',
        dateFrom: new Date(),
        dateTo: new Date()
    });

    const [filter, setFilter] = useState<EntryFilter>({
        task: '',
        dateFrom: getStartOfCurrentMonth(),
        dateTo: getEndOfCurrentMonth(),
        hoursFrom: 0,
        hoursTo: 24,
        sort: {}
    });

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const [confirmationModalSettings, setConfirmationModalSettings] = useState<ConfirmationModalSettings>({
        isOpen: false
    });

    const [userName, setUserName] = useState<string>();

    const setIsConfirmationModalOpen = useCallback((isOpen: boolean) => setConfirmationModalSettings({ ...confirmationModalSettings, isOpen }), [confirmationModalSettings]);

    const executeGetEntries = useCallback(async () => {
        const data = await getEntries(filter);

        setData(data);
    }, [filter]);

    const executeAddEntry = useCallback(async () => {
        const response = await addEntry(newEntry);

        if (response.ok) {
            const date = new Date();

            setNewEntry({
                task: '',
                dateFrom: newEntry.dateTo,
                dateTo: date > newEntry.dateTo ? date : newEntry.dateTo,
            });

            await executeGetEntries();
        }

        return response;
    }, [newEntry, executeGetEntries]);

    const executeDeleteEntry = useCallback(async (id: number) => {
        await deleteEntry(id);

        await executeGetEntries();
    }, [executeGetEntries]);

    const executeUpdateEntry = useCallback(async (entry: Entry) => {
        const response = await updateEntry(entry);

        if (response.ok) {
            await executeGetEntries();
        }

        return response;
    }, [executeGetEntries]);

    const executeGetUserName = useCallback(async () => {
        const name = await getUserName();

        setUserName(name);
    }, []);

    const editable = useCallback((row: Entry, currentRow?: Entry) => row.id === currentRow?.id, []);

    const columns = useMemo<TableColumn<Entry>[]>(() => [
        {
            label: 'Task',
            property: 'task',
            editable,
            sortable: true
        },
        {
            label: 'Date from',
            property: 'dateFrom',
            formatter: formatDate,
            type: 'datetime-local',
            editable,
            sortable: true
        },
        {
            label: 'Date to',
            property: 'dateTo',
            formatter: formatDate,
            type: 'datetime-local',
            editable,
            sortable: true
        },
        {
            label: 'Hours',
            property: 'hours',
            formatter: formatNumber,
            sortable: true
        }
    ], [editable]);

    useEffect(() => {
        setColorScheme();

        executeGetUserName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        executeGetEntries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter.sort])

    const actions = useMemo<TableAction<Entry>[]>(() => [
        {
            icon: () => faTrash as IconProp,
            title: () => 'Delete',
            onClick: row => {
                setConfirmationModalSettings({
                    isOpen: true,
                    onAccept: async () => {
                        await executeDeleteEntry(row.id);

                        setIsConfirmationModalOpen(false);
                    }
                });
            },
            color: () => 'danger'
        }
    ], [executeDeleteEntry, setIsConfirmationModalOpen]);

    const table = useMemo(() =>
        <AppTable
            data={data ?? []}
            columns={columns}
            rowKey="id"
            actions={actions}
            updateRow={executeUpdateEntry}
            editable={editable}
            sort={filter.sort}
            setSort={sort => setFilter({ ...filter, sort })}
        />, [actions, columns, data, editable, executeUpdateEntry, filter]);

    const loading = useMemo(() => <p><em>Loading...</em></p>, []);

    const contents = useMemo(() => !data ? loading : table, [data, loading, table]);

    const filterInputs = useMemo<FormInput<EntryFilter>[]>(() => [
        {
            label: 'Task',
            type: 'search',
            property: 'task'
        },
        {
            label: 'Date from',
            type: 'datetime-local',
            property: 'dateFrom'
        },
        {
            label: 'Date to',
            type: 'datetime-local',
            property: 'dateTo'
        },
        {
            label: 'Hours from',
            type: 'number',
            property: 'hoursFrom'
        },
        {
            label: 'Hours to',
            type: 'number',
            property: 'hoursTo'
        }
    ], []);

    const newEntryInputs = useMemo<FormInput<NewEntry>[]>(() => [
        {
            label: 'Task',
            property: 'task',
            required: true
        },
        {
            label: 'Date from',
            type: 'datetime-local',
            property: 'dateFrom',
            required: true
        },
        {
            label: 'Date to',
            type: 'datetime-local',
            property: 'dateTo',
            required: true
        }
    ], []);

    const filterActions = useMemo<FormAction[]>(() => [
        {
            label: 'Export',
            onClick: () => setIsExportModalOpen(true)
        }
    ], []);

    const items = useMemo(() => [
        {
            header: 'Filters',
            body: (
                <AppForm
                    data={filter}
                    setData={setFilter}
                    inputs={filterInputs}
                    rowProps={{ xl: '3', md: '2', sm: '1' }}
                    onSubmit={executeGetEntries}
                    buttonLabel="Search"
                    buttonColor="primary"
                    actions={filterActions}
                    idPrefix="filtering"
                />
            )
        },
        {
            header: 'Add new entry',
            body: (
                <AppForm
                    data={newEntry}
                    setData={setNewEntry}
                    inputs={newEntryInputs}
                    rowProps={{ xl: '3', md: '2', sm: '1' }}
                    onSubmit={executeAddEntry}
                    buttonLabel="Add"
                    buttonColor="primary"
                    idPrefix="adding"
                />
            )
        }
    ], [filter, filterInputs, executeGetEntries, filterActions, newEntry, newEntryInputs, executeAddEntry]);

    return userName && (
        <>
            <AppNavbar
                title="Monthly Report"
                text={`Hi ${userName}!`}
                buttonText="Logout"
                buttonOnClick={logout}
            />

            <Container
                maxWidth={false}
            >
                <AppAccordion
                    className="mb-2"
                    items={items}
                    defaultOpen="0"
                />

                <p>Hours: {round(sumArrayProperty(data || [], 'hours'), 2)}</p>

                {contents}

                <ExportModal
                    isOpen={isExportModalOpen}
                    setIsOpen={setIsExportModalOpen}
                    data={data ?? []}
                    columns={columns.map(c => ({ property: c.property, name: c.label }))}
                    propertiesToSkip={1}
                />

                <ConfirmationModal
                    settings={confirmationModalSettings}
                    setIsOpen={setIsConfirmationModalOpen}
                    message="Are you sure you want to delete this entry?"
                />
            </Container>
        </>
    );
}

export default App;