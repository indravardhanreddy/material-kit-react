import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
// import {Widget, addResponseMessage, addLinkSnippet, addUserMessage, setQuickButtons, renderCustomComponent} from 'react-chat-widget';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Header from './header';
import App from '../../gpt/App'
import Nav from './nav';
import Iconify from '../../components/iconify/Iconify';

// import 'react-chat-widget/lib/styles.css';

const siteProps = {
  name: "Elamri Maryem",
  title: "Web Designer & Data Analyst",
};
const primaryColor = "#4E567E";
const secondaryColor = "#D2F1E4";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {



  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [position, setPosition] = useState('bottom-right');

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

  const [buttons, setButtons] = useState([{ label: 'first', value: '1' }, { label: 'second', value: '2' }])
  const [open, setOpen] = useState(false);

  const callBack = (childData) => {
    console.log(childData)
  }

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

  // const handleNewUserMessage = newMessage => {
  //   console.log(`New message incoming! ${newMessage}`);
  //   // Now send the message through the backend API
  // };

  // const handleQuickButtonClicked = data => {
  //   console.log(data);
  //   setButtons(prevButtons => prevButtons.filter(button => button.value !== data));
  // };

  // useEffect(() => {
  //   addResponseMessage('Welcome to this awesome chat!');
  //   setQuickButtons(buttons); // Replace "buttons" with your actual quick buttons data
  // }, []); 
  return (
    <div>

      <StyledRoot>

        <Header onOpenNav={() => setOpen(true)} handleCallback1={callBack} />

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>

        <SpeedDial className='p-button-warning' id="speeddialstyle" model={items} radius={80} showIcon={ <Iconify icon="svg-spinners:blocks-scale" />} type="linear" direction="left" style={{ right: 30, bottom: 30, marginLeft:'10px', baseZIndex: "5000000",  position: 'fixed', border:'none'}} buttonStyle={{ backgroundColor:'#2065D1', border:'none', marginLeft:'10px',borderRadius:'5px', width:'50px', height:'50px' }}/>

        {visible ? <div>
          <Dialog id="pr_id_10" visible={visible} closable={false} dismissableMask={!visible} position={position} baseZIndex={1000000}
            style={{ backgroundColor: '#0b0f19' }} onHide={() => setVisible(false)} draggable={false} resizable={false}>
            <div style={{ height: '400px', width: '400px' }}><iframe ref={iframeRef} sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" src="www.indravardhan.com" title='Python Chat' style={{ width: '100%', height: '100%', borderRadius: "20px" }} />
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
          <div style={{ height: '400px', width: '600px', borderRadius: "20px" }}>
            <App />
          </div>
        </Dialog> : ""}

        {/* <Widget
          handleNewUserMessage={handleNewUserMessage}
          handleQuickButtonClicked={handleQuickButtonClicked}
          // profileAvatar={'text'}
          title="TheActuals"
          subtitle="TheAct Bot"
        /> */}
      </StyledRoot>
    </div>
  );
}
