import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// material ui
import { ThemeProvider } from "@material-ui/core/styles";

// own
import LoginForm from '../components/login';
import PrivateRoute from '../hocs/private-route';
import ResponsiveDrawer from '../components/responsive-drawer';
import store from '../store';
import theme from '../utils/theme';
import Loader from '../components/loader';

// Css
import './App.css';

// dynamic imports
const HomeView = React.lazy(() => import('../components/home-view'));
const QueueView = React.lazy(() => import('../components/queue-view'));
const AlbumView = React.lazy(() => import('../components/album-view'));
const AlbumPreviewView = React.lazy(() => import('../components/album-preview-view'));
const AlbumsView = React.lazy(() => import('../components/albums-view'));
const ProfileView = React.lazy(() => import('../components/profile-view'));
const DownloaderView = React.lazy(() => import('../components/downloader-view'));

// Since they are lazy I have to add a definition of name in order to use it on private-route
HomeView.name = 'HomeView';
QueueView.name = 'QueueView';
AlbumView.name = 'AlbumView';
AlbumPreviewView.name = 'AlbumPreviewView';
AlbumsView.name = 'AlbumsView';
ProfileView.name = 'ProfileView';
DownloaderView.name = 'DownloaderView';

const Search = () => {
  return <p>Search</p>;
}

const Playlists = () => {
  return <p>Playlists</p>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Router>
                <Switch>
                  <Route path="/login" exact component={LoginForm} />
                  <ResponsiveDrawer>
                    <React.Suspense fallback={<Loader global={false} />}>
                      <PrivateRoute path="/" exact component={HomeView}/>
                      <PrivateRoute path="/search" exact component={Search}/>
                      <PrivateRoute path="/albums" exact component={AlbumsView}/>
                      <PrivateRoute path="/album/:id" exact component={AlbumView}/>
                      <PrivateRoute path="/album-preview" exact component={AlbumPreviewView}/>
                      <PrivateRoute path="/playlists" exact component={Playlists}/>
                      <PrivateRoute path="/downloader" exact component={DownloaderView}/>
                      <PrivateRoute path="/queue" exact component={QueueView}/>
                      <PrivateRoute path="/profile" exact component={ProfileView}/>
                    </React.Suspense>
                  </ResponsiveDrawer>
                </Switch>
              </Router>
          </ThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
