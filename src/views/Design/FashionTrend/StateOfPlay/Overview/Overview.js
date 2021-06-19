import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";
import VariablePie from "highcharts/modules/variable-pie";
import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

VariablePie(Highcharts);
export default function Overview(props) {
    const options = {
        chart: {
            type: "variablepie",
        },
        title: {
            text: "Countries compared by population density and total area.",
        },
        tooltip: {
            headerFormat: "",
            pointFormat:
                '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                "Area (square km): <b>{point.y}</b><br/>" +
                "Population density (people per square km): <b>{point.z}</b><br/>",
        },
        series: [
            {
                minPointSize: 10,
                innerSize: "20%",
                zMin: 0,
                name: "countries",
                data: [
                    {
                        name: "Spain",
                        y: 505370,
                        z: 92.9,
                    },
                    {
                        name: "France",
                        y: 551500,
                        z: 118.7,
                    },
                    {
                        name: "Poland",
                        y: 312685,
                        z: 124.6,
                    },
                    {
                        name: "Czech Republic",
                        y: 78867,
                        z: 137.5,
                    },
                    {
                        name: "Italy",
                        y: 301340,
                        z: 201.8,
                    },
                    {
                        name: "Switzerland",
                        y: 41277,
                        z: 214.5,
                    },
                    {
                        name: "Germany",
                        y: 357022,
                        z: 235.6,
                    },
                ],
            },
        ],
    };
    const option2 = {
        chart: {
            type: "column",
        },
        title: {
            text: "Column chart with negative values",
        },
        xAxis: {
            categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: "John",
                data: [5, 3, 4, 7, 2],
            },
            {
                name: "Jane",
                data: [2, -2, -3, 2, 1],
            },
            {
                name: "Joe",
                data: [3, 4, 4, -2, 5],
            },
        ],
    };
    return (
        <GridContainer>
            <GridItem xs={12} sm={6}>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <HighchartsReact highcharts={Highcharts} options={option2}/>
            </GridItem>
        </GridContainer>
    );
}
