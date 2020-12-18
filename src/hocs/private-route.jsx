import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// own
import ErrorBoundary from '../components/error-boundary';
import { resetState as resetAlbumState } from '../actions/albums';
import { resetState as resetPlayerState } from '../actions/player';
import { resetState as resetDownloaderState } from '../actions/downloader';
import { resetState as resetHistoryState } from '../actions/history';


const PrivateRoute = ({
  component: Component,
  user,
  resetAlbumState,
  resetPlayerState,
  resetDownloaderState,
  resetHistoryState,
  ...others
 }) => {

  function resetState(componentName) {
    console.log(componentName)
    switch (componentName) {
      case 'AlbumView':
        resetAlbumState();
        break;
      case 'AlbumsView':
        resetAlbumState();
      case 'DownloaderView':
        resetDownloaderState();
      case 'QueueView':
        resetPlayerState();
      default:
        break;
    }
  }

  return (
      <Route
        {...others}
        render={(props) =>
          user
            ? <ErrorBoundary message="Error has ocurred on this view." onReset={() => resetState(Component.name)}>
                <Component {...props} />
              </ErrorBoundary>
            : <Redirect
              to={{
                pathname: '/login',
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

const mapDispatchToProps = (dispatch) => {
  return ({
    resetAlbumState: () => dispatch(resetAlbumState()),
    resetPlayerState: () => dispatch(resetPlayerState()),
    resetDownloaderState: () => dispatch(resetDownloaderState()),
    resetHistoryState: () => dispatch(resetHistoryState()),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);