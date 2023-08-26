import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'; 
import { Grid, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import axios from 'axios';

// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { setProfileItems } from '../redux/reducers/profSlice';

// ----------------------------------------------------------------------

export default function DashboardAppPage(props) {
  const theme = useTheme();
  const arr = props.data.props.data
  const [data, setData] = useState([]);
  const profileData = useSelector((pd)=>pd.prof)
  const dispatch = useDispatch();
  let uniqueStates = []
  let uniqueCities = []
  arr.forEach((a) => {
    const index = uniqueStates.findIndex(elem => elem.state === a.state);
    if (index === -1) {
      uniqueStates.push({ state: a.state });
    }
    const index1 = uniqueCities.findIndex(elem => elem.city === a.city);
    if (index === -1) {
      uniqueCities.push({ city: a.city });
    }
  })
  uniqueStates = uniqueStates.flatMap((a) => a.state)
  uniqueCities = uniqueCities.flatMap((a) => a.city)

  const counts = {};
  const cities = {};

  arr.forEach(item => {
    if (counts[item.state]) {
      counts[item.state].value += 1;
    } else {
      counts[item.state] = {
        label: item.state,
        value: 1
      };
    }
    if (cities[item.city]) {
      cities[item.city].value += 1;
    } else {
      cities[item.city] = {
        label: item.city,
        value: 1
      };
    }
  });

  const location = useLocation();
  const dataa = {
    'emailaddress' : 'moramindravardhanreddy@gmail.com'
}

  const fetchInfo = async () => {

    fetch('https://localhost:7099/api/Users/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.parse(dataa)
    })
      .then(response => response.json(data))
      .then(data => {
        if (data.successMessage) {
          console.log(data.successMessage)
          // showSuccessToast(data.successMessage)
        }
        else {
          // showErrorToast(data.errorMessage)
        }
        // Handle success or other actions
      })
      .catch(error => {
        console.error('Error creating user:', error);
        // Handle error
      });
}

useEffect(() => {
    fetchInfo();
}, []);


  const uniqueStatesData = Object.values(counts);

  let uniqueCitiesData = (Object.values(cities)).filter((ct) => ct.value >= 40);
  const handleFullCityData = () => {
    uniqueCitiesData = Object.values(cities)
    console.log(uniqueCitiesData)

  }
  console.log(uniqueCitiesData)

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
        <title> Dashboard | TheActuals </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={2345554} icon={'ant-design:dashboard-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'bxs:objects-vertical-bottom'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'clarity:flame-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ic:baseline-verified'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Popular States"
              chartData={uniqueStatesData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="City Visits Percentage"
              subheader="(+43%) than last year"
              chartData={uniqueCitiesData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'Instagram',
                  value: 323234,
                  icon: <Iconify icon={'line-md:instagram'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Github',
                  value: 341212,
                  icon: <Iconify icon={'line-md:github'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'line-md:linkedin'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'line-md:twitter-x'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
