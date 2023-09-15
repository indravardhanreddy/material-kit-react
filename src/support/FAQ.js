import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { SettingsNotifications } from '../sections/settings/settings-notifications';
import { SettingsPassword } from '../sections/settings/settings-password';
import App from '../gpt/App';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const FAQ = () => {
    return (
        <>
            <Helmet>
                <title>
                    Settings | The Actuals
                </title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Settings
                        </Typography>
                        <SettingsNotifications />
                        <SettingsPassword />
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default FAQ