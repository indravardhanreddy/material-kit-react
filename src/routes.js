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
import Main from "./resume/Main";
import {ThemeContext} from "./resume/Context";

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
    { path: 'companydetails', element: <CompanyBlock />},
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: 'resume',
      element: <Main />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
