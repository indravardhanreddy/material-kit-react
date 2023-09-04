import { Helmet } from 'react-helmet-async';
// @mui
import React, { useState, useEffect} from 'react'
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import {Dialog} from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';

// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


const handleCopyText = (text) => {
  console.log(text)
  navigator.clipboard.writeText(text);
}

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [posts, setPosts] = useState([]);
  
  const fetchInfo = async () => {
    await fetch('https://localhost:7099/api/Blogs')
      .then((res) => res.json())
      .then((d) => setPosts(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
    <script dangerouslySetInnerHTML={{__html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }}/>
      <Helmet>
        <title> Dashboard: Blog | TheActuals </title>
      </Helmet>

      <Container style={{  zIndex: 2}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        {posts.length>1?

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index}/>
          ))}
        </Grid>  : <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Iconify icon={'svg-spinners:blocks-wave'} color="#1877F2" width={60} /></div>}
      </Container>
    </>
  );
}
