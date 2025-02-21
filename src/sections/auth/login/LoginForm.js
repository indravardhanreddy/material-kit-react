import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider'
import { useMutation } from '@apollo/client';
import jwtDecode from "jwt-decode";
import { useAuth0 } from "@auth0/auth0-react";
import { SIGNIN_USER } from '../../../FetchMutationsAPI';
import { setProfileItems } from '../../../redux/reducers/profSlice';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { loginWithRedirect } = useAuth0();
  const [signinUser, { data, loading, error }] = useMutation(SIGNIN_USER)
  const dispatch = useDispatch();

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

    console.log(user)
    signinUser({

      variables: {
        signin: user
      }

    })

    setUser({
      email: '',
      password: '',
    })
  };

  if (data !== undefined) {
    localStorage.setItem("token", data.user.token)
    const decoded = jwtDecode(data.user.token);

    localStorage.setItem("userData", JSON.stringify(data.user.user))
    dispatch(setProfileItems(data.user.user))
    navigate('/dashboard/app')
  }

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
      life: 2000 // Display for 5 seconds
    });
  };
  const [showPassword, setShowPassword] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
  };

  return (
    <>
      <Toast ref={toast} />

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
      <script dangerouslySetInnerHTML={{
        __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }} />
      {error !== undefined && showErrorToast(error.message)}

      <div>
        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
        <InputText
          name="email"
          keyfilter={/^[^()<>*!]+$/}
          placeholder='Email Address'
          label="Email address"
          value={user.email}
          onChange={handleChange}
          className="w-full mb-3" />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText
          className="w-full mb-3"
          id='password'
          name="password"
          placeholder='Password'
          type='password'
          label="Password"
          value={user.password}
          onChange={handleChange} />
      </div>

      <div className="flex align-items-center justify-content-between mb-6">
        <div className="flex align-items-center">
          <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
          <label htmlFor="rememberme" >Remember me</label>
        </div>
        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" style={{color: '#2065D1'}}>Forgot your password?</a>
      </div>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
