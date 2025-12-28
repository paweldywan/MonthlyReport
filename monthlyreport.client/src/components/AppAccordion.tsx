import {
    useCallback,
    useState
} from "react";

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    AppAccordionItem
} from "../interfaces";

interface Props {
    className?: string;
    items: AppAccordionItem[];
    defaultOpen?: string;
}

const AppAccordion = ({
    className,
    items,
    defaultOpen = ''
}: Props) => {
    const [expanded, setExpanded] = useState<string>(defaultOpen);

    const handleChange = useCallback((panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    }, []);

    return (
        <div className={className}>
            {items.map((item, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === index.toString()}
                    onChange={handleChange(index.toString())}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{item.header}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {item.body}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default AppAccordion;