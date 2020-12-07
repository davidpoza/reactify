import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

// material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// material ui icons
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AlbumIcon from '@material-ui/icons/Album';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

// own
import useStyles from './styles';
import AppBar from '../app-bar';

const NavLinkMui = React.forwardRef((props, ref) => (
  <NavLink {...props} activeClassName="Mui-selected" ref={ref} />
))
function ResponsiveDrawer({
  children, user, ui,
}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuTexts = ['Home', 'Search', 'Albums', 'Playlists', 'Downloader'];
  const menuLinks = ['/', '/search', '/albums', '/playlists', '/downloader'];
  const menuIcons = [
    <HomeIcon className={classes.icon} />,
    <SearchIcon className={classes.icon} />,
    <AlbumIcon className={classes.icon} />,
    <FormatListNumberedIcon className={classes.icon} />,
    <CloudDownloadIcon className={classes.icon} />,
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} >Reactify</div>
      <Divider />
      <List>
        {menuTexts.map((text, index) => (
          <ListItem button key={text} component={NavLinkMui} to={menuLinks[index]} exact>
            <ListItemIcon>{menuIcons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar user={user} handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} style={ui.transparentToolbar ? {display: 'none'} : { display: 'block' }} />
        {children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {

};


const mapStateToProps = (state) => {
  return {
    user: get(state, 'user.current.user'),
    ui: get(state, 'ui'),
  }
}

export default connect(mapStateToProps)(ResponsiveDrawer);