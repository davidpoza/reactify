import React, {useState} from 'react';

// material ui
import Snackbar from '@material-ui/core/Snackbar';

// own
import Loader from '../components/loader';

const withLoader = (Component) => ({loading, error, errorMessage, ...rest}) => {
  console.log("--->", error, errorMessage);
  return (
    <>
      {
        true &&
        <Snackbar
          style={{zIndex: 999999}}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={() => { }}
          open={true}
          autoHideDuration={6000}
          message={errorMessage}
        />
      }

      {
        loading &&
        <Loader />
      }
      <Component {...rest} />
    </>
  )
}

export default withLoader;