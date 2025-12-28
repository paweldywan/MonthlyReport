export const formatDate = (value: string) => new Date(value).toLocaleString();

export const formatNumber = (value: string) => parseFloat(value).toLocaleString();

export const getStartOfCurrentMonth = () => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), 1);
};

export const getEndOfCurrentMonth = () => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
};

export const saveBlob = async (response: Response) => {
    const blob = await response.blob();

    const contentDisposition = response.headers.get('Content-Disposition');

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

    let filename = 'file';

    if (contentDisposition) {
        const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

        if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '');
        }
    }

    const url = window.URL.createObjectURL(new Blob([blob], { type: contentType }));

    const a = document.createElement('a');

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};

export const round = (value: number, decimalPlaces: number) => {
    const factor = Math.pow(10, decimalPlaces);

    return Math.round(value * factor) / factor;
};

export const sumArrayProperty = <T>(array: T[], property: keyof T) => {
    return array.reduce((sum, item) => {
        return sum + (item[property] as number);
    }, 0);
};

export const getErrors = async (response: Response) => {
    if (response.status !== 400) {
        return;
    }

    const json = await response.json();

    return Object.keys(json.errors).reduce<Record<string, string>>((acc, key) => { acc[`${key[0].toLowerCase()}${key.substring(1)}`] = json.errors[key].join(' '); return acc; }, {});
}