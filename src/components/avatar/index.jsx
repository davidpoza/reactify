import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import config from '../../config';

export default function MyAvatar(props) {

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

MyAvatar.propTypes = {
  url: PropTypes.string,
};
