import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

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
    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                    {text}
                </Typography>

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