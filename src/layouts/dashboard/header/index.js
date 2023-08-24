import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import React, { useState, useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';
import { SpeedDial } from 'primereact/speeddial';

import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import CalendarControl from './CalendarControl';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;


const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header(props) {
  const [childData, setChildData] = useState(null);
  const msgs = useRef(null);

  useEffect(()=>{msgs.current.show({
    severity: 'info',
    sticky: true,
    content: (
      <>
        <Iconify icon="line-md:alert-circle" />
        <div className="ml-2">TheActuals is still in Development and API is not deployed on server yet. For Suggestions - </div>
      </>
    )
  });
},[])

  const callBack = (childData) => {
    setChildData(childData)
  }
  props.handleCallback1(childData)

  const toast = useRef(null);
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://facebook.github.io/react/';
            }
        }
    ];
  console.log(props)
  return (
    <StyledRoot>no
      <Messages ref={msgs} />

      <StyledToolbar>
        <IconButton
          onClick={props.onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <CalendarControl handleCallback={callBack} />
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
