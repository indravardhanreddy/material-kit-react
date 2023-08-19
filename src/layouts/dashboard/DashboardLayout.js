import React,{ useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import {Widget, addResponseMessage, addLinkSnippet, addUserMessage, setQuickButtons, renderCustomComponent} from 'react-chat-widget';
import { Button } from 'primereact/button';
import Header from './header';
import Nav from './nav';
import 'react-chat-widget/lib/styles.css';

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

  const [buttons,setButtons] = useState([{label: 'first', value: '1'}, {label: 'second', value: '2'}])
  const [open, setOpen] = useState(false);

  const callBack = (childData) => {
    console.log(childData)
  }

  const handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
  };
  
  const handleQuickButtonClicked = data => {
    console.log(data);
    setButtons(prevButtons => prevButtons.filter(button => button.value !== data));
  };

  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
    setQuickButtons(buttons); // Replace "buttons" with your actual quick buttons data
  }, []); 
  return (
    <div>
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} handleCallback1={callBack} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>

      <Widget
          handleNewUserMessage={handleNewUserMessage}
          handleQuickButtonClicked={handleQuickButtonClicked}
          // profileAvatar={'text'}
          title="TheActuals"
          subtitle="TheAct Bot"
        />
    </StyledRoot>
    </div>
  );
}
