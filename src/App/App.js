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
import Home from '../components/home';
import AlbumView from '../components/album-view';

// Css
import './App.css';


const Search = () => {
  return <p>Search</p>;
}

const Albums = () => {
  return <p>Albums</p>;
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
                  <PrivateRoute path="/" exact component={Home}/>
                  <Route path="/search" exact component={Search}/>
                  <Route path="/albums" exact component={Albums}/>
                  <Route path="/album/:id" exact component={AlbumView}/>
                  <Route path="/playlists" exact component={Playlists}/>
                  <Route path="/downloader" exact component={Downloader}/>
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
