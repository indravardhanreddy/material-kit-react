import { Navigate, useRoutes } from 'react-router-dom';
import React,{useState} from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import UsersList from './pages/UsersList';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CompanyBlock from './pages/CompanyBlock'
import SignUpPage from './pages/SignupPage';
import {ThemeContext} from "./resume/Context";
import App from './resume/App';
import AssetManagement from './financepages/AssetManagement';
import HedgeFunds from './financepages/HedgeFunds';
import Equity from './financepages/Equity';
import PrivateEquity from './financepages/PrivateEquity';
import MutualFunds from './financepages/MutualFunds';
import Other from './financepages/Other';
import Bonds from './financepages/Bonds';

// ----------------------------------------------------------------------

export default function Router(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage data = {{props}}/> },
        { path: 'user', element: <UserPage data = {{props}}/> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'userList', element: <UsersList />},
        { path: 'companydetails', element: <CompanyBlock />},
      ],
    },
    {
      path: '/finance',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'assets', element: <AssetManagement data = {{props}}/> },
        { path: 'equity', element: <Equity /> },
        { path: 'hedgefunds', element: <HedgeFunds /> },
        { path: 'bonds', element: <Bonds /> },
        { path: 'mutualfunds', element: <MutualFunds />},
        { path: 'privateequity', element: <PrivateEquity />},
        { path: 'other', element: <Other />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: 'resume',
      element: <App />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
