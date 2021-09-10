import React from 'react';
import PropTypes from 'prop-types';

// material imports
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

// material icons
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  }
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
      <AppBar  style={{ backgroundColor: "#080a0e"}} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} style={{alignItems:"center"}}>
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} target="_blank" href="https://github.com/pyronlaboratory/perseus.git" variant="body2">                
                <Tooltip title="View Project Repository">
                  <IconButton color="inherit">
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);