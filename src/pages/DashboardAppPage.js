import { Helmet } from 'react-helmet-async';
import './item.css'
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Grid, Container, Typography, Link } from '@mui/material';
import { SpeedDial } from 'primereact/speeddial';
import { Button } from 'primereact/button';
import { useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import App from '../gpt/App';
import { formatDate, formatDateAdded } from '../utils/formatDateAdded';
import Iconify from '../components/iconify';
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
import LineChart from '../components/chart/LineChart';

export default function DashboardAppPage(props) {

  const theme = useTheme();
  // const arr = props.data.props.data
  const [data, setData] = useState([]);
  const profileData = useSelector((pd) => pd.prof)
  const [tokenExpired, setTokenExpired] = useState(false);
  const [rawData, setRawData] = useState([]);
  const globalDate = useSelector((state) => state.globalFilter.fromDate)
  const [formattedGlobalDate, setFormattedGlobalDate] = useState('')
  const [chartData1Data, setChartData1Data] = useState([{ id: '1', date: "2023-09-01", usersCountByDate: 2 },
  ])
  const dispatch = useDispatch();
  const chartData1 = [
    { id: '1', date: "2023-09-01", usersCountByDate: 2 },
    { id: '2', date: "2023-09-02", usersCountByDate: 10 },
    { id: '3', date: "2023-09-03", usersCountByDate: 7 },
    { id: '4', date: "2023-09-04", usersCountByDate: 14 },
    { id: '5', date: "2023-09-05", usersCountByDate: 3 },
    { id: '6', date: "2023-09-06", usersCountByDate: 20 },
    { id: '7', date: "2023-09-07", usersCountByDate: 5 },
    { id: '8', date: "2023-09-08", usersCountByDate: 12 },
    { id: '9', date: "2023-09-09", usersCountByDate: 1 },
    { id: '10', date: "2023-09-10", usersCountByDate: 8 },
    { id: '11', date: "2023-09-11", usersCountByDate: 17 },
  ];

  const iframe = useRef(null);

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);


  const handleChat = () => {
    setVisible(true)
    scrolltobottom()
  }


  const iframeRef = useRef(null);

  function scrolltobottom() {

    console.log(iframeRef)
    const iframe = iframeRef.current;

    // Example: Change the source of the iframe
    iframe.src = 'www.indravardhan.com';
    // Wait for the iframe to load
    iframeRef.current.addEventListener('load', () => {
      // Access the contentWindow of the iframe
      const iframeWindow = iframeRef.current.contentWindow;

      console.log(iframeWindow.document.body.scrollHeight)
      // Scroll the iframe to the bottom (adjust this value as needed)
      iframeWindow.scrollTo(0, iframeWindow.document.body.scrollHeight);
    });
  };


  const toast = useRef(null);
  const items = [
    {
      label: 'TheActuals',
      icon: <Iconify icon="mdi:web-check" />,
      command: () => {
        handleChat()
      }
    },
    {
      label: 'LLama 13b',
      icon: <Iconify icon="carbon:model-alt" />,
      command: () => {
        setVisible2(true);
      }
    },
    {
      label: 'TheActuals GPT',
      icon: <Iconify icon="carbon:chat-bot" />,
      command: () => {
        setVisible3(true)
      }
    }
  ];

  let uniqueStates = []
  let uniqueCities = []
  console.log(chartData1)

  // useEffect(() => {
  //   setFilterIndexData([])
  //   switch (selectedIndex) {
  //     case 'NIFTY50':
  //       url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050';
  //       break;
  //     case 'NIFTYBANK':
  //       url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20BANK';
  //       break;
  //     case 'NIFTY100':
  //       url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20100';
  //       break;
  //     case 'NIFTYIT':
  //       url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20IT';
  //       break;
  //     case 'ALL' : 
  //       url = 'https://latest-stock-price.p.rapidapi.com/any';
  //       break;
  //     default:
  //       url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050';
  //   }

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
  //       'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
  //     }
  //   };

  //   fetchData();

  //   async function fetchData() {
  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.text();
  //       console.log(JSON.parse(result))
  //       setRawData(JSON.parse(result));
  //       dataConversion(JSON.parse(result))
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [selectedIndex])

  const token = localStorage.getItem("token")

  const userData = localStorage.getItem("userData")
  const [position, setPosition] = useState('bottom-right');

  console.log(token)

  const chartData2 = [
    { id: '1', date: "2023-08-01", usersCountByDate: 212 },
    { id: '2', date: "2023-08-02", usersCountByDate: 100 },
    { id: '3', date: "2023-08-03", usersCountByDate: 232 },
    { id: '4', date: "2023-08-04", usersCountByDate: 341 },
    { id: '5', date: "2023-08-05", usersCountByDate: 342 },
    { id: '6', date: "2023-08-06", usersCountByDate: 424 },
    { id: '7', date: "2023-08-07", usersCountByDate: -32 },
    { id: '8', date: "2023-08-08", usersCountByDate: 234 },
    { id: '9', date: "2023-08-09", usersCountByDate: 323 },
  ]

  const chartData3 = [
    { id: '1', date: "2023-08-01", usersCountByDate: 434 },
    { id: '2', date: "2023-08-02", usersCountByDate: 643 },
    { id: '3', date: "2023-08-03", usersCountByDate: 384 },
    { id: '5', date: "2023-08-05", usersCountByDate: 474 },
    { id: '6', date: "2023-08-06", usersCountByDate: 332 },
    { id: '7', date: "2023-08-07", usersCountByDate: 224 },
    { id: '8', date: "2023-08-08", usersCountByDate: 45 },
    { id: '9', date: "2023-08-09", usersCountByDate: 322 },
    { id: '10', date: "2023-08-10", usersCountByDate: 112 },
    { id: '11', date: "2023-08-11", usersCountByDate: 332 },
    { id: '12', date: "2023-08-12", usersCountByDate: 467 },
  ]

  const chartData4 = [
    { id: '1', date: "2023-08-01", usersCountByDate: 232 },
    { id: '2', date: "2023-08-02", usersCountByDate: 3234 },
    { id: '3', date: "2023-08-03", usersCountByDate: 3244 },
    { id: '5', date: "2023-08-05", usersCountByDate: 344 },
    { id: '6', date: "2023-08-06", usersCountByDate: 244 },
    { id: '7', date: "2023-08-07", usersCountByDate: 222 },
    { id: '8', date: "2023-08-08", usersCountByDate: 245 },
    { id: '9', date: "2023-08-09", usersCountByDate: 3322 },
    { id: '10', date: "2023-08-10", usersCountByDate: 1242 },
    { id: '11', date: "2023-08-11", usersCountByDate: 3342 },
    { id: '12', date: "2023-08-12", usersCountByDate: 4627 },
  ]

  console.log(globalDate)

  if (!token) {
    <Dialog />
  }

  useEffect(() => {
    console.log(chartData1)
    setChartData1Data(chartData1.filter((cd) => cd.date === globalDate))
  }, [globalDate])

  const handleIframeAction = () => {
    // Access the iframe element using the ref
    const iframe = iframeRef.current;

    // Check if the iframe exists and is loaded
    if (iframe) {
      // Access the iframe's content document
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

      const elementsToHide = ["div"];
      elementsToHide.forEach((elementId) => {
        const elementToHide = iframeDocument.getElementById(elementId);
        if (elementToHide) {
          elementToHide.style.display = "none";
        }
      });

      // Perform actions on the iframe's content, for example, changing the background color
      iframeDocument.body.style.backgroundColor = 'red';
    }
  };

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000; // Current time in seconds

      return decoded.exp < currentTime;
    } catch (error) {
      // Handle decoding errors (e.g., invalid token format)
      return true; // Treat as expired if there's an error
    }
  }

  const arr = []
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
    'emailaddress': 'moramindravardhanreddy@gmail.com'
  }

  useEffect(() => {
    // Function to check token expiration
    const checkTokenExpiration = () => {
      if (token && isTokenExpired(token)) {
        // Token has expired, unset it
        localStorage.removeItem("token");
        // Redirect to the login page or perform other logout actions
        // Example: window.location.href = "/login";
      }
    };

    // Check token expiration on component mount
    checkTokenExpiration();

    // You might want to periodically check token expiration, e.g., every minute
    const interval = setInterval(checkTokenExpiration, 60);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [token]);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  const uniqueStatesData = Object.values(counts);

  const loss = true;

  // let uniqueCitiesData = (Object.values(cities)).filter((ct) => ct.value >= 40);
  // const handleFullCityData = () => {
  //   uniqueCitiesData = Object.values(cities)
  //   console.log(uniqueCitiesData)

  // }


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

      {/* <SpeedDial model={items} radius={80} type="quarter-circle" direction="up-left" style={{ right: 50, bottom: 50, baseZIndex: "5000000" }} /> */}

      {visible ? <div>
        <Dialog id="pr_id_10" visible={visible} closable={false} dismissableMask={!visible} position={position} baseZIndex={1000000}
          style={{ backgroundColor: '#0b0f19' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
          <div style={{ height: '400px', width: '400px' }}><iframe ref={iframeRef} sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" src="www.indravardhan.com" title='Python Chat' style={{ width: '100%', height: '100%' , borderRadius: "20px" }} />
          </div>
          {/* <button onClick={handleIframeAction}>Change Iframe Content</button> */}
        </Dialog> </div> : ""}

      {visible2 ? <Dialog id="pr_id_10" closable={false} dismissableMask={!visible} visible={visible2} position={position} baseZIndex={1000000}
        style={{ backgroundColor: '#0b0f19', padding: '0px' }} onHide={() => setVisible2(false)} draggable={false} resizable={false}>
        <div style={{ height: '400px', width: '400px' }}><iframe ref={iframeRef} sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" src="https://codellama-codellama-13b-chat.hf.space" title='Python Chat' style={{ width: '100%', height: '100%', borderRadius: "20px" }} />
        </div>
      </Dialog> : ""}

      {visible3 ? <Dialog id="pr_id_11" closable={false} dismissableMask={!visible} visible={visible3} position={position} baseZIndex={1000000}
        style={{ backgroundColor: '#0b0f19' }} onHide={() => setVisible3(false)} draggable={false} resizable={false}>
        <div style={{ height: '400px', width: '600px' ,borderRadius: "20px" }}>
          <App />
        </div>
      </Dialog> : ""}

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Portfolio Performance(in ₹Rupees)
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={12}>
            <AppWidgetSummary title="This Week Earnings" props={(chartData1Data)} percentage={59.3} isLoss={!loss} total={23450} icon={'ant-design:dashboard-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Futures Earnings" props={chartData3} total={-5300} isLoss={loss} percentage={87.4} color="warning" icon={'clarity:flame-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Options Earnings" props={chartData2} percentage={34.4} isLoss={!loss} total={15290} color="info" icon={'bxs:objects-vertical-bottom'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Other Earnings" props={chartData4} total={3320} percentage={38.3} isLoss={!loss} color="warning" icon={'clarity:flame-solid'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Stocks"
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
                  name: 'Mutual Funds',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Futures',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Options',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Share of Income"
              chartData={[
                { label: 'Options', value: 4344 },
                { label: 'Futures', value: 5435 },
                { label: 'Commodities', value: 1443 },
                { label: 'Other', value: 4443 },
              ]}
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
              title="Profit Percentage"
              subheader="(+43%) than last month"
              chartData={[
                { label: 'Tata Motors', value: 400 },
                { label: 'Reliance Industries', value: 430 },
                { label: 'Infosys', value: 448 },
                { label: 'HDFC Bank', value: 470 },
                { label: 'TCS', value: 540 },
                { label: 'ITC Limited', value: 580 },
                { label: 'ICICI Bank', value: 690 },
                { label: 'HDFC', value: 1100 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Portfolio"
              chartLabels={['Equity', 'Options', 'Bonds', 'Fixed Assets', 'Mutual F...']}
              chartData={[
                { name: 'Holdings', data: [80, 50, 30, 100, 20] },
                { name: 'Sell off', data: [20, 30, 40, 20, 80] },
                { name: 'To Buy', data: [44, 76, 78, 43, 10] },
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
              title="Product Timeline"
              list={[...Array(7)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Implemented Multiple Widgets(Authorization)',
                  'Added MongoDB and Graphql API',
                  'Post and Comment Feature',
                  'Stocks Data and Old project inclusion',
                  'Sentimental Analysis',
                  'Added News API',
                  'Updated UI and Charts'
                ][index],
                type: `order${index + 1}`,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'Instagram',
                  value: 210,
                  icon: <Iconify icon={'line-md:instagram'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Github',
                  value: 1,
                  icon: <Iconify icon={'line-md:github'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 700,
                  icon: <Iconify icon={'line-md:linkedin'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 29,
                  icon: <Iconify icon={'line-md:twitter-x'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Product Roadmap - AI Data Analysis' },
                { id: '2', label: 'Chat Feature Implementation' },
                { id: '3', label: 'Stocks Financial Document Analysis Feature' },
                { id: '4', label: 'Adding Roles and Access Control' },
                { id: '5', label: 'Live Data Analytics' },
                { id: '6', label: 'Charts Analysis and Setup Alerts' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
