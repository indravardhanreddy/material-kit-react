import React from "react";
import * as d3 from "d3";

export default function LineChart({ props }) {

    if (props === undefined) {
        props = [
            { id: '1', date: "2023-08-01", usersCountByDate: 2 },
            { id: '2', date: "2023-08-02", usersCountByDate: 10 },
            { id: '3', date: "2023-08-03", usersCountByDate: 7 },
            { id: '4', date: "2023-08-04", usersCountByDate: 14 },
            { id: '5', date: "2023-08-05", usersCountByDate: 3 },
            { id: '6', date: "2023-08-06", usersCountByDate: 20 },
            { id: '7', date: "2023-08-07", usersCountByDate: 5 },
            { id: '8', date: "2023-08-08", usersCountByDate: 12 },
            { id: '9', date: "2023-08-09", usersCountByDate: 1 },
            { id: '10', date: "2023-08-10", usersCountByDate: 8 },
            { id: '11', date: "2023-08-11", usersCountByDate: 17 },
        ]

    }
    const chartData = [
        { id: '1', date: "2023-08-01", usersCountByDate: 2 },
        { id: '2', date: "2023-08-02", usersCountByDate: 10 },
        { id: '3', date: "2023-08-03", usersCountByDate: 7 },
        { id: '4', date: "2023-08-04", usersCountByDate: 14 },
        { id: '5', date: "2023-08-05", usersCountByDate: 3 },
        { id: '6', date: "2023-08-06", usersCountByDate: 20 },
        { id: '7', date: "2023-08-07", usersCountByDate: 5 },
        { id: '8', date: "2023-08-08", usersCountByDate: 12 },
        { id: '9', date: "2023-08-09", usersCountByDate: 1 },
        { id: '10', date: "2023-08-10", usersCountByDate: 8 },
        { id: '11', date: "2023-08-11", usersCountByDate: 17 },
    ]

    console.log(props)


    const id = 1;
    const colorClasses = [
        "#5ab7e8",
        "#3265aa",
        "#88ccaf",
        "#767fac",
        "#7bc4ec",
        "#eb6a7d",
        "#f49fbe",
        "#9588b9",
        "#dce8f3",
        "#c9d5e4",
        "#7b9cc2",
        "#d5dfe9",
        "#aec2d8",
        "#f3945a",
        "#61bb95",
        "#696c88",
        "#eb214b",
        "#942772",
        "#7260a2",
        "#fff49e",
        "#a899b8",
        "#f17fa8",
        "#fef4ee",
        "#d7d9ed",
        "#4675aa",
        "#edf7fc",
        "#8e80b5",
        "#72c0eb",
        "#a9528e",
        "#ef4d6f",
        "#81c9aa",
        "#6b91bb",
        "#95335b",
        "#654e67",
        "#f1eff6",
        "#f1e5ea",
        "#f4e9f1",
        "#fde8ed",
        "#eff8f4",
        "#ecf1f6",
        "#a0d6bf",
        "#90accc",
        "#af6684",
        "#d1dcea",
        "#d7eee4",
        "#8b7a8d",
        "#cfc8cf",
        "#f37a93",
        "#fac7d2",
        "#e4c9dc"
    ]


    const d3ref = React.useRef(null);
    React.useEffect(() => {
        function init() {
            const width = 150;
            const height = 30;
            const margin = 10;

            const chartId = 1;
            d3.select(`#chart${chartId}>svg`).remove();
            const xScale = d3
                .scaleTime()
                .domain(d3.extent(props, (d) => new Date(d.date)))
                .range([0, width]);

            const yScale = d3.scaleLinear().range([height, 0]);
            yScale.domain([
                0,
                d3.max(props, (d) => {
                    return d.usersCountByDate;
                }),
            ]);

            const line = d3
                .line()
                .x((d) => xScale(d.x))
                .y((d) => yScale(d.y))
                .curve(d3.curveMonotoneX);

            const dataset = props.map((d) => ({
                x: new Date(d.date),
                y: d.usersCountByDate,
            }));

            const svg = d3
                .select(d3ref.current)
                .append("svg")
                .attr("width", width + margin * 2)
                .attr("height", height + margin * 2)
                .append("g")
                .attr("transform", `translate(${margin}, ${margin})`);

            svg
                .append("path")
                .datum(dataset)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", colorClasses[id])
                .attr("stroke-width", 2)
                .attr("d", line);

            const path = svg.selectAll("dot").data(dataset);

            path.enter()
                .append("circle")
                .attr(
                    "stroke-width",
                    "2px"
                )
                .attr("stroke", "gray")
                .style("fill", "#fff")
                .style("cursor", "pointer")
                .attr(
                    "r", (d, i) => {
                        if (i === (dataset.length - 1)) {
                            return "2";
                        } return "0";
                    })
                .attr("cx", (d) => {
                    return xScale(d.x);
                })
                .attr("cy", (d) => {
                    return yScale(d.y)
                })
                .on("mouseover", showTooltip)
                .on("mouseout", hideTooltip);

            // Tooltip
            const tooltip = d3.select(d3ref.current)
                .append("p")
                .attr("class", "tooltip")
                .style("opacity", 100);

            // Show tooltip
            function showTooltip(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                tooltip.html(`Date: ${convert(d.x)}<br>Earnings: ${d.y}`)
            }

            // Hide tooltip
            function hideTooltip() {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0)
                    .remove();
            }

            function convert(str) {
                const date = new Date(str)
                const mnth = (`0${date.getMonth() + 1}`).slice(-2)
                const day = (`0${date.getDate()}`).slice(-2);
                return [date.getFullYear(), mnth, day].join("-");
            }

        }
        init();
    }, []);
    return <div id={1} ref={d3ref} />;
}
