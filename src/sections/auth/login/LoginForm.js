import { useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Toast } from "primereact/toast";
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider'
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const [user, setUser] = useState({
    emailaddress: '',
    password: '',
  });
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser, [name]: value
    }));
  }

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

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
        if (data.successMessage) {
          console.log(data.successMessage)
          showSuccessToast(data.successMessage)
          navigate('/dashboard', { replace: true });
        }
        else {
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
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
    <script dangerouslySetInnerHTML={{__html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }}/>
      <Toast ref={toast} />
      <Stack spacing={3}>
        <span>
          <InputText name="emailaddress" keyfilter={/^[^()<>*!]+$/} placeholder='Email Address' label="Email address" value={user.emailaddress}
            onChange={handleChange} />
        </span>

        <span>
          <Password
            id='password'
            name="password"
            placeholder='Password'
            label="Password"
            value={user.password}
            onChange={handleChange}
            header={header} footer={footer}
            toggleMask
          />
        </span>

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
