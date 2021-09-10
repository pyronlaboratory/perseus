import React from 'react'

// material imports
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider  from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
    marginBottom: 50
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
function Containerization(props) {
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
                        Containerization
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.wrapper} >
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    Dockerizing Data Services 
                </Typography>
                <Typography className={classes.subtitle} variant="h6" gutterBottom>
                    Deploying API services on Heroku using Heroku CLI
                </Typography>
                
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Docker image available on <Link to="https://hub.docker.com/r/ronyx/perseus-data-service"> Docker Hub</Link>
                </Typography>
                <Divider className={classes.divider} />
                <CssBaseline />
                <Typography component="span">
                    <b>Build and run docker image locally:</b> <br /><br />
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    <code> $ docker build -t ronyx/perseus-data-service:latest .</code><br />
                    <code> $ docker run -it -p 5000:5000 ronyx/perseus-data-service:latest </code> <br /><br/>
                    
                </Typography>
                <CssBaseline />
                <Typography component="span">
                    <b>Deploying the application on Heroku:</b> <br /><br />
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key using the following<code> heroku-cli</code> command.<br/><br/>
                </Typography>
                <code>$ heroku login</code> <br/><br/>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Once logged in, create an application and connect remote repository to local codebase.<br/><br/>
                </Typography>
                <code>$ heroku create perseus-data-service</code><br/><br/>
                <code>$ git init</code><br/><br/>
                <code>$ heroku git:remote -a perseus-data-service</code><br/><br/>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Commit local codebase to the remote repository.<br/><br/>
                </Typography>
                <code>$ git add .</code><br/><br/>
                <code>$ git commit -m "deployment data service: v1.0"</code><br /><br/>

                <Typography className={classes.text} variant="body1" gutterBottom>
                    Create <code>heroku.yml</code> file in the root directory.<br/><br/>
                </Typography>

                <code># heroku.yml</code><br /><br />
                <code>build:</code><br />
                <code> ...  docker:</code><br />
                <code>   ...  ...  web: Dockerfile</code><br /><br />

                <Typography className={classes.text} variant="body1" gutterBottom>
                    Stack container to your heroku's applications dyno and push local commit changes..<br/><br/>
                </Typography>
                <code>$ heroku stack:set container</code><br/><br/>
                <code>$ git push heroku master</code><br /><br/>
              
                <CssBaseline />
                <Divider className={classes.divider} />
          
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Access the backend services running live on <a href="https://perseus-data-service.herokuapp.com"><code><b>Heroku</b></code></a><br/><br/>
                </Typography>

            </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(Containerization)