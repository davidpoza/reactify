import React from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';

// material ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// own
import useStyles from './styles';

function ProfileView({
  user
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>My profile</h1>
      <Grid container direction="column" justify="center">
      <Grid item xs={12} lg={8}>
        <div className={classes.infoBlock}>
          <Typography variant="h6">User name</Typography>
          <Typography variant="body1">{user.username}</Typography>
        </div>
        <div className={classes.infoBlock}>
          <Typography variant="h6">Email</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </div>
        <div className={classes.infoBlock}>
          <Typography variant="h6">Account created at</Typography>
          <Typography variant="body1">{dayjs(user.created_at).format('DD-MM-YYYY [at] HH:mm')}</Typography>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    user: state.user.current.user,
  });
}

export default connect(mapStateToProps)(ProfileView);