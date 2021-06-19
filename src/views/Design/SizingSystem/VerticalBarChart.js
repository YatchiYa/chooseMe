import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";

import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

export default function VerticalBarChart(props) {
    const options =  {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Manhaten Mean Values'
        },

        xAxis: {

        },
        yAxis: {
            min: 0,
            title: {
                text: 'values',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
},
    credits: {
        enabled: false
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
