import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    useMediaQuery
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useState, useMemo, useEffect } from 'react';

import App from './App';
import { ThemeContext, ThemeMode } from './ThemeContext';

function AppWrapper() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const stored = localStorage.getItem('themeMode');
        return (stored as ThemeMode) || 'system';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const theme = useMemo(() => {
        const mode = themeMode === 'system' 
            ? (prefersDarkMode ? 'dark' : 'light')
            : themeMode;

        return createTheme({
            palette: {
                mode,
            },
        });
    }, [themeMode, prefersDarkMode]);

    return (
        <ThemeContext.Provider value={{ mode: themeMode, setMode: setThemeMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <App />
                </LocalizationProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default AppWrapper;
