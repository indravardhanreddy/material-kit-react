import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

const UsersList = () => {
  const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);

    const fetchInfo = async () => {
        await fetch('https://localhost:7099/api/Values')
          .then((res) => res.json())
          .then((d) => dataConversion(d))
      }
    
      useEffect(() => {
        fetchInfo();
      }, []);

  const dataConversion = (rawData) => {
    const groupedUsers = {};

    rawData.forEach((visit) => {
      const key = `${visit.firstName}`
      if (!groupedUsers[key]) {
        groupedUsers[key] = {
          customerId: visit.customerId,
          firstName: visit.firstName,
          lastName: visit.lastName,
          visits: []
        }
      }
      groupedUsers[key].visits.push({
        customerId: visit.customerId,
        firstName: visit.firstName,
        lastName: visit.lastName,
        orderDate: visit.orderDate,
        requiredDate: visit.requiredDate,
        orderId: visit.orderId,
        orderStatus: visit.orderStatus
      })
    })

    console.log(groupedUsers)
    setProducts(Object.values(groupedUsers))
  }


    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        const _expandedRows = {};

        products.forEach((p) => {return _expandedRows[`${p.customerId}`] = true});

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value;
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.orderId);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return (<Tag value={rowData.status} severity={getOrderSeverity(rowData)}></Tag>);
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} width="64px" className="shadow-4" />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>;
    };

    const getProductSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const allowExpansion = async (rowData) => {
       return await rowData.visits.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.firstName}</h5>
                <DataTable value={data.visits}>
                    <Column field="orderId" header="Id" sortable></Column>
                    <Column field="firstName" header="Customer" sortable></Column>
                    <Column field="requiredDate" header="Date" sortable></Column>
                    <Column field="orderId" header="Amount" body={amountBodyTemplate} sortable></Column>
                    <Column field="OrderStatus" header="Status" body={statusOrderBodyTemplate} sortable></Column>
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    {console.log(products)}

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="customerId" header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="firstName" header="Name" sortable />
            </DataTable>
        </div>
    );
}

export default UsersList