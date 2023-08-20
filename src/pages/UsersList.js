import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ExportToCsv } from "export-to-csv";
import CalendarControl from '../layouts/dashboard/header/CalendarControl';


const UsersList = () => {
    const [products, setProducts] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const fetchInfo = async () => {
        await fetch('https://localhost:7099/api/Users')
            .then((res) => res.json())
            .then((d) => {
                setRawData(d)
                dataConversion(d)
            })
    }

    useEffect(() => {
        fetchInfo();
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue('');
    };

    const dataConversion = (rawData) => {
        const groupedUsers = {};

        rawData.forEach((visit) => {
            const key = `${visit.firstName}`
            if (!groupedUsers[key]) {
                groupedUsers[key] = {
                    customerId: visit.customerId,
                    firstName: visit.firstName,
                    lastName: visit.lastName,
                    count: 0,
                    visits: []
                }
            }
            groupedUsers[key].count += 1
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
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 1000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 1000 });
    };

    const expandAll = () => {
        const _expandedRows = {};

        products.forEach((p) => {
            (_expandedRows[`${p.username}`] = true)
            return _expandedRows
        });
        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value;
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.emailaddress);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return (<Tag value={rowData.orderStatus} severity={getOrderSeverity(rowData.orderStatus)} />);
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
        return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)} />;
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
        console.log(order)
        switch (order.toString()) {
            case '4':
                return 'success';
            case '3':
                return 'danger';

            case '1':
                console.log("warning")
                return 'warning';

            case '2':
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
                    <Column field="orderId" header="Id" sortable />
                    <Column field="firstName" header="Customer" sortable />
                    <Column field="requiredDate" header="Date" sortable />
                    <Column field="orderId" header="Amount" body={amountBodyTemplate} sortable />
                    <Column field="OrderStatus" header="Status" body={statusOrderBodyTemplate} sortable />
                </DataTable>
            </div>
        );
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };
        console.log(_filters)

        _filters.global.value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const download = () => {
        console.log(products)
        csvExporter.generateCsv(rawData);
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
            <span className="flex flex-wrap justify-content-end ">
                <Button onClick={download}>Download</Button>
            </span>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );

    const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "User Data CSV",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    const handleCallback = (childData) => {
        console.log(childData)
    }
    
    return (
        <>
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                dataKey="customerId" header={header} tableStyle={{ minWidth: '60rem' }} filters={filters} globalFilterFields={['firstName', 'lastName']} emptyMessage="No customers found.">

                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="firstName" header="First Name" sortable />
                <Column field="lastName" header="Last Name" sortable />
                <Column field="count" header="Visits" sortable />
            </DataTable>
        </div>
        </>
    );
}

export default UsersList