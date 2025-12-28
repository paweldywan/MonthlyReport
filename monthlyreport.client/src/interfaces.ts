import {
    IconProp
} from "@fortawesome/fontawesome-svg-core";

import {
    ReactNode
} from "react";

export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'time' | 'month' | 'week' | 'color' | 'file' | 'select';

export interface TableColumn<T> {
    label: string;
    property: keyof T;
    formatter?: (value: string) => string;
    editable?: (row: T, currentRow?: T) => boolean;
    type?: InputType;
    sortable?: boolean;
}

export interface TableAction<T> {
    icon: (row: T) => IconProp;
    title: (row: T) => string;
    color?: (row: T) => string;
    onClick: (row: T) => void;
    visible?: (row: T) => boolean;
}

export interface Sort<T> {
    property?: keyof T;
    direction?: 'asc' | 'desc';
}

export interface FormInput<T> {
    label: string;
    type?: InputType;
    property: keyof T;
    required?: boolean;
    options?: string[];
}

export interface FormAction {
    label: string;
    color?: string;
    onClick: () => void;
}

export interface NewEntry {
    task: string;
    dateFrom: Date;
    dateTo: Date;
}

export interface Entry extends NewEntry {
    id: number;
    hours: number;
}

export interface EntryFilter {
    task?: string;
    dateFrom?: Date;
    dateTo?: Date;
    hoursFrom?: number;
    hoursTo?: number;
    sort?: Sort<Entry>;
}

export interface AppAccordionItem {
    header: string,
    body: ReactNode
}

export enum ExportType {
    Xlsx,
    Xls,
    Csv,
    Pdf,
    Html,
    Json,
    Xml,
    Txt
}

export interface Export {
    exportType: keyof typeof ExportType;
}

export interface ExportColumn<T> {
    property: keyof T;
    name: string;
}

export interface ConfirmationModalSettings {
    isOpen: boolean;
    onAccept?: () => void;
}