import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useRegistrationForm } from "../../hooks/useRegistrationForm"
import "../Login/Login.css"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Register() {
  const {form, errors, isProcessing, handleOnChange, handleOnSubmit, showPasswordBox, hide} = useRegistrationForm()
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 className="text">
          Register
        </h1>
        {errors?.form && <span className="error">{errors.form}</span>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={<span className="text">First Name</span> }
                autoFocus
                value={form.first_name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={<span className="text">Last Name</span> }
                name="last_name"
                autoComplete="lname"
                value={form.last_name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label={<span className="text">Username</span> }
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={<span className="text">Email Address</span> }
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={<span className="text">Password</span> }
                type={hide ? "password": "text"}
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel onClick={showPasswordBox}
                control={<Checkbox value="showPassword" color="primary" />}
                label={<span className="text">Show Password</span> }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
           disabled={isProcessing}
            onClick={handleOnSubmit}
            
          >
            <div component="h1" variant="button" className="text">
            Register
            </div>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" >
               <div className="text"> Already have an account? Login</div>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}