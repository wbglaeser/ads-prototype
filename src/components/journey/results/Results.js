import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  }
}));

export default function Result(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainSpace}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Ergebnis
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Hier wird die ratsuchende über ihre möglichkeiten aufgeklärt.
      </Typography>
    </Grid>
  );
}