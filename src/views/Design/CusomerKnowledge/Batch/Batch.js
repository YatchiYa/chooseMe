import React, {useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {withSnackbar} from "notistack";
import {predictionMensurationMorpho} from "../services";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
require('highcharts/highcharts-more')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility.js')(Highcharts)
require('highcharts/modules/accessibility.js')(Highcharts)
require('highcharts/themes/high-contrast-light.js')(Highcharts)

//import Highcharts from "highcharts/highcharts-more";

const useStyles = makeStyles((theme) => ({
    backdrop: {
       height:"100%",
        width:"100%",
        color: '#fff',
    },
}));
Highcharts.seriesType('lowmedhigh', 'boxplot', {
    keys: ['low', 'median', 'high'],
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: ' +
            'Min <b>{point.low}</b> - Mean <b>{point.median}</b> - Max <b>{point.high}</b><br/>'
    }
}, {
    // Change point shape to a line with three crossing lines for low/median/high
    // Stroke width is hardcoded to 1 for simplicity
    drawPoints: function () {
        var series = this;
        Highcharts.each(this.points, function (point) {
            var graphic = point.graphic,
                verb = graphic ? 'animate' : 'attr',
                shapeArgs = point.shapeArgs,
                width = shapeArgs.width,
                left = Math.floor(shapeArgs.x) + 0.5,
                right = left + width,
                crispX = left + Math.round(width / 2) + 0.5,
                highPlot = Math.floor(point.highPlot) + 0.5,
                medianPlot = Math.floor(point.medianPlot) + 0.5,
                lowPlot = Math.floor(point.lowPlot) + 0.5 - (point.low === 0 ? 1 : 0); // Sneakily draw low marker even if 0

            if (point.isNull) {
                return;
            }

            if (!graphic) {
                point.graphic = graphic = series.chart.renderer.path('point').add(series.group);
            }

            graphic.attr({
                stroke: point.color || series.color,
                "stroke-width": 5
            });

            graphic[verb]({
                d: [
                    'M', left, highPlot,
                    'H', right,
                    'M', left, medianPlot,
                    'H', right,
                    'M', left, lowPlot,
                    'H', right,
                    'M', crispX, highPlot,
                    'V', lowPlot
                ]
            });
        });
    }
});
function Batch(props) {
    const classes = useStyles();
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [draw, setDraw] = useState(false)
    const [categories, setCategories] = useState([])
    const [series1, setSeries1] = useState([])
    const [series2, setSeries2] = useState([])


    const option1=()=>({
        chart: {
            type: 'lowmedhigh'
        },

        title: {
            text: 'results stats'
        },

        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    // Use default formatter for null points
                    if (point.isNull) {
                        return false;
                    }

                    return point.category + ', min ' + point.low + ', mean ' +
                        point.median + ', max ' + point.high;
                }
            },

            series: {
                descriptionFormatter: function (series) {
                    return series.name + ', series ' + (series.index + 1) + ' of ' +
                        series.chart.series.length + ' with ' + series.points.length +
                        ' data points.';
                }
            },

            typeDescription: 'Low, median, high. Each data point has a low, median and high value, depicted vertically as small ticks.' // Describe the chart type to screen reader users, since this is not a traditional boxplot chart
        },

        xAxis: [{
            accessibility: {
                description: 'Months of the year'
            },
            categories: categories
        }],

        yAxis: {
            title: {
                text: 'Fruits consumed'
            },
            min: 0
        },



        tooltip: {
            shared: true
        },

        plotOptions: {
            series: {
                stickyTracking: true,
                whiskerWidth: 5
            }
        },

        series: series1
    });
    const option2=()=>( {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Predictions morphotype stats'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}% </b>({point.y})'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: series2
    });
    const formatData = (res)=>{
        const {stats,agg}= res.data

        setCategories(Object.keys(stats))
        setSeries1(['stature','hip','bust','under_bust'].map(v=> ({name:v , data:Object.keys(stats).map(k=>stats[k][v])})))
        setSeries2(
            [{
            name: 'Brands',
            colorByPoint: true,
            data: Object.keys(agg).map(k=>({name:k,y:agg[k]}))
        }])

    }


    const submit = async () => {

        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('session_id', 'trial')
            try {
                setLoading(true)
                setDraw(true)
                const res = await predictionMensurationMorpho(formData)
                props.enqueueSnackbar('simulation launched successfully', {
                    variant: "success",
                });
                formatData(res)
                setLoading(false)
            }
            catch (e) {
                if (e.response) {
                    // Request made and server responded
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                    props.enqueueSnackbar('API error' + e.response.data.exception, {
                        variant: "error",
                    });
                }
                props.enqueueSnackbar('API error' + e.message, {
                    variant: "error",
                });
                setLoading(false)
            }
        } else {
            props.enqueueSnackbar('select file to launch a simulation', {
                variant: "warning",
            });
        }

    }
    return (
        <GridContainer spacing={4} justify="center">
            <GridItem xs={12} sm={10}>
                <DropzoneArea
                    onChange={(files) => {
                        setFile(files[0])
                    }}
                    filesLimit={1}
                    previewGridProps={{
                        container: {
                            justify: "center",
                            spacing: 3,
                        },
                    }}
                    showFileNames

                    acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                />
            </GridItem>

             <GridItem xs={12} sm={10}>
                <GridContainer justify="flex-start"
                               alignItems="center">
                    <GridItem> {!loading ? <Button onClick={submit} color="success" round>
                            Launch Simulation
                        </Button> :
                        <CircularProgress color="secondary"/>}</GridItem>
                    <GridItem>
                        <Button round>Reset</Button>
                    </GridItem>
                </GridContainer>
            </GridItem>

            {draw &&
                <GridItem  xs={12} sm={10}>
                <HighchartsReact highcharts={Highcharts} options={option1()}/>
            </GridItem>}
            {draw &&  <GridItem  xs={12} sm={10}>
                <HighchartsReact highcharts={Highcharts} options={option2()}/>
            </GridItem>}


        </GridContainer>
    );
}

export default connect()(withSnackbar(Batch));