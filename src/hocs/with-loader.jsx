import React from 'react';

// material ui
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loader: {
    position: 'fixed',
    left: '50%',
    top: '40%',
    zIndex: 9999
  }
}));

const withLoader = (Component) => ({loading, ...rest}) => {
  const classes = useStyles();
  return (
    <>
      {
        loading &&
        <CircularProgress className={classes.loader} />
      }
      <Component {...rest} />
    </>
  )
}

export default withLoader;