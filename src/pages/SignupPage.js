import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Avatar from '@mui/material/Avatar';
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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../FetchMutationsAPI';
import Logo from '../components/logo';



const defaultTheme = createTheme();

function SignupPage() {
  const toast = useRef(null);
  const [user, setUser] = useState({
    // username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [formData, setFormData] = useState({})
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER)
  const [checked, setChecked] = useState(true)

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser, [name]: value
    }));
  }

  const handleSubmit = event => {

    event.preventDefault();

    console.log(user)
    signupUser({

      variables: {
        signup: user
      }
    })
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

  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));

  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));

  return (
    <ThemeProvider theme={defaultTheme}>
          {console.log(loading)}
          <Toast ref={toast} />
          {data!== undefined && showSuccessToast("Signup Successful\nPlease Login to Continue")}
          {error!== undefined && showSuccessToast("Signup Successful\nPlease Login to Continue")}

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />
      </StyledRoot>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
            <span className="text-600 font-medium line-height-3">Already have an account?</span>
            <span className="font-medium no-underline ml-2 cursor-pointer">
                <Link href='/login' className="no-underline" variant="Bold">Login </Link>
            </span>
          </div>

          <div>
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" name="email" onChange={handleChange} type="text" placeholder="Email address" className="w-full mb-3" />

            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full mb-3" />

            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor="firstname" className="block text-900 font-medium mb-2">First Name</label>
            <InputText id="firstname" name="firstName" onChange={handleChange} type="text" placeholder="First Name" className="w-full mb-3" />

            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor="lastname" className="block text-900 font-medium mb-2">Last Name</label>
            <InputText id="lastname" name="lastName" onChange={handleChange} type="text" placeholder="Last Name" className="w-full mb-3" />

            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
            </div>
          </div>
          <Button label="Sign In" icon="pi pi-user" onClick={handleSubmit} className="w-full" />

        </div>
      </div>
    </ThemeProvider>
  )
}

export default SignupPage;