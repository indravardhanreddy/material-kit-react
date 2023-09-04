import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography, Link } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Iconify from '../components/iconify/Iconify';
import LineChart from '../components/chart/LineChart';
import {
  AppNewsUpdate
} from '../sections/@dashboard/app';



const MutualFunds = () => {
  const [visible, setVisible] = useState(false);
  const [mFNews, setMFNews] = useState([]);
  console.log(mFNews)

  const url = 'https://latest-mutual-fund-nav.p.rapidapi.com/fetchLatestNAV';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
      'X-RapidAPI-Host': 'latest-mutual-fund-nav.p.rapidapi.com'
    }
  };

  const MutualFundsNews = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setMFNews(JSON.parse(result));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    MutualFundsNews();
  }, []);

  console.log([...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: faker.name.jobTitle(),
    description: faker.name.jobTitle(),
    image: `/assets/images/covers/cover_${index + 1}.jpg`,
    postedAt: mFNews.Date,
  })))

  return (
    mFNews!==undefined && mFNews? <Grid item xs={12} md={6} lg={8}>
      <Helmet>
        <title>
          Finance | Discussions
        </title>
      </Helmet>

      <AppNewsUpdate
        title="Mutual Funds"
        list={mFNews.slice(20, 50).map((mf, index) => ({
          id: faker.datatype.uuid(),
          title: mf['Scheme Category'],
          description: mf['Mutual Fund Family'],
          assetValue: mf['Net Asset Value'],
          image: index < 20 ? `/assets/images/covers/cover_${index + 1}.jpg` : `/assets/images/covers/cover_${index + 1 - index}.jpg`,
          postedAt: mf.Date,
        }))}
      />

    </Grid> :  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Iconify icon={'svg-spinners:blocks-wave'} color="#1877F2" width={60} /></div>
  )
}

export default MutualFunds