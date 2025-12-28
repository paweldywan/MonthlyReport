import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";

import { Brightness4, Brightness7, SettingsBrightness } from '@mui/icons-material';

import { useContext, useState } from 'react';

import { ThemeContext } from '../ThemeContext';

interface Props {
    title: string;
    text: string;
    buttonText: string;
    buttonOnClick: () => void;
}

const AppNavbar = ({
    title,
    text,
    buttonText,
    buttonOnClick
}: Props) => {
    const { mode, setMode } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleThemeMenuClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
        setMode(newMode);
        handleThemeMenuClose();
    };

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                    {text}
                </Typography>

                <IconButton
                    color="inherit"
                    onClick={handleThemeMenuOpen}
                    sx={{ mr: 1 }}
                >
                    {mode === 'dark' ? <Brightness7 /> : mode === 'light' ? <Brightness4 /> : <SettingsBrightness />}
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleThemeMenuClose}
                >
                    <MenuItem onClick={() => handleThemeChange('light')} selected={mode === 'light'}>
                        <Brightness7 sx={{ mr: 1 }} /> Light
                    </MenuItem>
                    <MenuItem onClick={() => handleThemeChange('dark')} selected={mode === 'dark'}>
                        <Brightness4 sx={{ mr: 1 }} /> Dark
                    </MenuItem>
                    <MenuItem onClick={() => handleThemeChange('system')} selected={mode === 'system'}>
                        <SettingsBrightness sx={{ mr: 1 }} /> System
                    </MenuItem>
                </Menu>

                <Button
                    color="inherit"
                    onClick={buttonOnClick}
                >
                    {buttonText}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppNavbar;