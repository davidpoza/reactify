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
import HomeView from '../components/home-view';
import AlbumView from '../components/album-view';
import AlbumsView from '../components/albums-view';
import QueueView from '../components/queue-view';
import ProfileView from '../components/profile-view';

// Css
import './App.css';

const Search = () => {
  return <p>Search</p>;
}

const Playlists = () => {
  return <p>Playlists</p>;
}

const Downloader = () => {
  return <p>Downloader</p>;
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
                  <PrivateRoute path="/" exact component={HomeView}/>
                  <PrivateRoute path="/search" exact component={Search}/>
                  <PrivateRoute path="/albums" exact component={AlbumsView}/>
                  <PrivateRoute path="/album/:id" exact component={AlbumView}/>
                  <PrivateRoute path="/playlists" exact component={Playlists}/>
                  <PrivateRoute path="/downloader" exact component={Downloader}/>
                  <PrivateRoute path="/queue" exact component={QueueView}/>
                  <PrivateRoute path="/profile" exact component={ProfileView}/>
                </ResponsiveDrawer>
              </Switch>
            </Router>
          </ThemeProvider>
        </Provider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    playerState: state.player
  })
}

export default App;
