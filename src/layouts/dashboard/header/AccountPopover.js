import { useState } from 'react';
// @mui
import 'react-chat-elements/dist/main.css'
import { alpha } from '@mui/material/styles';
import { MessageBox, ChatItem, MeetingMessage, Popup } from 'react-chat-elements'
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import ProfilePage from '../../MenuItems/ProfilePage';
import Home from '../profileitems/Home';
import Settings from '../profileitems/Settings'
import OurProduct from '../profileitems/OurProduct'
import Profile from '../profileitems/Profile'



// mocks_
import account from '../../../_mock/account';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: <Iconify icon={'basil:home-solid'} color="black" width={20} />,
  },
  {
    label: 'Profile',
    icon: <Iconify icon={'solar:settings-bold'} color="black" width={20} />,
  },
  {
    label: 'Settings',
    icon: <Iconify icon={'iconamoon:profile-fill'} color="black" width={20} />,
  },
  {
    label: 'Our Product',
    icon: <Iconify icon={'ph:sparkle-fill'} color="black" width={20} />,
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  // const user = useSelector((state) => { return state.prof })
  const userData = JSON.parse(localStorage.getItem("userData"))
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth0();


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("token")
    logout({ logoutParams: { returnTo: window.location.origin } })
    navigate('/login')
    setOpen(null);
  };

  const handleClosePopup = () => {
    setOpen(null);
  };

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState('center');
  const [item, setItem] = useState('')
  const [showchat, setShowchat] = useState(true)

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

  const show = (page) => {
    setPosition('top-right');
    setVisible(true);
    setItem(page)
  };
  const handleMenuItems = (item) => {
    console.log(item)


    switch (item) {
      case 'Home':
        handleClosePopup()
        show(item)
        break;
      case 'Profile':
        handleClosePopup()
        show(item)
        break;
      case 'Settings':
        handleClosePopup()
        show(item)
        break;
      case 'Our Product':
        handleClosePopup()
        show(item)
        break;
      default: <Home />
        break;
    }

    return (
      <ProfilePage />
    )
  }

  return (
    <>

      <Dialog header={item} visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
        {item === 'Home' && <><ChatItem
          avatar={'https://facebook.github.io/react/img/logo.svg'}
          alt={'Reactjs'}
          title={'Facebook'}
          subtitle={'What are you doing?'}
          date={new Date()}
          unread={0}
        /></>}
        {item === 'Profile' && <Profile />}
        {item === 'Our Product' && <div style={{height:'400px', width:'400px'}}><iframe sandbox="allow-scripts allow-same-origin allow-presentation" src="http://localhost:8501" title='Python Chat' style={{width: '100%', height: '100%'}} />  
</div>}
        {item === 'Settings' && <>Settings</>}
      </Dialog>
      <IconButton
        onClick={handleOpen}

        style={{
          borderRadius: '5px',
          width:'55px',
          height: '55px',
        }}
      >
<Iconify icon={'line-md:account-small'} color="black" style={{ borderRadius: '5px', width:'100%', height:'100%', border:'none', backgroundColor:'lightgrey'}}/>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.firstName}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'none' }} />

        <Stack >
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleMenuItems(option.label)} style={{ borderRadius: '10px', }}>
              {option.icon}{' | '}{option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose}>
          {<Iconify icon={'majesticons:logout'} color="black" width={20} />} {' | '}Logout
        </MenuItem>
      </Popover>
    </>
  );
}
