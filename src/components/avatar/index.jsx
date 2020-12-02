import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';

// material ui
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// own
import config from '../../utils/config';
import useStyles from './styles';

function MyAvatar(props) {
  const { user } = props;
  const classes = useStyles();
  const { url } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // llamada a action logout
  };

  if (url) {
    return (
      <>
        <Avatar
          onClick={handleClick}
          className={classes.avatar}
          src={`${config.API_HOST}${url}`}
        />
        <span onClick={handleClick} className={classes.username}>{get(user, 'email')}</span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.menuEmail} disabled>ssss</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }
  return (null);
}


const mapStateToProps = (state) => {
  return {
    user: state.user.current ? state.user.current.user : null,
  }
}
const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAvatar);

MyAvatar.propTypes = {
  url: PropTypes.string,
};
