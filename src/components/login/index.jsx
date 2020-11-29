import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';


function Login() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} lg={5} className={classes.root}>
        <form noValidate autoComplete="off">
          <Typography variant="h1" className={classes.title}>Reactify</Typography>
          <p>
            <TextField id="email" label="Email" variant="outlined" className={classes.email} />
            <TextField id="password" type="password" label="Password" variant="outlined" />
          </p>
          <p>
            <Button variant="contained" color="primary" disableElevation>
              Login
            </Button>
          </p>
        </form>
      </Grid>
    </Grid>

  );
};

export default Login;
