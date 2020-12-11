import React from 'react';
import {connect} from 'react-redux';

// own
import useStyles from './styles';

function ProfileView({
  user
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>My profile</h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    user: state.user.current,
  });
}

export default connect(mapStateToProps)(ProfileView);