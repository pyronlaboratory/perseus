import React from 'react';
import clsx from 'clsx';

// material imports
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import NavLinks from '../../components/NavLinks/NavLinks';

// material icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PublicIcon from '@material-ui/icons/Public';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import BookIcon from '@material-ui/icons/Book';

import logo from '../../logo.svg';

const categories = [
  { id: 'Dashboard', icon: <DashboardIcon />, url: '/', active: true },
  { id: 'Data Service', icon: <DnsRoundedIcon />, url: '/data-services' },
  { id: 'Containerization', icon: <PublicIcon />, url: '/containerization' },
  { id: 'Test Lab', icon: <PhonelinkSetupIcon />, url: '/testing-lab' },
  { id: 'References', icon: <BookIcon />, url: '/references' },
];

const useStyles = makeStyles((theme) => ({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: "black",
    },
    item: {
      paddingTop: 8,
      paddingBottom: 8,
      color: "#343434",
      '&:hover,&:focus': {
        backgroundColor: "#f3f3f3", 
      },
    },
    itemCategory: {
      backgroundColor: 'white',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
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

function Navigator(props) {

  const { ...other } = props;

  const classes = useStyles();
  
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        
        {/* logo */}
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          <img src={logo} className="App-logo" alt="logo" />
        </ListItem>
        
        {/* section header */}
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        
        <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              Quick Links
            </ListItemText>
        </ListItem>

        {/* list of navigation links */}
        {categories.map((item) => (
          <NavLinks key={item.id} item={item} />
        ))}

        <Divider className={classes.divider} />

      </List>
    </Drawer>
  );
}

export default Navigator;
