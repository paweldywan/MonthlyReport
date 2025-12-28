import {
    Entry,
    EntryFilter,
    ExportColumn,
    ExportType,
    NewEntry
} from "./interfaces";

import {
    saveBlob
} from "./utils";

const handleLogin = (response: Response) => {
    if (response.status === 401) {
        window.location.href = '/Identity/Account/Login';

        return false;
    }
    else if (response.status === 403) {
        window.location.href = '/Identity/Account/AccessDenied';

        return false;
    }

    return true;
};

export const getEntries = async (filter: EntryFilter): Promise<Entry[]> => {
    const response = await fetch(`/api/entry/${JSON.stringify(filter)}`);

    return await response.json();
};

export const addEntry = (entry: NewEntry) =>
    fetch('/api/entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    });

export const deleteEntry = (id: number) =>
    fetch(`/api/entry/${id}`, {
        method: 'DELETE'
    });

export const exportData = async <T>(data: T[], columns: ExportColumn<T>[], propertiesToSkip: number, exportType: keyof typeof ExportType) => {
    const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data,
            columns,
            propertiesToSkip,
            exportType: ExportType[exportType]
        })
    });

    await saveBlob(response);
};

export const updateEntry = (entry: Entry) =>
    fetch('/api/entry', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    });

export const getUserName = async () => {
    const response = await fetch('/api/account/username');

    if (!handleLogin(response)) return undefined;

    return await response.text();
};

export const logout = async () => {
    await fetch('/Identity/Account/Logout', {
        method: 'POST'
    });

    window.location.href = '/';
}