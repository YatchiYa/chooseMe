
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
//import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button as Button1, Grid, Avatar } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
//import {DeleteFileFromStorage, downloadFilesFromStorage, listFilesFromStrorage} from "../services";
//import FileDownload from 'js-file-download';

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { deepPurple } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DataGrid, { Column, ColumnChooser, SearchPanel, Pager, Paging } from 'devextreme-react/data-grid';
import { res } from '../Project/results';
import 'assets/scss/SimulationStyle.scss'
import { useSnackbar } from 'notistack';

import list_projects from "Services/Project"

const useStyles = makeStyles((theme) => ({
    ...styles,
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
        padding: "0 65px"
    },
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

    },
    ProjectName:{
        fontSize:"14px",    
        color: "#676363"
    },
    buttonSubmit:{  
        fontSize: "14px",
        padding: "7px 0px"
    },
    labelPosition: {
        position: "relative",
        top: "10px"
    },
    iconRedirect : {
        position: "relative",
        fontSize: "14px",
        top: "3px",
    },
    title : {
        textAlign:"center"
    },
    bgTitle : {
        color: "#fcfcfc",
        background: "#46467d",
        padding: "12px 100px"
    },
    title2 : {
        textAlign : "right"
    },
    title3 : {
        textAlign : "left"
    },
    miniTitle:{
        marginRight: "30px"
    }
}));




