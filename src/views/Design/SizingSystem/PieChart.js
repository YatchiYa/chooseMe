import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";

import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

export default function PieChart(props) {
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Manhaten Percentage Values',


        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: props.series
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12}>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </GridItem>
        </GridContainer>
    );
}
