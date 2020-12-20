import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';

// material ui
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// own
import Avatar from '../avatar';
import useStyles from './styles';


function MyAppBar({handleDrawerToggle, user, ui}) {
  const classes = useStyles();

  const calcStyle = ui.transparentToolbar
    ? {
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: 'none',
    }
    : {
      backgroundColor: '#121212',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    };

  return (
    <AppBar position="fixed" className={classes.appBar} style={calcStyle} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
        </Typography>
        <Avatar url={get(user, 'avatar.url')} />
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  }
}
export default connect(mapStateToProps)(MyAppBar);

