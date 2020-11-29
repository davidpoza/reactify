import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import ResponsiveDrawer from '../components/responsive-drawer';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import store from '../store';

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
        type: 'dark',
      }
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
              <ResponsiveDrawer>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/search" exact component={Search}/>
                  <Route path="/albums" exact component={Albums}/>
                  <Route path="/playlists" exact component={Playlists}/>
                  <Route path="/downloader" exact component={Downloader}/>
                </Switch>
              </ResponsiveDrawer>
            </Router>
          </ThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
