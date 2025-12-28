import moment from "moment";

import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent
} from "@mui/material";

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import AppInputError from "./AppInputError";

import {
    useMemo
} from "react";

interface Props<T> {
    type?: string;
    idPrefix?: string;
    required?: boolean;
    options?: string[];
    label?: string;
    data: T;
    setData: (data: T) => void;
    property: keyof T;
    errors?: Record<string, string>;
}

const AppInput = <T,>({
    type,
    idPrefix,
    required,
    options,
    label,
    data,
    setData,
    property,
    errors
}: Props<T>) => {
    const id = useMemo(() => label && `${idPrefix}${idPrefix && '-'}${property.toString()}`, [idPrefix, label, property]);

    const value = useMemo(() => {
        switch (type) {
            case 'datetime-local':
                return moment(data[property] as Date).toDate();
            default:
                return String(data[property]);
        }
    }, [data, property, type]);

    const onChange = useMemo(() => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        let value;

        switch (type) {
            case 'number':
                value = Number(event.target.value);
                break;
            default:
                value = event.target.value;
                break;
        };

        setData({
            ...data,
            [property]: value
        });
    }, [data, setData, property, type]);

    if (options && options.length > 0) {
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel id={`${id}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${id}-label`}
                        id={id}
                        value={String(value)}
                        label={label}
                        onChange={onChange}
                        required={required}
                    >
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {errors &&
                    <AppInputError
                        errors={errors}
                        property={property.toString()}
                    />}
            </>
        );
    }

    if (type === 'datetime-local') {
        return (
            <>
                <DateTimePicker
                    label={label}
                    value={value as Date}
                    onChange={newValue =>
                        setData({
                            ...data,
                            [property]: newValue
                        })}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            required: required,
                            id: id,
                            name: label && property.toString()
                        }
                    }}
                />

                {errors &&
                    <AppInputError
                        errors={errors}
                        property={property.toString()}
                    />}
            </>
        );
    }

    return (
        <>
            <TextField
                type={type}
                name={label && property.toString()}
                id={id}
                label={label}
                required={required}
                value={value}
                onChange={onChange}
                fullWidth
            />

            {errors &&
                <AppInputError
                    errors={errors}
                    property={property.toString()}
                />}
        </>
    );
};

export default AppInput;