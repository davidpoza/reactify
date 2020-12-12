import React from 'react';

// material ui
import useMediaQuery from '@material-ui/core/useMediaQuery';


const withIsMobile = (Component) => (props) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (<Component {...props} isMobile={isMobile} />);
}

export default withIsMobile;