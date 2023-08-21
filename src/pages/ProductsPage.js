import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
// @mui
import { InputText } from 'primereact/inputtext';
import { Container, Stack, Button, Typography } from '@mui/material';
// components
import { Dialog } from "primereact/dialog";
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from "primereact/chips";

import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [draggable, setDraggable] = useState(true);
  const [visible, setVisible] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const toast = useRef(null);
  const [product, setProduct] = useState({
    productname: '',
    productprice: 0.00,
    producttags: [],
    productdescription: '',
    createdDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct, [name]: value
    }));
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  console.log(visible)
  return (
    <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
    <script dangerouslySetInnerHTML={{__html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }}/>
      <Dialog header="Add Product" visible={visible} onHide={() => setVisible(false)} style={{ width: '70vw' }} draggable={draggable} resizable={false}>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
            <InputText style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} placeholder="Product Name" name="productname" value={product.productname} onChange={handleChange} />
          </span> </div>
        <InputNumber placeholder="Price" name="productprice" maxFractionDigits={2} mode="currency" currency="INR" locale="en-IN" value={product.productprice} onChange={handleChange} />
        <Chips placeholder="Tags" name="producttags" value={product.producttags} onChange={handleChange} seperator="," />
        <InputText placeholder="Description" name="productdescription" value={product.productdescription} onChange={handleChange} />
      </Dialog>
      <Helmet>
        <title> Dashboard: Products | TheActuals </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setVisible(true)} >
            New Product
          </Button>

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
