import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';

const PrivateEquity = () => {
  const [newsInfo, setNewsInfo] = React.useState([]);

  const url = 'https://share-market-news-api-india.p.rapidapi.com/marketNews';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
      'X-RapidAPI-Host': 'share-market-news-api-india.p.rapidapi.com'
    }
  };


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

  useEffect(() => {
    NewsData();
  }, [])

  return (
    newsInfo.map((news) => {
      return (
        <Card>
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <a href={news.URL} className="card-img-top">{news.URL}</a>
            </div>
            <h5 className="card-title">{news.Title}</h5>
            <p className="card-text">{news.Source}</p>
          </div >
        </Card>
      )
    })
  )
}

export default PrivateEquity;