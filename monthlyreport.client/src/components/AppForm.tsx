import {
    Button,
    Box
} from "@mui/material";

import Grid from '@mui/material/Grid2';

import {
    FormAction,
    FormInput
} from "../interfaces";

import {
    useState
} from "react";

import {
    getErrors
} from "../utils";

import AppInput from "./AppInput";

interface Props<T> {
    data: T;
    setData: (data: T) => void;
    inputs: FormInput<T>[];
    rowProps: { xl?: string, md?: string, sm?: string, xs?: string };
    onSubmit: () => Promise<void | Response>;
    buttonLabel?: string;
    buttonColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    actions?: FormAction[];
    idPrefix?: string;
}

const AppForm = <T,>({
    data,
    setData,
    inputs,
    rowProps,
    onSubmit,
    buttonLabel = 'Submit',
    buttonColor,
    actions,
    idPrefix
}: Props<T>) => {
    const [errors, setErrors] = useState<Record<string, string>>();

    return (
        <Box
            component="form"
            onSubmit={async (event) => {
                event.preventDefault();

                const response = await onSubmit();

                if (response) {
                    const errors = await getErrors(response);

                    if (errors) {
                        setErrors(errors);
                    }
                    else {
                        setErrors(undefined);
                    }
                }
            }}
        >
            <Grid container spacing={2}>
                {inputs.map((input, index) => (
                    <Grid
                        key={index}
                        size={{
                            xl: Number(rowProps.xl) || 12,
                            md: Number(rowProps.md) || 12,
                            sm: Number(rowProps.sm) || 12,
                            xs: Number(rowProps.xs) || 12
                        }}
                    >
                        <AppInput
                            type={input.type}
                            idPrefix={idPrefix}
                            required={input.required}
                            options={input.options}
                            data={data}
                            setData={setData}
                            property={input.property}
                            label={input.label}
                            errors={errors}
                        />
                    </Grid>
                ))}
            </Grid>


            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color={buttonColor}
                >
                    {buttonLabel}
                </Button>

                {actions?.map((action, index) =>
                    <Button
                        key={index}
                        onClick={action.onClick}
                        variant="contained"
                        color={action.color as "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"}
                    >
                        {action.label}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AppForm;