import { de } from 'date-fns/locale';
import React, { useEffect, useState, useRef } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ExportToCsv } from "export-to-csv";
import { Helmet } from 'react-helmet-async';
import Iconify from '../components/iconify';
import Typography from '../theme/overrides/Typography';

const Equity = () => {
  let url = ''
  const [selectedIndex, setSelectedIndex] = useState('NIFTY50');
  const [filterIndexData, setFilterIndexData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const [checked, setChecked] = useState()
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    symbol: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    open: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    current: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const cities = [
    { name: 'Nifty 50', code: 'NIFTY50' },
    { name: 'Nifty 100', code: 'NIFTY100' },
    { name: 'Nifty Bank', code: 'NIFTYBANK' },
    { name: 'Nifty IT', code: 'NIFTYIT' },
    { name: 'Nifty MidCap 50', code: 'NIFTYMID50' },
    { name: 'All', code: 'ALL'}
  ];

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };
    console.log(_filters)

    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    setFilterIndexData([])
    switch (selectedIndex) {
      case 'NIFTY50':
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050';
        break;
      case 'NIFTYBANK':
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20BANK';
        break;
      case 'NIFTY100':
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20100';
        break;
      case 'NIFTYIT':
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20IT';
        break;
      case 'NIFTYMID50':
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20MIDCAP%2050'
        break;
      case 'ALL' : 
        url = 'https://latest-stock-price.p.rapidapi.com/any';
        break;
      default:
        url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050';
    }

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ae45a5fae5msh317b7baf0c980a0p1b4c3ajsn37ee746f0c3f',
        'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
      }
    };

    fetchData();

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(JSON.parse(result))
        setRawData(JSON.parse(result));
        dataConversion(JSON.parse(result))
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedIndex])

  const expandAll = () => {
    const _expandedRows = {};

    filterIndexData.forEach((p) => {
      (_expandedRows[`${p.moreData}`] = true)
      return _expandedRows
    });
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <span className="p-float-label">
        <Dropdown inputId="dd-city" value={selectedIndex} onChange={(e) => setSelectedIndex(e.value)} options={cities} optionLabel="name" optionValue='code' className="w-full md:w-14rem" />
        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
        <label htmlFor="dd-city">Select Index</label>
      </span>
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />

      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );

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

    rawData.slice(1).forEach((visit) => {
      const key = `${visit.symbol}`
      if (!groupedUsers[key]) {
        groupedUsers[key] = {
          symbol: visit.symbol,
          open: visit.open,
          current: visit.lastPrice,
          date: visit.lastUpdateTime,
          totalvolume: visit.totalTradedVolume,
          moreData: []
        }
      }
      // groupedUsers[key].count += 1
      groupedUsers[key].moreData.push({
        change : visit.change,
        dayHigh : visit.dayHigh,
        dayLow : visit.dayLow,
        pChange : visit.pChange,
        perChange30d : visit.pChange30d,
        perChange365d : visit.pChange365d,
        previousClose : visit.previousClose,
        totalTradedVolume : visit.totalTradedVolume,
        totalTradedValue : visit.totalTradedValue,
        yearHigh : visit.yearHigh,
        yearLow : visit.yearLow
      })
    })


    setFilterIndexData(Object.values(groupedUsers))
    setRawData([])
  }


  const onRowExpand = (event) => {
    toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 1000 });
  };

  const onRowCollapse = (event) => {
    toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 1000 });
  };

  const allowExpansion = async (rowData) => {
    return await rowData > 0;
  };

  const download = () => {
    csvExporter.generateCsv(rawData);
  };

  const rowExpansionTemplate = (data) => {
    const result = []

    return (
      <div className="p-3">
        <Panel header="More Details">
          {console.log(data.moreData[0])}
          {data.moreData.length > 0 ? <div>
              <p color="text.primary">Day High : {data.moreData[0].dayHigh}</p>
              <p color="text.primary">Total Traded Value : {data.moreData[0].totalTradedValue}</p>
              <p color="text.primary">Total Traded Volume : {data.moreData[0].totalTradedVolume}</p>
              <p color="text.primary">Previous Close : {data.moreData[0].previousClose}</p>
              <p color="text.primary">Year High : {data.moreData[0].yearHigh}</p>
              <p color="text.primary">Year Low : {data.moreData[0].yearLow}</p>
              <p color="text.primary">Change : {data.moreData[0].change}%</p>
            </div> 
            : 'No More Relevant Data'}
        </Panel>
      </div>
    );
  };

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={download} />;


  // useEffect(()=>{
  //   fetch('http://localhost:4000', {
  //     method: 'post',
  //     headers : {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       query: `
  //       query getAllUsers{
  //         users{
  //           email
  //           lastName
  //           firstName
  //           posts
  //           {
  //             post
  //             userId
  //             comments{
  //               comment
  //               userId
  //             }
  //           }
  //         }
  //       }
  //       `
  //     })
  //   }).then(res => res.json())
  //   .then(data => console.log(data))
  // },[])
  return (

    <div className="card flex justify-content-center">
        <Helmet>
                <title>
                    Finance | Market Research
                </title>
            </Helmet>


      <div className="card">
        <Toast ref={toast} />

        {filterIndexData.length > 0 ?
          <DataTable value={filterIndexData} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
            paginator rows={15} rowsPerPageOptions={[5, 10, 25, 50]} onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} dataKey="open" header={header} size='small' tableStyle={{ minWidth: '40rem' }} filters={filters} globalFilterFields={['firstName', 'lastName']} emptyMessage="No Index found.">

            <Column expander={allowExpansion} style={{ width: '5rem' }} />
            <Column field="symbol" header="Symbol" sortable />
            <Column field="open" header="Open Price" sortable />
            <Column field="current" header="Current Price" sortable />
            <Column field="date" header="Last Updated" sortable />
            <Column field="totalvolume" header="Total Traded Volume"
              sortable />
          </DataTable> : <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Iconify icon={'svg-spinners:blocks-wave'} color="#1877F2" width={60} /></div>}
      </div>
    </div>
  )
}

export default Equity