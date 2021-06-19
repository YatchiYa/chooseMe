import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
//import Dvr from "@material-ui/icons/Dvr";
//import Favorite from "@material-ui/icons/Favorite";
//import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
//import { dataTable } from "variables/general.js";
//import { DateRangePicker, DateRangeDelimiter, DateRange, DatePicker } from "@material-ui/pickers";
import { DateRangePicker, DatePicker } from "@material-ui/pickers";
import { DropzoneArea } from "material-ui-dropzone";
import moment from "moment";
import { countries } from "../countries"
import { insert_project, upload_univer, get_project, update_project, delete_phase } from "Services/Project"
import { list_simulations } from "Services/Simulation"

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
//import { csvParse } from "d3-dsv";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
};


const useStyles = makeStyles(styles);


//const DATE_FORMAT = "YYYY"

function AddProject(props) {
    const classes = useStyles();
    const history = useHistory();
    const { projectId } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [project, setProject] = useState({
        user_ids: ["1"],
        name: "",
        created: moment().utc(),
        last_updated: moment().utc(),
        start_date: moment(),
        end_date: moment().add(1, 'M'),
        country: { code: "", label: "" },
        op_type: "",
        phases: [
            { name: "Vente privée", rate: 0, start_date: moment(), markdown: 0 }
        ],
    });
    const [value, setValue] = React.useState([moment(), moment().add(1, 'M')]);
    const [file, setFile] = React.useState(null)
    const op_types = [
        "MID SEASON SALE",
        "SOLDE ETE",
        "SOLDE HIVER",
        "OP OFFENSIVE OMNI",
        "OP OFFENSIVE DIGITAL",
        "OP OFFENSIVE MAG",
    ]

    useEffect(() => {
        if (project.country.code && project.op_type) setProject({ ...project, name: [project.country.code, moment().year(), project.op_type].join("-") });
    }, [project.country.code, project.op_type])

    useEffect(() => {
        getProject()
        
    }, [])
    
    const handleChange = (event, name) => {
        setProject({ ...project, [name]: event.target.value });
    };
    const handleRangeDate = (value) => {
        if (value[0] !== null && value[1] !== null)
            setProject({ ...project, start_date: value[0], end_date: value[1] });
    };

    const saveProject = () => {

        const params = {
            ...project,
            start_date: project.start_date.format("YYYY-MM-DD"),
            end_date: project.end_date.format("YYYY-MM-DD"),
            phases: project.phases.map(item => ({ ...item, start_date: item.start_date.format("YYYY-MM-DD") }))
        }

        insert_project(params).then((res) => {

            enqueueSnackbar('project created successfully', {
                variant: "success",
            });
            if (file) {
                uploadUniver(file)
            } else history.push("/admin/markdown")

        }).catch(err => {
            enqueueSnackbar('error when saving project', {
                variant: "error",
            });
            console.error(err)
        })


    }

    const updateProject = () => {

        const params = {
            ...project,
            start_date: project.start_date.format("YYYY-MM-DD"),
            end_date: project.end_date.format("YYYY-MM-DD"),
            phases: project.phases.map(item => ({ ...item, start_date: item.start_date.format("YYYY-MM-DD") }))
        }

        update_project(params).then((res) => {

            enqueueSnackbar('project updated successfully', {
                variant: "success",
            });
            if (file) {
                uploadUniver(file)
            } else history.push("/admin/markdown")

        }).catch(err => {
            enqueueSnackbar('error when updating project', {
                variant: "error",
            });
            console.error(err)
        })


    }
    
    const getProject = () => {
        get_project({ project_id: projectId }).then((res) => {
            const { data } = res
            setProject({
                ...data,
                start_date: moment(data.start_date),
                end_date: moment(data.end_date),
                phases: data.phases.map(item => ({ ...item, start_date: moment(item.start_date) }))
            })
            setValue([data.start_date, data.end_date])

        }).catch((err) => {

        })
    }
    //console.log(project)
    
    
    
    const addParamToList = () => {
        const newTab = project.phases;
        var nb_phases = project.phases.length

        if (nb_phases > 10 ){
            enqueueSnackbar('Nombre de phases maximum atteint', {
                variant: "error",
            });
        }
        else{
            var next_start_date = project.phases[nb_phases-1].start_date
            var _date = next_start_date.add(7,"d")

            newTab.push({ name: "Démarque " + (project.phases.length), rate: 0, start_date: _date });
            setProject({ ...project, phases: newTab });   
        }
    };

    
    const deletePhase = (index) => {
        delete_phase({ phase_id: project.phases[index].id }).then(res => {

            enqueueSnackbar('Phase supprimée', {
                variant: "success",
            });
            const newTab = project.phases;
            newTab.splice(index, 1);
            setProject({ ...project, phases: newTab });

        }).catch(err => {
            console.error(err)


        })
    }



    const removeParamFromList = async (index) => {
        await deletePhase(index)
        //const newTab = project.phases;
        //newTab.splice(index, 1);
        //setProject({ ...project, phases: newTab });

    };
    
    const handleChangeKeyOrValue = (event, index, key) => {
        const newTab = project.phases;
        newTab[index][key] = event.target.value;
        setProject({ ...project, phases: newTab });
    };
    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }
    const uploadUniver = async (file) => {
        const formData = new FormData();
        formData.append('univers_file', file)
        await upload_univer(formData).then((res) => {
            enqueueSnackbar('file uploaded successfully', {
                variant: "success",
            });
            history.push("/admin/markdown")


        }).catch((err) => {
            console.error(err)
            enqueueSnackbar('error when uploading file ', {
                variant: "error",
            });


        })

    }

    return (
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Assignment />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{projectId ? "Update Project" : "Add Project"}</h4>
                    </CardHeader>
                    <CardBody>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <ValidatorForm
                                    onSubmit={projectId ? updateProject : saveProject}
                                    onError={() => { }}
                                >
                                    <Grid spacing={3} container justify="center" alignItems="center">
                                        <Grid item md={10} sm={12}>
                                            {/* {loading ? <LinearProgress /> : <span />} */}
                                        </Grid>
                                        <Grid item md={5} sm={6}>
                                            <Autocomplete
                                                id="pays"
                                                options={countries}
                                                classes={{
                                                    option: classes.option,
                                                }}
                                                autoHighlight
                                                getOptionLabel={(option) => option.label}
                                                renderOption={(option) => (
                                                    <React.Fragment>
                                                        <span>{countryToFlag(option.code)}</span>
                                                        {option.label} ({option.code}) +{option.phone}
                                                    </React.Fragment>
                                                )}
                                                value={project.country}
                                                onChange={(event, value) => {
                                                    if (value) setProject({ ...project, country: { code: value.code, label: value.label } })
                                                }}


                                                renderInput={(params) => <TextValidator
                                                    {...params}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    id="country"
                                                    label="Country"
                                                    fullWidth
                                                    margin="normal"
                                                    variant="outlined"
                                                    value={project.country.code}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />}
                                            />
                                        </Grid>
                                        <Grid item md={5} sm={6}>
                                            <TextValidator
                                                select
                                                fullWidth
                                                variant="outlined"
                                                label="operation type"
                                                value={project.op_type}
                                                onChange={(event, value) => { setProject({ ...project, op_type: event.target.value }) }

                                                }

                                                validators={["required"]}
                                                errorMessages={["this field is required"]}
                                            >
                                                {op_types.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                                }


                                            </TextValidator>
                                        </Grid>

                                        <Grid item md={10} sm={12}>
                                            <TextValidator
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                id="name"
                                                label="Name"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                value={project.name}
                                                onChange={(event, value) => { handleChange(event, 'name'); }}
                                                
                                            />
                                        </Grid>
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
                                                dropzoneText="Drag and drop a Univer File here or click"
                                                acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                                            />
                                        </GridItem>

                                        <Grid item md={10} sm={12}>
                                            <DateRangePicker
                                                disableFuture={false}
                                                calendars={2}
                                                value={value}
                                                inputFormat="DD/MM/YYYY"
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                    handleRangeDate(newValue);
                                                }}
                                                renderInput={(startProps, endProps) => {
                                                    return <Grid container direction="row" justify="space-between"
                                                        alignItems="center" spacing={1}>
                                                        <Grid item md={6} sm={12}>
                                                            <TextField  {...startProps} label="Start Date" fullWidth />
                                                        </Grid>
                                                        <Grid item md={6} sm={12}>
                                                            <TextField   {...endProps} label="End Date" fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                }}
                                            />
                                        </Grid>


                                        {<Grid item md={10} sm={12}>
                                            {project.phases.map((phase, index) => (
                                                <Grid container spacing={1} key={'tr_' + index}>
                                                    <Grid item md={3} sm={3}>
                                                        <TextValidator
                                                            fullWidth
                                                            validators={['required']}
                                                            errorMessages={['this field is required']}
                                                            id="{index}_name"
                                                            label="phase name"
                                                            value={phase.name}
                                                            onChange={(event) => { handleChangeKeyOrValue(event, index, "name"); }}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={3} sm={3}>
                                                        <DatePicker
                                                            label="Start Date"
                                                            minDate={phase.start_date}
                                                            value={phase.start_date}
                                                            inputFormat="DD/MM/YYYY"
                                                            onChange={(value) => {
                                                                if (value > project.phases[index - 1].start_date){

                                                                    const newTab = project.phases;
                                                                    newTab[index].start_date = value;
                                                                    setProject({ ...project, phases: newTab });
                                                                }
                                                                else{
                                                                    enqueueSnackbar('Selected phase\'s date is earlier than the previous one', {
                                                                        variant: "error",
                                                                    });
                                                                }
                                                            }}

                                                            renderInput={(props) => <TextValidator
                                                                {...props}
                                                                fullWidth
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                                id="{index}_start_date"
                                                                value={phase.start_date}

                                                                variant="outlined"

                                                            />}
                                                        />

                                                    </Grid>
                                                    <Grid item md={3} sm={3}>
                                                        <TextValidator
                                                            fullWidth
                                                            validators={['required']}
                                                            errorMessages={['this field is required']}
                                                            id="{index}_value"
                                                            label="phase rate"
                                                            value={phase.rate}
                                                            onChange={(event) => { handleChangeKeyOrValue(event, index, "rate"); }}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={2} sm={2}>
                                                        <TextValidator
                                                            select
                                                            fullWidth
                                                            variant="outlined"
                                                            label="Markdown"
                                                            value={phase.markdown}
                                                            onChange={(event, value) => { handleChangeKeyOrValue(event, index, "markdown"); }

                                                            }

                                                            validators={["required"]}
                                                            errorMessages={["this field is required"]}
                                                        >
                                                            {[0, 20, 30, 40, 50, 60, 70].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                                            }


                                                        </TextValidator>
                                                    </Grid>
                                                    <Grid item md={1} sm={1}>
                                                        <Tooltip title="Remove Phase">

                                                            <Button justIcon round color="danger" onClick={() => {
                                                                removeParamFromList(index)
                                                            }}>
                                                                <DeleteIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>}
                                        <Grid item md={10} sm={12}>
                                            <Grid container justify="flex-end">
                                                <Button color="info" onClick={() => addParamToList()}>Add Phase</Button>
                                                <Button type="submit" variant="contained" color="primary">
                                                    {projectId ? 'Update' : 'Create'}
                                                </Button>

                                            </Grid>
                                        </Grid>

                                        {/* <Grid item md={10} sm={12}>
                                            <Grid container justify="flex-end">
                                                <Button type="submit" variant="contained" color="primary">
                                                    {'Create'}
                                                </Button>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                </ValidatorForm>


                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
const mapStateToProps = (state, props) => ({ ...state, ...props });

export default connect(mapStateToProps)(AddProject);
