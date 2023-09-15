import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from "react-redux";
import { setFromDate, setToDate } from "../../../redux/reducers/globalFilterSlice";
import Iconify from '../../../components/iconify/Iconify' ;
import { prDateConvert } from "../../../utils/formatTime";
import '../../../styles.css'
import { formatDateAdded } from "../../../utils/formatDateAdded";

export default function CalendarControl(props) {
    const dispatch = useDispatch()
    const datesData = useSelector((state) => state.globalFilter)
    console.log(datesData)
    const [dates, setDates] = useState(null)
    console.log(dates)

    const handleDates = () => {
        dispatch(setFromDate(formatDateAdded(Date(dates[0]))))
        dispatch(setToDate(dates[1]))
    }
    // write a use effect if there is a change in the dates then dispatch the action
    return (
        <div className="card flex justify-content-center" style={{marginRight: '10px'}}>
            <div style={{marginRight: '10px'}}>
                <Calendar placeholder="From Date - To Date" value={dates} onChange={(e) => setDates((e.value))} selectionMode="multiple" />
            </div>
            <Button style={{backgroundColor: '#2065D1', color: 'white', borderColor: 'transparent'}} onClick={handleDates}> <Iconify icon="mdi:events" /></Button>
        </div>
    )
}
