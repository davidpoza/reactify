import React from 'react';

// material ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
    height: '80%'
  },
}));

const withViewStyles = (Component) => (props) => {
  const classes = useStyles();
  return (
    <Component {...props} viewClasses={classes.root} />
  )
}

export default withViewStyles;