import React from 'react'
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from '../../../sections/account/account-profile';
import { AccountProfileDetails } from '../../../sections/account/account-profile-details';

const Profile = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={2}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </div>
  )
}

export default Profile