import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';


function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onFormSubmit(e) {
    e.preventDefault();
    console.log("formulario enviado")
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} lg={5} className={classes.root}>
        <form noValidate autoComplete="off" onSubmit={onFormSubmit}>
          <Typography variant="h1" className={classes.title}>Reactify</Typography>
          <p>
            <TextField
              id="email" label="Email" variant="outlined" className={classes.email}
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="password" type="password" label="Password" variant="outlined"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </p>
          <p>
            <Button variant="contained" color="primary" type="submit" disableElevation disabled={!password || !email}>
              Login
            </Button>
          </p>
        </form>
      </Grid>
    </Grid>

  );
};

export default Login;
