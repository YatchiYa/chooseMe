import React from "react";
import GridContainer from "components/Grid/GridContainer";
import Highcharts from "highcharts/highstock";

import HighchartsReact from "highcharts-react-official";
import GridItem from "components/Grid/GridItem";

export default function BubbelChart(props) {
    const options = {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: 'classes centroids bubbles'
        },

        xAxis: {
            gridLineWidth: 1,
            accessibility: {
                rangeDescription: 'Range: 0 to 100.'
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            accessibility: {
                rangeDescription: 'Range: 0 to 100.'
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
