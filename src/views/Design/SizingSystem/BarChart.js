import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";

import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

export default function BarChart(props) {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'number of elements per class'
        },

        xAxis: {

            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'elements number per class'
            }
        },
        legend:{
            enabled:false
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: props.series
    };

    return (
        <GridContainer>
            <GridItem xs={12} sm={12}>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </GridItem>
        </GridContainer>
    );
}
