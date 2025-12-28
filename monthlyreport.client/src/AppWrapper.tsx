import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    useMediaQuery
} from '@mui/material';

import App from './App';

function AppWrapper() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
}

export default AppWrapper;
