import React from 'react';

// material ui
import CircularProgress from '@material-ui/core/CircularProgress';


// own
import useStyles from './styles';

function Loader({
  global = true
}) {
  const classes = useStyles();
  return <CircularProgress className={global ? classes.globalLoader : classes.localLoader} />
}

export default Loader;