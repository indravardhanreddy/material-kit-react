import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, Link as RouterLink  } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import account from '../../../_mock/account';
import useResponsive from '../../../hooks/useResponsive';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig, { navConfigFunds, navConfigQA } from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------


Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const user = useSelector((prof)=>prof.prof)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState('center');
  const isDesktop = useResponsive('up', 'lg');
  const show = (page) => {
    setPosition('top-right');
    setVisible(true);
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  console.log(userData)

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2, py: 3, display: 'inline-flex' }}>
        <Logo style={{marginRight:'10px'}}/>
        <Link to='/signup' style={{
          fontWeight: 'bold',
          display: 'inline-block',
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          height: '45px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginRight: '10px'
        }} component={RouterLink}>Signup</Link>
        <Link to='/signin' style={{ fontWeight: 'Bold'  ,display: 'inline-block',
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          height: '45px',
          textDecoration: 'none',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',}} component={RouterLink}>  Signin  </Link>

      </Box>

      <Dialog visible={visible} position={position} style={{ width: '70vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}/>

      <Box sx={{ mb: 5, mx: 2.5 }} onClick = {show}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={userData!= null || userData!== undefined && account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userData.firstName + userData.lastName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userData.email.length > 10 ? `${userData.email.substring(0, 15) }...`: userData.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ textAlign: 'start', marginLeft : '27px'}}>
            <Typography gutterBottom variant="h11">
            Financial Services
            </Typography>
          </Box>
    
    <NavSection data={navConfigFunds} />

    <Box sx={{ textAlign: 'start', marginLeft : '27px'}}>
            <Typography gutterBottom variant="h11">
            For You
            </Typography>
          </Box>
    
    <NavSection data={navConfigQA} />

      <Box sx={{ px: 2.5, pb: 3}}>
        <Stack alignItems="start" spacing={3} sx={{ borderRadius: 4, position: 'relative' }}>
          {/* <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          /> */}

          <Button href="/resume" target="_blank" variant="contained">
            Resume
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
              {console.log(openNav)}

      {isDesktop ? (
        <Drawer
        open
        zIndex={1}
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
