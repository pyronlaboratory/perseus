import React from 'react'
import clsx from 'clsx';

// react router
import {Link, withRouter } from "react-router-dom";

// material imports
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// material icons
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({

    item: {
      paddingTop: 8,
      paddingBottom: 8,
      color: "#343434",
      '&:hover,&:focus': {
        backgroundColor: "#f3f3f3", 
      },
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  
}));

function NavLinks(props) {

    const classes = useStyles();

    return (
        <Link key={props.id} to={props.item.url}>
        <ListItem
            button
            className={clsx(classes.item, props.item.url === props.history.location.pathname && classes.itemActiveItem)}
        >
            <ListItemIcon className={classes.itemIcon}>{props.item.icon}</ListItemIcon>
            <ListItemText
                classes={{
                primary: classes.itemPrimary,
                }}
            >
                {props.item.id}
            </ListItemText> 
        </ListItem>
      </Link>
    )
}

export default withRouter(NavLinks);