import React from 'react';

// material imports
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    height: 130,
    background: 'white'
  },
  title: {
    fontSize: 12,
  },
  text: {
    fontSize: 21,
    fontWeight: 600
  }
});

const StatisticsCard = (props) => {
  const classes = useStyles();

  return (

    <Paper className={classes.root} data-testid="statistics-card" >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography className={classes.text} variant="h5" component="h1">
          {props.value}
        </Typography>
      </CardContent>

    </Paper>
  );
}

export default StatisticsCard
