
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import { useSnackbar } from 'notistack';

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
//import {DeleteFileFromStorage, downloadFilesFromStorage, listFilesFromStrorage} from "../services";
//import FileDownload from 'js-file-download';

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { deepPurple } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';

import DataGrid, { Column, ColumnChooser, SearchPanel, Pager, Paging } from 'devextreme-react/data-grid';
import { res } from './results';
import ChartistGraph from "react-chartist";
import Button from '@material-ui/core/Button';
import {
    dailySalesChart,
    emailsSubscriptionChart,
    //completedTasksChart,
} from "variables/charts";
//const gdpFormat = {
  //  type: 'percent',
   // precision: 1
//};

const useStyles = makeStyles((theme) => ({
    ...styles,
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    borderCell: {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
    },
    chart: {
        background: "linear-gradient(60deg, #26c6da, #00acc1)",
        boxShadow: "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%)"

    },
    bar: {
        background: "linear-gradient(60deg, #ffa726, #fb8c00)",
        boxShadow: "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(255 152 0 / 40%)"

    }
}));




function ProjectDetails(props) {
    const classes = useStyles();
    const { projectId } = useParams();
    //const { enqueueSnackbar } = useSnackbar();
    //const [alert, setAlert] = React.useState(null);

    useEffect(() => {
        // getResults()
        //console.log(state)
        console.log(projectId)
    }, []);
    //const renderAreaCellHeader = () => {
    //    return <div>Area, km<sup>2</sup></div>;
    //}
    return (
        <GridContainer container justify="center" spacing={5}>

            <GridItem md={10} sm={11}>


                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}

                    renderInput={(params) => <TextField {...params} label="Select Phase" variant="outlined" />}
                />

            </GridItem>

            
            <GridItem md={12} >
            <Button hre  type="submit"  color="default" href={"/admin/markdown/simulation_details/" + projectId}>
                Simulation view
            </Button>
            </GridItem>
            <GridItem md={12} sm={11}>
                <Paper>

                    <DataGrid
                        id="grid"
                        dataSource={res}
                        columnAutoWidth={true}
                        allowColumnReordering={true}

                        showBorders={true}
                        rowAlternationEnabled={true}

                    >
                        <ColumnChooser enabled={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} />
                        <Paging defaultPageSize={5} />
                        <Pager 
                            showPageSizeSelector={true}
                            allowedPageSizes={[5, 10, 20]}
                            showInfo={true} />
                        <Column caption="Product">
                            <Column

                                dataField="productImage"
                                caption="Image"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="productTags"
                                caption="Tags"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="productPrice"
                                caption="Price"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Stock">
                            <Column
                                dataField="stockTotal"
                                caption="Total"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="stockRepartition"
                                caption="Repartition"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="stockValoPAMP"
                                caption="Valo. PAMP"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="stockValoPAMP_StockMag"
                                caption="Valo. PAMP (Stock mag)"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="stockValoPV"
                                caption="Valo. PV"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="stockValoPV_StockMag"
                                caption="Valo. PV (Stock mag)"
                                format="fixedPoint"
                                visible={false}
                            />
                        </Column>
                        <Column caption="Coverage">
                            <Column
                                dataField="coverageTotal"
                                caption="Total"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="coverageStores"
                                caption="Stores"
                                format="percent"
                            />
                        </Column>
                        <Column caption="Sales">
                            <Column
                                dataField="salesHistory"
                                caption="History"

                                width={300}
                                height={800}
                                cellRender={(data) => {
                                    return <div className={classes.chart}><ChartistGraph
                                        className="ct-chart-white-colors"
                                        data={dailySalesChart.data}
                                        type="Line"
                                        options={dailySalesChart.options}
                                        listener={dailySalesChart.animation}
                                    /></div>
                                }}
                            />
                            <Column
                                dataField="salesCumulatedHistory"
                                caption="Cumulated History"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="salesQty7d"
                                caption="Qty 7d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues7d"
                                caption="Revenues 7d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate7d"
                                caption="MarkDown Rate 7d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty14d"
                                caption="Qty 14d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues14d"
                                caption="Revenues 14d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate14d"
                                caption="MarkDown Rate 14d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty30d"
                                caption="Qty 30d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues30d"
                                caption="Revenues 30d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate30d"
                                caption="MarkDown Rate 30d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty90d"
                                caption="Qty 90d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues90d"
                                caption="Revenues 90d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate90d"
                                caption="MarkDown Rate 90d"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty7d"
                                caption="Qty 1w"
                                format="fixedPoint"
                                visible={false}

                            />
                            <Column
                                dataField="salesRevenues7d"
                                caption="Revenues 1w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate7d"
                                caption="MarkDown Rate 1w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty14d"
                                caption="Qty 2w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues14d"
                                caption="Revenues 2w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate14d"
                                caption="MarkDown Rate 2w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty30d"
                                caption="Qty 4w"
                                format="fixedPoint"
                                visible={false}

                            />
                            <Column
                                dataField="salesRevenues14d"
                                caption="Revenues 4w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate14d"
                                caption="MarkDown Rate 4w"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesQty90d"
                                caption="Qty 1 season"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesRevenues90d"
                                caption="Revenues 1 season"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="salesMarkDownRate90d"
                                caption="MarkDown Rate 1 season"
                                format="fixedPoint"
                                visible={false}
                            />



                        </Column>
                        <Column caption="Landing">
                            <Column
                                dataField="landingSalesQty"
                                caption="Sales (Qty)"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="landingFlow"
                                caption="Flow"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="landingSeasonFlow"
                                caption="Season Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="landingStock"
                                caption="Stock"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="landingValoPAMP"
                                caption="Valo. PAMP"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="landingValoPV"
                                caption="Valo. PV"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="landingCoverage"
                                caption="Coverage"
                                format="fixedPoint"
                                visible={false}
                            />
                        </Column>
                        <Column caption="Forecast (all markdowns)">
                            <Column
                                dataField="forecastAllSales"
                                caption="Sales (Qty)"
                                format="fixedPoint"
                                visible={false}
                            />
                            <Column
                                dataField="forcastAllFlow"
                                caption="Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastAllSeasonFlow"
                                caption="Season Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastAllSeasonFlowPercent"
                                caption="% Season Flow"
                                format="fixedPoint"
                            />

                            <Column
                                dataField="forecastAllRemainingStockQty"
                                caption="Remaining Stock (Qty)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastAllRemainingStockPAMP"
                                caption="Remaining Stock (PAMP)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastAllMarge"
                                caption="Marge"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastAllCaHt"
                                caption="CA HT"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastAllMarkdownBudget"
                                caption="MarkDown Budget"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastAllMarkdownRate"
                                caption="Markdown Rate"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Forecast (worked markdowns)">
                            <Column
                                dataField="forecastSales"
                                caption="Sales (Qty)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastFlow"
                                caption="Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastSeasonFlow"
                                caption="Season Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastSeasonFlowPercent"
                                caption="% Season Flow"
                                format="fixedPoint"
                            />

                            <Column
                                dataField="forecastRemainingStockQty"
                                caption="Remaining Stock (Qty)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastRemainingStockPAMP"
                                caption="Remaining Stock (PAMP)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastMarge"
                                caption="Marge"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastCaHt"
                                caption="CA HT"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forecastMarkdownBudget"
                                caption="MarkDown Budget"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastMarkdownRate"
                                caption="Markdown Rate"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Performance (all markdowns)">
                            <Column
                                dataField="performanceAllSalesQty"
                                caption="Sales (Qty)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceAllFlow"
                                caption="Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceAllMarge"
                                caption="Marge"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceAllCaHt"
                                caption="CA HT"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastAllMarkdownRate"
                                caption="Markdown Rate"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Performance (corrent markdowns)">
                            <Column
                                dataField="performanceSalesQty"
                                caption="Sales (Qty)"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceFlow"
                                caption="Flow"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceMarge"
                                caption="Marge"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="performanceCaHt"
                                caption="CA HT"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="forcastMarkdownRate"
                                caption="Markdown Rate"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Markdown">
                            <Column
                                dataField="markdownBackstage"
                                caption="Backstage"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="markdownDistribution"
                                caption="Distribution"
                                format="fixedPoint"
                                minWidth={320}
                                cellRender={(data) => {
                                    return <div className={classes.bar}>
                                        <ChartistGraph
                                            className="ct-chart-white-colors"
                                            data={emailsSubscriptionChart.data}
                                            type="Bar"
                                            options={emailsSubscriptionChart.options}
                                            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                            listener={emailsSubscriptionChart.animation}
                                        />
                                    </div>
                                }}
                            />
                            <Column
                                dataField="markdownTotalPercent"
                                caption="% Total"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="markdownMagPercent"
                                caption="% Mag"
                                format="fixedPoint"
                            />
                        </Column>
                    </DataGrid>
                </Paper>
            </GridItem>
        </GridContainer >

    );
}
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }]
const mapStateToProps = (state, props) => ({ ...state, ...props });

export default connect(mapStateToProps)(ProjectDetails);

