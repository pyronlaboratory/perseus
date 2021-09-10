import React from 'react'
import PropTypes from 'prop-types';

// material imports

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// dashboard components
import DataTable from '../../components/DataTable/DataTable'
import Insights from '../../containers/Insights/Insights';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  wrapper: {
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3, 1),
    },
  }
});

// TO DO: Refactor: Move TabPanel in components directory
function TabPanel(props) {
    const { styling, children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            {children}
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function Home(props) {
    const { classes } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ backgroundColor: "#18202c"}}
                position="static"
                elevation={0}
            >
                <Toolbar>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                    <Typography color="inherit" variant="h5" component="h1">
                        Dashboard
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>

            <AppBar
                component="div"
                className={classes.secondaryBar}
                style={{ backgroundColor: "#18202c"}}
                position="static"
                elevation={0}
            >
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                    <Tab textColor="inherit" label="Overview" /> 
                    <Tab textColor="inherit" label="Insights and Reporting" /> 
                </Tabs>
            </AppBar>
            
            <TabPanel className={classes.wrapper}  value={value} index={0}>
                <DataTable />
            </TabPanel>
            <TabPanel className={classes.wrapper} value={value} index={1}>
                <Insights />
            </TabPanel>

        </React.Fragment>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);