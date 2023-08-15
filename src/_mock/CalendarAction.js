import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import CalendarControl from "src/layouts/dashboard/header/CalendarControl";

export default function CalendarAction() {

    return (
        <div className="card flex justify-content-center">
        <CalendarControl/>
        </div>
    )
}
        