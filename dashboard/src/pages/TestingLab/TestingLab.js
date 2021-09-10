import React from 'react'

// material imports
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider  from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
    display: 'flex',
    height: '6.85em',
    justifyContent: 'center'
  },
  wrapper: {
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3, 1),
    },
  },
  paper: {
    maxWidth: 1064,
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(3, 3),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2, 2),
    },
  },
  title: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2, 0),
    },
  },
  subtitle: {
    marginBottom: 30
  },
  text: {
    fontSize: 14
  },
  divider: {
    height: '0.5px',
    margin: '15px',
    backgroundColor: '#d4d4d4'
  }
});

// TO DO: Refactor: Move descriptive data to a json
function TestingLab(props) {
    const { classes } = props;

    return (
        <div>
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
                        Testing Lab
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.wrapper} >
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    Testing Web UI and Data Services
                </Typography>
                
                <Typography className={classes.subtitle} variant="h6" gutterBottom>
                    Unit testing <code>React</code> components and containers
                </Typography>
            
                <Divider className={classes.divider} />
                <CssBaseline />
                <Typography className={classes.text} variant="body1" gutterBottom>
                        This documentation section focuses on testing strategies for rendering component trees in a simplified test environment and asserting on their output.<br /><br />
                </Typography>
                <Typography component="span">

                    <b>Testing dependencies:</b> <br /><br />
                    
                    <code>"@testing-library/dom": "^8.3.0"</code>: <br />
                    <code>"@testing-library/jest-dom": "^5.11.4"</code>: <br />
                    <code>"@testing-library/react": "^11.1.0"</code>: <br />
                    <code>"@testing-library/user-event": "^12.1.10"</code>: <br />
                    <code>"react-test-renderer": "^17.0.2"</code>: <br /><br />

                </Typography>
                <CssBaseline />
                <Divider className={classes.divider} />
                <Typography component="span">
                    <b>Setting up unit tests:</b><br/><br />
                </Typography>
                
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Create a folder within the Component's folder with the name <code><b>__test__</b></code> and place the test file with <code><b>.test.js</b></code> extension for test runners to access. <br /><br/>
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Start running Test Suites using the following command:
                </Typography>
                <code>$ npm test</code><br/><br/>
                
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Use <code><b>react-test-renderer</b></code> to write snapshot test cases. If test cases are succesfully completed, a flattened snapshot of the component in <code><b>.json</b></code> format, is created within <code><b>__snapshots__</b></code> folder automatically. <br /><br />
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly. A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test.<br/> <br />
                </Typography> 
              
                <CssBaseline />
                <Divider className={classes.divider} />
          
                <Typography className={classes.subtitle} variant="h6" gutterBottom>
                    Unit testing API services using <code>unittest</code>
                </Typography>
                <Typography component="span">

                    <b>Testing dependencies:</b> <br /><br />

                    <Typography className={classes.text} variant="body1" gutterBottom>
                        No additional dependencies are required.<br/> <br />
                    </Typography> 

                </Typography>
                <CssBaseline />
                <Divider className={classes.divider} />
                <Typography component="span">

                    <b>Setting up unit tests:</b> <br /><br />

                    <Typography className={classes.text} variant="body1" gutterBottom>
                        A testcase is created by subclassing <code><b>unittest.TestCase</b></code>.The three individual tests are defined with methods whose names start with the letters <b>test</b>. This naming convention informs the test runner about which methods represent tests.<br/> <br />
                    </Typography> 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        The crux of each test is a call to <code><b>assertEqual()</b></code> to check for an expected result; <code><b>assertTrue()</b></code> or <code><b>assertFalse()</b></code> to verify a condition; or <code><b>assertRaises()</b></code> to verify that a specific exception gets raised. These methods are used instead of the assert statement so the test runner can accumulate all test results and produce a report. <br/><br /> 
                    </Typography> 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        The final block shows a simple way to run the tests. unittest.main() provides a command-line interface to the test script.
                    </Typography>
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Start running Test Suites using the following command:< br/>
                        <code>(dev) $ python .\tests.py</code><br/><br/>
                    </Typography>
                    

                    
                </Typography>      
          
            </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(TestingLab)