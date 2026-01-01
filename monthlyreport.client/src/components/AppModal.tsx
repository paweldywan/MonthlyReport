import {
    ReactNode,
    useCallback
} from "react";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";

interface Props {
    header: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: ReactNode;
    onAccept?: () => void;
}

const AppModal = ({
    header,
    children,
    isOpen,
    setIsOpen,
    onAccept
}: Props) => {
    const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={toggle}
            disableRestoreFocus
        >
            <DialogTitle>
                {header}
            </DialogTitle>

            <DialogContent sx={{ pt: 3, overflow: 'visible' }}>
                {children}
            </DialogContent>

            {onAccept &&
                <DialogActions>
                    <Button
                        color="error"
                        onClick={toggle}
                        variant="contained"
                    >
                        No
                    </Button>

                    <Button
                        color="primary"
                        onClick={onAccept}
                        variant="contained"
                    >
                        Yes
                    </Button>
                </DialogActions>}
        </Dialog >
    );
}

export default AppModal;