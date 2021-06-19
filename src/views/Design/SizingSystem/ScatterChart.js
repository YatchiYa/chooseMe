import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";

import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

export default function ScatterChart(props) {
    const options = {
        chart: {
            type: "scatter",
            zoomType: "xy",
        },
        title: {
            text: "affectation chart for each element",
        },
        xAxis: {
            title: {
                enabled: true,
                text: "",
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
        },
        yAxis: {
            title: {
                text: "",
            },
        },
        legend: {
            layout: "vertical",
            align: "left",
            verticalAlign: "top",
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
            borderWidth: 1,
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: "rgb(100,100,100)",
                        },
                    },
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false,
                        },
                    },
                },
                tooltip: {
                    headerFormat: "<b>{series.name}</b><br>",
                    pointFormat: "{series.col1} {point.x} , {point.y} ",
                },

            },
            series:{
                turboThreshold:0
            }
        },
        series: props.series,
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12}>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </GridItem>
        </GridContainer>
    );
}
