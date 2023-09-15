import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, Link, InputAdornment, ClickAwayListener } from '@mui/material';
import { Dropdown } from 'primereact/dropdown';
import { Link as RouterLink } from 'react-router-dom';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const dropdownOptions = [
    { label: 'DashboardApp', value: 'dbapp', url: 'http://localhost:3000/dashboard/app' },
    { label: 'DashboardUser', value: 'dbuser', url: 'http://localhost:3000/dashboard/user' },
    { label: 'Option 2', value: 'option2', url: 'https://example.com/page2' },
    { label: 'Option 3', value: 'option3', url: 'https://example.com/page3' },
  ];

  const handleDropdownItemClick = (event) => {
    const selectedOption = dropdownOptions.find(option => option.value === event.value);
    
    if (selectedOption && selectedOption.url) {
      // Redirect to the specified URL
      window.location.href = selectedOption.url;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar zIndex='1000'>
            {/* <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Navigator"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            /> */}
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20, marginRight: '20px' }} />
            <Dropdown
              optionLabel="label" 
              value={dropdownOptions[0].url}
              style={{ width: '100%', maxWidth : '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', boxShadow: 'none', position: 'relative', zIndex: '1060', fontSize:'1.5rem', fontWeight: 'bold'}}
              options={dropdownOptions}
              onChange={handleDropdownItemClick} // Attach the click handler
            />

            <Button variant="contained" onClick={handleClose}>
              Navigate
            </Button>

          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
