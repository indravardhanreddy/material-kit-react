import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from "react-redux";
import { constant, max, set } from "lodash";
import { setFromDate, setToDate } from "../../../redux/reducers/globalFilterSlice";

export default function CalendarControl(props) {
    const dispatch = useDispatch()
    const datesData = useSelector((state) => state.globalFilter)
    const [dates, setDates] = useState([null, null]);

    const minDate = new Date(datesData.fromDate);
    const maxDate = new Date(datesData.toDate);
    // write a use effect if there is a change in the dates then dispatch the action

    // useEffect(() => {
    //     console.log(dates)
    //     dispatch(setFromDate(dates[0]))
    //     dispatch(setToDate(dates[1]))
    // }, [dates])
    return (
        <div className="card flex justify-content-center">
            <Calendar value={dates} onChange={(e) => setDates(e.value)} dateFormat="yyyy/mm/dd" selectionMode="range" minDate={minDate} maxDate={maxDate
            } readOnlyInput />
            <Button>Apply</Button>
        </div>
    )
}
