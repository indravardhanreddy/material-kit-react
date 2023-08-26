// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const [visibleRight, setVisibleRight] = useState(false);

  return (
    <StyledRoot>
      <Badge showZero badgeContent={0} color="error" max={99} onClick={() => setVisibleRight(true)}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>

      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        <h2>Right Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
    </StyledRoot>
  );
}
