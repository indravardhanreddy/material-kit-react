import { useState } from 'react';
// @mui
import 'react-chat-elements/dist/main.css'
import { alpha } from '@mui/material/styles';
import { MessageBox, ChatItem ,MeetingMessage, Popup} from 'react-chat-elements'
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
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
    icon: <Iconify icon={'basil:home-solid'} color="#1C9CEA" width={20} />,
  },
  {
    label: 'Profile',
    icon: <Iconify icon={'solar:settings-bold'} color="#1C9CEA" width={20} />,
  },
  {
    label: 'Settings',
    icon:  <Iconify icon={'iconamoon:profile-fill'} color="#1C9CEA" width={20} />,
  },
  {
    label: 'Our Product',
    icon:  <Iconify icon={'ph:sparkle-fill'} color="#1C9CEA" width={20} />,
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const user = useSelector((state) => { return state.prof })
  console.log(user)
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState('center');
  const [item,setItem] = useState('')
  const [showchat,setShowchat] = useState(true)

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
        handleClose()
        show(item)
        break;
      case 'Profile':
        handleClose()
        show(item)
        break;
      case 'Settings': 
        handleClose()
        show(item)
        break;
      case 'Our Product': 
        handleClose()
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

      <Dialog header={item} visible={visible} position={position} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
        {item==='Home' && <><ChatItem
  avatar={'https://facebook.github.io/react/img/logo.svg'}
  alt={'Reactjs'}
  title={'Facebook'}
  subtitle={'What are you doing?'}
  date={new Date()}
  unread={0}
/></> } 
        {item==='Profile' && <>Profile</>}
        {item==='Our Product' && <>Our Product</> } 
        {item==='Settings' && <>Settings</>}
      </Dialog>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user.profileItems.profilepic} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {'Indravardhan'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label}  onClick={() => handleMenuItems(option.label)}>
              {option.icon}{' | '}{option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          {<Iconify icon={'majesticons:logout'} color="#1C9CEA" width={20} />} {' | '}Logout
        </MenuItem>
      </Popover>
    </>
  );
}
