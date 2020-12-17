import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// own
import ErrorBoundary from '../components/error-boundary';

const PrivateRoute = ({ component: Component, user, ...others }) => {
  return (
      <Route
        {...others}
        render={(props) =>
          user
            ? <ErrorBoundary message="Error has ocurred on this view. Change to another and try again">
                <Component {...props} />
              </ErrorBoundary>
            : <Redirect
              to={{
                pathname: '/login',
                state: {
                  message: 'Por favor, haz login primero'
                }
              }}
              />
        }
      />
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
  }
}
export default connect(mapStateToProps)(PrivateRoute);