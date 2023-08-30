import { useNavigate, Navigate, useRoutes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import { ThemeContext } from "./resume/Context";
import App from './resume/App';
import AssetManagement from './financepages/AssetManagement';
import HedgeFunds from './financepages/HedgeFunds';
import Equity from './financepages/Equity';
import PrivateEquity from './financepages/PrivateEquity';
import MutualFunds from './financepages/MutualFunds';
import Other from './financepages/Other';
import Bonds from './financepages/Bonds';
import FAQ from './support/FAQ';
import MainPage from './MainPage';

// ----------------------------------------------------------------------

export default function Router(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  function checkIfAuthenticated() {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    return token !== null;
  }

  const AuthRoute = ({ element, path }) => {

    const navigate = useNavigate();

    // Check if the user is authenticated (based on your token logic)
    const isAuthenticated = checkIfAuthenticated(); // Replace with your authentication logic
    console.log(isAuthenticated)

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
        // Redirect to login page if not authenticated
      }
    }, [isAuthenticated])


    return element;
  };


  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AuthRoute element={<DashboardLayout />} path = '/dashboard'/>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <AuthRoute element={<DashboardAppPage data={{ props }} />} path = '/app'/> },
        { path: 'user', element: <AuthRoute element={<UserPage data={{ props }} />} path = '/user'/> },
        { path: 'products', element: <AuthRoute element={<ProductsPage />} path = '/products'/> },
        { path: 'blog', element: <AuthRoute element={<BlogPage /> } path = '/blog'/>},
        { path: 'userList', element: <AuthRoute element={<UsersList />} path = '/userlist'/> },
        { path: 'companydetails', element: <AuthRoute element={<CompanyBlock />} path = '/companydetails'/> },
      ],
    },
    {
      path: '/finance',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'assets', element: <AuthRoute element={<AssetManagement data={{ props }} /> } path = '/assets'/>},
        { path: 'equity', element: <AuthRoute element={<Equity /> } path = '/equity'/>},
        { path: 'hedgefunds', element: <AuthRoute element={<HedgeFunds /> } path = '/hedgefunds'/>},
        { path: 'bonds', element: <AuthRoute element={<Bonds /> } path = '/assets'/>},
        { path: 'mutualfunds', element: <AuthRoute element={<MutualFunds /> } path = '/mutualfunds'/>},
        { path: 'privateequity', element: <AuthRoute element={<PrivateEquity /> } path = '/privateequity'/>},
        { path: 'other', element: <AuthRoute element={<Other /> } path = '/other'/>},
      ],
    },
    {
      path: '/support',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'faq', element: <FAQ data={{ props }} /> },
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
        { element: <Navigate to="/" />, index: true },
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
