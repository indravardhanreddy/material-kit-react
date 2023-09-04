// component
import { useSelector, useDispatch } from 'react-redux';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify/Iconify';
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
    icon: <Iconify  icon="ic:twotone-manage-accounts" />,
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
    icon:  <Iconify  icon="icon-park-outline:funds" />,
  },
  {
    title: 'Market Research',
    path: '/finance/equity',
    icon: <Iconify icon="icon-park-twotone:stock-market" />,
  },
  {
    title: 'Hedge Funds',
    path: '/finance/hedgefunds',
    icon: <Iconify icon="clarity:bank-solid" />,
  },
  {
    title: 'Bonds',
    path: '/finance/bonds',
    icon: <Iconify icon="ri:shake-hands-fill" />,
  },
  {
    title: 'Mutual Funds',
    path: '/finance/mutualfunds',
    icon: <Iconify icon="icon-park-outline:two-hands" />
  },
  {
    title: 'Market News',
    path: '/finance/marketnews',
    icon: <Iconify icon="iconamoon:news-duotone" />,
  },
  {
    title: 'Other Services',
    path: '/finance/other',
    icon: <Iconify icon="ic:twotone-design-services" />,
  },
  {
    title: 'Discussions',
    path: '/finance/discussions',
    icon:  <Iconify icon="healthicons:group-discussion-meeting" />,
  },
];

export const navConfigQA = [
  {
    title: 'FAQ',
    path: '/support/faq',
    icon: <Iconify icon="wpf:faq" />,
  },
  {
    title: 'Support',
    path: '/support/care',
    icon: <Iconify icon="mdi:support" />,
  },
  {
    title: 'About',
    path: '/',
    icon: <Iconify icon="mdi:about" />,
  }
];

export default navConfig;
