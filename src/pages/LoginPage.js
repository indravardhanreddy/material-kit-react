import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

  const mdUp = useResponsive('up', 'md');

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
      <script dangerouslySetInnerHTML={{
        __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }} />
      <Helmet>
        <title> Login | TheActuals </title>
      </Helmet>
      <StyledRoot style={{height:'680px'}}>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}>
                <img src="/assets/illustrations/illustration_login.png" alt="login" />
              </div>
            </Typography>

          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to The Actuals
            </Typography>

            <Typography  sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link className='no-underline' style={{fontWeight:'bold'}} href='/signup' variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2} >
              <Button fullWidth size="large" color="inherit" variant="outlined" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>
            {isHovered && <Message severity="warn" text='Not Implemented yet' />}


            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
