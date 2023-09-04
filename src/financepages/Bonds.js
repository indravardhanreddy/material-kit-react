import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled, useTheme } from '@mui/material/styles';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from '../sections/account/account-profile';
import { AccountProfileDetails } from '../sections/account/account-profile-details';

const Bonds = () => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Helmet>
        <title>
          Finance | Bonds
        </title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <DrawerHeader />
          {/* <Divider />
        <List>
          {['Dashboard'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <NavSection data={navConfig} />
              <NavSection data={navConfigFunds} />
              <NavSection data={navConfigQA} />
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          ))}
        </List>
        <Divider /> */}
          <Typography paragraph>
            A bond is a financial instrument that represents a debt obligation issued by a borrower, typically a government or corporation, to raise capital. When an entity issues a bond, they are essentially borrowing money from investors in exchange for periodic interest payments and the promise to repay the bond's face value at maturity.        </Typography>
          <Typography paragraph>
            <p style={{ fontWeight: 'bold' }}>Government Bonds: </p>
            Issued by governments to fund various public projects and expenditures. These are often considered low-risk because they are backed by the government's taxing power. Examples include U.S. Treasury bonds and municipal bonds.
            <p style={{ fontWeight: 'bold' }}> Corporate Bonds:</p>
            Issued by corporations to raise capital for business operations, expansion, or debt refinancing. The risk associated with corporate bonds varies depending on the issuer's creditworthiness.          

            <p style={{ fontWeight: 'bold' }}>High-Yield Bonds (Junk Bonds): </p>
            Issued by companies with lower credit ratings, they offer higher yields to compensate for the increased risk of default.         

          </Typography>
        </Box>
      </Box>
    </>)
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Bonds;
