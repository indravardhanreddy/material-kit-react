import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

function SignupPage() {
  const toast = useRef(null);
  const [user, setUser] = useState({
    username: '',
    emailaddress: '',
    firstname: '',
    lastname: '',
    password: '',
    country: ''
  });


  const handleChange = (e) =>{
    const { name, value} = e.target
    setUser((prevUser)=>({
      ...prevUser,[name]:value
    }));
  }

  const handleSubmit = event => {
    
    event.preventDefault();

    fetch('https://localhost:7099/api/Users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if(data.errorMessage){
          showErrorToast(data.errorMessage)
        }
        else{
        showSuccessToast("Signup Successful\nPlease Signin to Continue")
        }
        // Handle success or other actions
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Handle error
      });
  };

  const showSuccessToast = (message) => {
    toast.current.show({
      severity: 'success',
      summary: 'Success Message',
      detail: message,
      life: 3000 // Display for 3 seconds
    });
  };

  const showErrorToast = (message) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error Message',
      detail: message,
      life: 5000 // Display for 5 seconds
    });
  };

  return (
<ThemeProvider theme={defaultTheme}>
<Toast ref={toast} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailaddress"
                  label="Email Address"
                  name="emailaddress"
                  autoComplete="emailaddress"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  onChange={handleChange}
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Terms & Conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit = {handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  );
}

export default SignupPage;