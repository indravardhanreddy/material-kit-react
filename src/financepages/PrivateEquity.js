import React, { useEffect, useState } from 'react'
// import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Grid, Container, Typography, Link, Card } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Iconify from '../components/iconify/Iconify';

const PrivateEquity = () => {
  const [newsInfo, setNewsInfo] = React.useState([]);
  const [titleSentiment, setTitleSentiment] = useState([]);

  const url = 'https://share-market-news-api-india.p.rapidapi.com/marketNews';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
      'X-RapidAPI-Host': 'share-market-news-api-india.p.rapidapi.com'
    }
  };

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }


  const NewsData = async () => {
    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        console.log(response.status)
        const result = await response.json();
        setNewsInfo(result);
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  const handleSentiment = (comment) => {
    console.log(comment)
    query(comment).then((response) => {
      console.log(response[0])
      if (JSON.stringify(response)[0] === '[') {
        setTitleSentiment(response[0])
      }
    });
  }

  useEffect(() => {
    NewsData();
  }, [])

  return (
    <Card item md={6} lg={4}>
      {titleSentiment !== undefined && titleSentiment.length > 0 && <Dialog footer={<Typography variant="subtitle1" color="text.secondary">Model Used - roberta-base-sentiment </Typography>} onHide={() => setTitleSentiment([])} visible={titleSentiment.length > 0}>{titleSentiment.map((cs) => {
        return (
            <div>
              <Typography variant="subtitle1" color="text.primary">{cs.label} - {(cs.score * 100).toFixed(2)}%</Typography>
            </div>
        )
      })}</Dialog>}

      {
        newsInfo !== undefined && newsInfo.length > 0 ? newsInfo.map((news) => {
          const titleNews = news.Title;
          console.log(news)
          return (
            <Grid item xs={12} md={6}>
      <CardActionArea component="a">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5"  onClick={() => handleSentiment(news.Title)}>
            {news.Title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {news.URL}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {news.Source}
            </Typography>
          </CardContent>
           {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            // image={}
            // alt={post.imageLabel}
          /> */}
        </Card>
        <a href={news.URL} style={{ fontWeight:'bold', textDecoration:'none', }} color="primary">
            <p style={{color:'black'}} >Link : </p> {news.URL}
            </a>
      </CardActionArea>
    </Grid>
            // <Card style={{ marginBottom: '10px' }}>
            //   <div className="card" style={{ width: '18rem' }}>
            //     <Button className="card-title" style={{ fontWeight: 'bold', display:'column'}} onClick={() => handleSentiment(news.Title)}>{news.Title}</Button>
            //     <div className="card-body">
            //       <a href={news.URL} className="card-img-top">{news.URL}</a>
            //     </div>
            //     <p className="card-text">{news.Source}</p>
            //   </div >
            // </Card>
          )
        }) :  <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Iconify icon={'svg-spinners:blocks-wave'} color="#1877F2" width={60} /></div>
      }
    </Card>
  )
}

export default PrivateEquity;