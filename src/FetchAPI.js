import React, { useState, useEffect } from "react";
import Router from "./routes";


function FetchAPI() {
    const [data, setData] = useState([]);
    console.log(data)

    const fetchInfo = async () => {
        await fetch('http://localhost:7099/api/values')
            .then((res) => res.json())
            .then((d) => setData(d))
    }


    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div>
            <Router data = {data}/>
        </div>
    );
}

export default FetchAPI;
