// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, Chip } from '@mui/material';
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../../components/iconify';
import LineChart from '../../../components/chart/LineChart';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, props, color = 'primary', isLoss, percentage, sx, ...other }) {
  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 2,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >

      {/* <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(130deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.20
            )} 90%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon> */}

      <LineChart props={props} />


      <Typography variant="h4">{fShortenNumber(total)}</Typography>

      {percentage && (
        <Grid item>
          <Chip
            variant="combined"
            color={color}
            icon={
              <>
                {!isLoss && <Iconify icon="ant-design:rise-outlined" style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                {isLoss && <Iconify icon="ant-design:fall-outlined" style={{ fontSize: '0.75rem', color: 'inherit' }} />}
              </>
            }
            label={`${percentage}%`}
            sx={{ ml: 1.25, pl: 1 }}
            size="small"
          />
        </Grid>
      )}

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
