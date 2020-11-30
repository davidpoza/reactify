import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ResponsiveDrawer from '../components/responsive-drawer';
import store from '../store';
import LoginForm from '../components/login';
import PrivateRoute from '../hocs/private-route';

// Css
import './App.css';


const Home = () => {
  return <p>Homepage</p>;
}

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
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    }

    this.darkTheme = createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#1db954',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#212121',
          main: '#121212',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#ffcc00',
        },
        background: {
          default: '#212121',
          paper: '#191414',
        },
        text: {
          primary: '#fff',
          secondary: '#b3b3b3',
        },
        action: {
          active: '#1db954',
          selected: '#282828',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
    });
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: json
      }));
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ThemeProvider theme={this.darkTheme}>
            <Router>
              <Switch>
                <Route path="/login" exact component={LoginForm} />
                <ResponsiveDrawer>
                  <PrivateRoute path="/" exact component={Home}/>
                  <Route path="/search" exact component={Search}/>
                  <Route path="/albums" exact component={Albums}/>
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
