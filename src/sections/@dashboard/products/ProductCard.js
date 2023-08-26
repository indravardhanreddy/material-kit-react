import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputNumber } from 'primereact/inputnumber';
// utils
import { Button } from 'primereact/button';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [value3, setValue3] = useState(1);
  const [countBtn,setCountBtn] = useState(false)
  const handleProductCount = () =>{
    setCountBtn(true)
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <div style={{gap: '30px', flexDirection: 'column'}}>
          <Button icon="pi pi-shopping-cart" style={{marginRight:'10px', backgroundColor: 'skyblue' , borderColor:'transparent'}} onClick={handleProductCount}/>
          {countBtn ? <InputNumber inputId="minmax-buttons" inputStyle={{ fontSize: '15px', width:'50px'}} value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" showButtons min={0} max={5} /> :" " }
        </div>
      </Stack>
    </Card>
  );
}
