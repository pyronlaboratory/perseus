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
    marginBottom: 10
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
function References(props) {
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
                        References
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.wrapper} >
            <Paper className={classes.paper}>
                <Typography component="span">

                    <b>Following online resources were used during the development of this case study</b>
                    <Divider className={classes.divider} />
                    <CssBaseline />
                    <code>React.js</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        A JavaScript library for building user interfaces. <br />https://reactjs.org/ <br /><br />
                    </Typography>

                    <code>Material UI</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        React components for faster and easier web development. Build your own design system, or start with Material Design. <br />https://material-ui.com/guides/api/ <br /><br />
                    </Typography>
                    
                    <code>Flask</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Python based microframework for web development. <br />https://flask.palletsprojects.com/en/2.0.x/<br /><br/>
                    </Typography>

                    <code>Heroku</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Learn about building, deploying, and managing your apps on Heroku. Heroku makes it easy to deploy and scale Python apps. Whether you prefer frameworks like Django or Flask, or getting your hands dirty with Twisted or raw sockets, Heroku helps you build things your way with the tools you love.<br />https://devcenter.heroku.com/<br /><br />
                    </Typography>

                    <code>Firebase</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Firebase helps you build and run successful apps. This application is running on Firebase.<br />https://firebase.google.com/docs<br /><br />
                    </Typography>

                    <code>Docker</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                    Build safer, share wider, run faster.<br />https://docs.docker.com/<br /><br />
                    </Typography>
 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        and good old.. <br /><br />
                    </Typography>

                    <code>StackOverflow</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        https://stackoverflow.com/ <br /><br />
                    </Typography>

                </Typography>
                <CssBaseline />            
            </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(References)
