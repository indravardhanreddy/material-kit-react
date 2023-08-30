import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import {
        ApolloClient,
        InMemoryCache,
        ApolloProvider,
      } from "@apollo/client";
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css'; 
// ----------------------------------------------------------------------


      

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache(),
        headers:{
          authorization:localStorage.getItem("token") || ""
        }
      });

root.render(
        <ApolloProvider client={client}>

        <App />
        </ApolloProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
