import React from 'react';

// own
import Loader from '../components/loader';

const withLoader = (Component) => ({loading, ...rest}) => {
  return (
    <>
      {
        loading &&
        <Loader />
      }
      <Component {...rest} />
    </>
  )
}

export default withLoader;