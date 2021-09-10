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
import { Link } from '@material-ui/core';

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
function DataService(props) {
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
                        Data Services
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.wrapper} >
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    Creating Data Services 
                </Typography>
                <Typography className={classes.subtitle} variant="h6" gutterBottom>
                    Developing API services created using Flask framework
                </Typography>
                
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Project repository available on <Link to="https://github.com/pyronlaboratory/perseus"> GitHub</Link>
                </Typography>
                <Divider className={classes.divider} />
                <CssBaseline />
                <Typography component="span">

                    <b>Project dependencies:</b> <br /><br />

                    <code> apispec==5.1.0</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        A pluggable API specification generator to create OpenAPI Specification in json/yaml format. <br /><br />
                    </Typography>
                    
                    <code> apispec-webframeworks==0.5.2</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        APISpec plugins for integrating with various web frameworks. <br /><br />
                    </Typography>

                    <code> Flask==2.0.1</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Python based microframework for web development. <br /><br />
                    </Typography>

                    <code> Flask-Cors==3.0.10</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        A Flask extension for handling Cross Origin Resource Sharing (CORS), allowing cross-origin requests. <br /><br />
                    </Typography>

                    <code> marshmallow==3.13.0</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        An ORM/ODM/framework-agnostic library for converting complex datatypes, such as objects, to and from native Python datatypes. <br /><br />
                    </Typography>

                    <code> unittest</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Python's in-built unit test framework. <br /><br />
                    </Typography>

                    <code> python-dateutil==2.8.2</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        Datetime utility library. <br /><br />
                    </Typography>

                    <code> Werkzeug==2.0.1</code>: 
                    <Typography className={classes.text} variant="body1" gutterBottom>
                        A comprehensive WSGI web application library. <br /><br />
                    </Typography>

                </Typography>
                <CssBaseline />
                <Typography component="span">
                    <b>Setting up development environment locally:</b> <br /><br />
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    Clone the repository locally from GitHub and activate virtual environment to install dependencies from <code>requirements.txt</code><br/><br/>
                </Typography>
                <code>$ git clone https://github.com/pyronlaboratory/perseus.git</code> <br/><br/>
                <code>$ cd '.\Perseus\data services\'</code><br/><br/>
                <code>$ python -m virtualenv dev</code><br/><br/>
                <code>$ .\dev\Scripts\activate</code><br/><br/>
                <code>(dev) $ pip install -r requirements.txt</code><br/><br/><br/>

                <Typography className={classes.text} variant="body1" gutterBottom>
                    Start the server and head over to localhost on port 5000 <br/><br/>
                </Typography>.
                <code>(dev) $ python app.py</code>
                <CssBaseline />
                <Divider className={classes.divider} />
          
                <Typography component="span">
                    <b>Testing API endpoints using Swagger UI:</b> <br /><br />
                </Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>
                    API endpoints have been documented as per <b>OpenAPI Specifications</b> using Swagger UI. To run quick tests on the endpoints head over to <code>http://localhost:5000/docs</code><br/><br/>
                </Typography>





            </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(DataService)
