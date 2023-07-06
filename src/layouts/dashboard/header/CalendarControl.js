import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export default function CalendarControl(props) {
    const [dates, setDates] = useState([new Date('2015/01/01'),new Date('2015/02/01')]);
    let minDate = ''
    minDate = new Date('2015/01/01');
    let maxDate = ''
    maxDate = new Date();
    console.log(minDate,maxDate)

    const handleApply = () =>{
        
    }
    console.log(dates)
    return (
        <div className="card flex justify-content-center">
        {props.handleCallback(dates)}
        <Calendar value={dates} onChange={(e) => setDates(e.value)} dateFormat="yy/mm/dd" selectionMode="range" minDate={minDate} maxDate={maxDate
        }readOnlyInput />
        <Button onClick = {handleApply}>Apply</Button>
        </div>
    )
}
        