function SimulDetails(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { projectId } = useParams();
    const [project, setProjects] = React.useState({});
    const [country, setCountry] = React.useState("")
    const [simulations, setSimulation] = React.useState([])
    const [simulChoice, setChoice] = React.useState("")
    
    const op_types = [
        "Simu 1-Optim Marge-Sem 1-4",
        "Simu 2-Optim Stocks-Sem 1-4",
    ]
    useEffect(() => {
        listProjects()
    }, []);
    
    
    const listProjects = () => {
        list_projects({   user_id : "1" }).then((res) => {

            var ref = projectId
            for (var elem in res.data){
                if (ref === res.data[elem].name){
                    setProjects(res.data[elem]);
                    // set the country and simulation data, because the template can't accept an initial undefined variable
                    setCountry(res.data[elem].country.label)
                    setSimulation(res.data[elem].simulation)
                    setChoice(res.data[elem].simulation[0].simulation.name)
                }
            }
            
        }).catch((err) => {
            console.error(err)
        })

    }

    return (
        <GridContainer container justify="center" spacing={5}>

            <GridItem xs={12}>
                <h4 className={classes.cardIconTitle}>Edit : TdB Financier - Simulation </h4>
            </GridItem>


            <GridItem xs={12}>
                <Card>
                    <CardBody>
                        <GridContainer container>
                            <GridItem md="1">
                                <label className={classes.ProjectName}><strong>Project  </strong>   </label> 
                    
                            </GridItem>
                            <GridItem md="2">
                                <label className={classes.ProjectName}> {project.name} </label> 
                                
                            </GridItem>
                            <GridItem md="2">
                                <label className={classes.ProjectName}> {project.op_type} </label> 
                                
                            </GridItem>
                            <GridItem md="3">
                                <label className={classes.ProjectName}><strong> Période du : </strong> {project.start_date} <strong> <ArrowForwardIcon className={classes.iconRedirect} />  </strong>   {project.end_date}   </label> 
                                
                            </GridItem>
                            
                            <GridItem md="2">
                                <label className={classes.ProjectName}><strong> Contraintes projet : </strong> </label> 
                                
                            </GridItem>
                            <GridItem md="2">
                                <label className={classes.ProjectName}>Tous produits / Produits décotés seulement
                                    <br />Décote Max : 14%
                                    <br />Sales Data date : 22/06/2021
                                    <br /> Sales with lost
                                    </label> 
                                
                            </GridItem>
                        </GridContainer>

                        
                        <GridContainer container>
                            <GridItem md="1">
                                <label className={classes.ProjectName}><strong className={classes.labelPosition}>Edit  </strong>   </label> 
                    
                            </GridItem>
                            <GridItem md="3" className="simulChoice">
                                    
                                    <ValidatorForm
                                    >
                                        <TextValidator
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label="Simulation type"
                                            value={simulChoice}
                                            onChange={(event, value) => {
                                                setChoice(event.target.value)
                                            }}
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        >
                                            {simulations.map(item => <MenuItem key={item.simulation.name} value={item.simulation.name}>{item.simulation.name}</MenuItem>)
                                            }


                                        </TextValidator>
                                    </ValidatorForm>
                    
                            </GridItem>
                            <GridItem md="1">
                                
                                <Button className={classes.buttonSubmit} type="submit" variant="outlined" color="primary">Go</Button>
                            </GridItem>

                        </GridContainer>
                    
                        <GridContainer container>
                            <GridItem md="1">
                                <label className={classes.ProjectName}><strong className={classes.labelPosition} >Compare  </strong>   </label> 
                    
                            </GridItem>
                            <GridItem md="3" className="simulChoice">
                                
                                    <ValidatorForm
                                    >
                                        <TextValidator
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label="Simulation type"
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        >
                                        {simulations.map(item => <MenuItem key={item.simulation.name} value={item.simulation.name}>{item.simulation.name}</MenuItem>)
                                        }


                                        </TextValidator>
                                    </ValidatorForm>
                    
                            </GridItem>
                            
                            <GridItem md="3" className="simulChoice">
                                
                                    <ValidatorForm
                                    >
                                        <TextValidator
                                            select
                                            fullWidth
                                            variant="outlined"
                                            label="Simulation type"
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        >
                                        {simulations.map(item => <MenuItem key={item.simulation.name} value={item.simulation.name}>{item.simulation.name}</MenuItem>)
                                        }


                                        </TextValidator>
                                    </ValidatorForm>
                    
                            </GridItem>
                            <GridItem md="1">
                                
                                <Button className={classes.buttonSubmit} type="submit" variant="outlined" color="primary">Go</Button>
                            </GridItem>

                        </GridContainer>

                        
                        <GridContainer container>
                            <GridItem md="3">
                                <label className={classes.ProjectName}> Ci-dessous choix Edition d'1 simulation  </label> 
                    
                                
                          </GridItem>

                        </GridContainer>

                        <GridContainer container>
                            
                            <GridItem md="2"></GridItem>
                            <GridItem md="2">
                                <label className={classes.ProjectName}> <strong>Simul :  </strong> {simulChoice}  </label> 
                          </GridItem>
                            <GridItem md="2">
                                <label className={classes.ProjectName}> <strong>Scénario :  </strong> Optimisation Marge  </label> 
                          </GridItem>
                        </GridContainer>
                   
                    </CardBody>
                </Card>
            </GridItem>

            


            <GridItem md="12">
                <h5 className={classes.title}>
                    <span className={classes.bgTitle}>
                        Simu 1-Optim Marge-Sem 1-4
                    </span>
                </h5>
            </GridItem>
            
            <GridItem className={classes.title} md="12" >
                <label className={classes.miniTitle}><strong >Scénario  </strong>  Optimisation MARGE </label> 
                <label className={classes.miniTitle}><strong >Région  </strong>  {country} </label> 
                <label><strong >Status  </strong>  CREE </label>
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
                                caption="TOUS RC DECOTES"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="prdt">
                            <Column
                                dataField="stockTotal"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Revenu">
                            <Column
                                dataField="coverageTotal"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Marge brut">
                            <Column
                                dataField="salesCumulatedHistory"
                                caption="XXX €"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Ecoulement stocks">
                            <Column
                                dataField="landingSalesQty"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Stocks restants">
                            <Column
                                dataField="forecastAllSales"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Marge Nette">
                            <Column
                                dataField="forecastSales"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Tx Marge Nette">
                            <Column
                                dataField="performanceAllSalesQty"
                                caption="XXX €"
                                format="fixedPoint"
                            />

                        </Column>
                        <Column caption="Coût décote">
                            <Column
                                dataField="performanceSalesQty"
                                caption="XXX €"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Scénario démarque">
                            <Column
                                dataField="markdownBackstage"
                                caption="x %"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="markdownTotalPercent"
                                caption="x %"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="markdownMagPercent"
                                caption="x %"
                                format="fixedPoint"
                            />
                            <Column
                                dataField="markdownMagPercent"
                                caption="x %"
                                format="fixedPoint"
                            />
                        </Column>
                        <Column caption="Moy Demarq">
                            <Column
                                dataField="performanceAllSalesQty"
                                caption="x %"
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

export default connect(mapStateToProps)(SimulDetails);

