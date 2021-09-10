import React, { useState } from 'react';

// material imports
import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 600,
        padding: theme.spacing(1, 0)
    },
    details:{
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 400
    },
    divider: {
        background: '#dadada',
        margin: theme.spacing(1.5, 0),
        height: 0.5

    }
}));

const SummaryPanel = (props) => {

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
    
            <Accordion expanded={expanded === props.data.id} onChange={handleChange(props.data.id)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography className={classes.heading}>{props.data.user_lastname +", "+ props.data.user_firstname}</Typography>
            </AccordionSummary>
            {/* TO DO: Refactor details section */}
            <AccordionDetails style={{flexDirection: 'column'}}>
                <Typography className={classes.details} color="textSecondary" component="span">
                    {props.titleKey? props.data[props.titleKey]: null} 
                </Typography>
                <Divider className={classes.divider} />
                <Typography className={classes.secondaryDetails} color="textSecondary" component="span">
                    <strong style={{fontSize: "14px", color: '#66cbf9'}}>{props.subHeader}:</strong> <br /> 
                    {
                        props.subHeader === "Completion time" ?
                        Math.round(((props.data.course_completion_time)/36000) * 10) / 10 + ` hrs` :
                        
                        props.subHeader === "Submitted at" ? 
                        new Date(props.data.course_finished_at).toUTCString() :
                        props.data.total_courses_completed
                    }
                </Typography>
                
            </AccordionDetails>
            </Accordion>
    
    );
}

export default SummaryPanel