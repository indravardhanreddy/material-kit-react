// component
import { useSelector, useDispatch } from 'react-redux';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Accounts List',
    path: '/dashboard/userlist',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'CompanyBlock',
    path: '/dashboard/companydetails',
    icon: icon('ic_lock'),
  },
];

export const navConfigFunds = [
  {
    title: 'Asset Management',
    path: '/finance/assets',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Equity',
    path: '/finance/equity',
    icon: icon('ic_user'),
  },
  {
    title: 'Hedge Funds',
    path: '/finance/hedgefunds',
    icon: icon('ic_user'),
  },
  {
    title: 'Bonds',
    path: '/finance/bonds',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mutual Funds',
    path: '/finance/mutualfunds',
    icon: icon('ic_lock'),
  },
  {
    title: 'Private Equity',
    path: '/finance/privateequity',
    icon: icon('ic_blog'),
  },
  {
    title: 'Other Services',
    path: '/finance/other',
    icon: icon('ic_lock'),
  },
  {
    title: 'Discussions',
    path: '/finance/discussions',
    icon: icon('ic_cart'),
  },
];

export const navConfigQA = [
  {
    title: 'FAQ',
    path: '/support/faq',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Support',
    path: '/support/care',
    icon: icon('ic_user'),
  },
  {
    title: 'About',
    path: '/',
    icon: icon('ic_user'),
  }
];

export default navConfig;
