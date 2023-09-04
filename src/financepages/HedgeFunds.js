import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NavSection from '../components/nav-section';
import navConfig, { navConfigFunds, navConfigQA } from '../layouts/dashboard/nav/config';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function HedgeFunds() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        {/* <Divider />
        <List>
          {['Dashboard'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <NavSection data={navConfig} />
              <NavSection data={navConfigFunds} />
              <NavSection data={navConfigQA} />
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          ))}
        </List>
        <Divider /> */}
        <Typography paragraph>
          Hedge funds are investment vehicles that have gained prominence in the world of finance. These funds are known for their flexibility and unique strategies, which often set them apart from traditional investment options like mutual funds or exchange-traded funds (ETFs). Hedge funds are typically open to accredited or high-net-worth investors and are managed by experienced professionals who aim to generate returns regardless of market conditions.
        </Typography>
        <Typography paragraph>
        <p style={{fontWeight:'bold'}}>Diverse Investment Strategies:</p>
What distinguishes hedge funds is their wide array of investment strategies. These strategies can range from long-short equity trading, where fund managers take both long (buy) and short (sell) positions in stocks, to global macro strategies that capitalize on broad economic trends. Hedge funds may also employ leverage and derivatives to amplify returns, although this comes with increased risk. Some hedge funds focus on specific sectors or asset classes, while others employ multi-strategy approaches to diversify risk.

<p style={{fontWeight:'bold'}}>Risk and Reward</p>
Hedge funds are known for their potential for both high returns and high risk. While they aim to deliver positive returns in various market conditions, they are not immune to losses. Investors in hedge funds should be aware of the risks associated with these investments, including market risk, liquidity risk, and operational risk. Due diligence is crucial when selecting a hedge fund, and investors often seek those with a track record of consistent performance.

<p style={{fontWeight:'bold'}}>Fee Structure: </p>
Hedge funds typically charge fees that differ from traditional investment vehicles. In addition to a management fee, which is a percentage of assets under management (AUM), hedge funds often impose a performance fee, also known as a "carried interest." This performance fee is a percentage of profits generated, providing an incentive for fund managers to deliver strong returns. The fee structure can vary significantly among hedge funds.

<p style={{fontWeight:'bold'}}>Regulation and Transparency:</p>
Hedge funds are subject to regulatory oversight, but the level of regulation can differ by jurisdiction. Many hedge funds are domiciled in offshore financial centers, which can provide certain tax advantages and regulatory flexibility. The degree of transparency also varies among hedge funds; some are known for their secretive nature, while others provide regular reporting to investors.

<p style={{fontWeight:'bold'}}>Role in the Financial Markets:</p>
Hedge funds play a significant role in the global financial markets. They provide liquidity, contribute to price discovery, and can influence market sentiment. Their ability to pursue unique strategies can lead to innovative investment approaches. However, their actions can also amplify market volatility, as demonstrated during events like the global financial crisis.

<p style={{fontWeight:'bold'}}>Accessibility and Investor Base:</p>
Hedge funds have historically been accessible primarily to institutional investors and high-net-worth individuals. However, in recent years, there has been a growing interest in making hedge fund strategies available to a broader range of investors through alternative mutual funds and exchange-traded products. This democratization of hedge fund strategies is changing the landscape of the industry.
        </Typography>
      </Box>
    </Box>
  );
}