import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import CalendarControl from "src/layouts/dashboard/header/CalendarControl";

export default function CalendarAction(props) {
    const [dates, setDates] = useState(null);
    let minDate = ''
    minDate = new Date('2015/01/01');
    let maxDate = ''
    maxDate = new Date();
    const callBack= (childData)=>{
        setChildData(childData)
      }
    console.log(minDate,maxDate)
    console.log(childData)
    return (
        <div className="card flex justify-content-center">
        <CalendarControl minDate={minDate} maxDate={maxDate} handleCallBack={callBack}/>
        </div>
    )
}
        