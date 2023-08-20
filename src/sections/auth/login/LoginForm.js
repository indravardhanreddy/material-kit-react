import { useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Toast } from "primereact/toast";
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const [user, setUser] = useState({
    emailaddress: '',
    password: '',
  });
  const toast = useRef(null);

  const handleChange = (e) =>{
    const { name, value} = e.target
    setUser((prevUser)=>({
      ...prevUser,[name]:value
    }));
  }

  const handleSubmit = event => {
    
    event.preventDefault();

    fetch('https://localhost:7099/api/Users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if(data.successMessage){
          console.log(data.successMessage)
          showSuccessToast(data.successMessage)
          navigate('/dashboard', { replace: true });
        }
        else{
        showErrorToast(data.errorMessage)
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



  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const handleClick = () => {
  };

  return (
    <>
          <Toast ref={toast} />
      <Stack spacing={3}>
        <TextField name="emailaddress" label="Email address" value={user.emailaddress}
 onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
