import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
//import Dvr from "@material-ui/icons/Dvr";
//import Favorite from "@material-ui/icons/Favorite";
//import Close from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
//import TextField from "@material-ui/core/TextField";
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
import { useSnackbar } from 'notistack';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import { ValidatorForm, TextValidator, ValidatorComponent } from 'react-material-ui-form-validator';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
//import { actions } from "Store"
//import { dataTable } from "variables/general.js";
//import { DateRangePicker, DateRangeDelimiter, DateRange, DatePicker } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
//import { DropzoneArea } from "material-ui-dropzone";
import moment from "moment";
import { countries } from "../countries"

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { insert_simulation } from "Services/Simulation"

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




function AddSimulation(props) {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { projectId } = useParams();
    //const [project, setProject] = useState({})
    const [project] = useState({})


    const [state, setState] = useState({
        name: "",
        sales_markdown_date: moment(),
        sales_data_date: moment(),
        phase_number: "",
        scenario: "",
        stock_warehouse: false,
        rounded_price: true,
        booster: true,
        sales_with_lost: false,
        show_case: true,
        show_case_percent: 0,
        mandatory_increasing_markdown: false,
        rounded_prices: [{ price: 10, percentage: 10 }],
        markdown_category: [{ category: "", percentage: 0 }],
        authorized_markdown: { 10: false, 20: false, 30: false, 40: false, 50: false, 60: false, 70: false },
        created: moment().utc(),
        last_updated: moment().utc(),
        geo_zone: { code: "", label: "", phone: "" },

    });
    const [value, setValue] = React.useState(0);
    const scenarios = [
        { id: 1, label: "Marge Maximisation" },
        { id: 2, label: "Storage Maximisation" },
        { id: 3, label: "Revenue Maximisation" },
        { id: 4, label: "Balanced Marge/Inventory" },

    ]
    /*const opTypes = [
        "MID SEASON SALE",
        "SOLDE ETE",
        "SOLDE HIVER",
        "OP OFFENSIVE OMNI",
        "OP OFFENSIVE DIGITAL",
        "OP OFFENSIVE MAG",
    ]
    */
    useEffect(() => {


    }, [])
    const handleChange = (event, name) => {
        setState({ ...state, [name]: event.target.value });
    };


    const saveSimulation = () => {
        // props.dispatch(actions.states.create.push(state));

        const params = {
            ...state,
            project_id: projectId,
            sales_data_date: state.sales_data_date.format("YYYY-MM-DD"),
            sales_markdown_date: state.sales_markdown_date.format("YYYY-MM-DD"),
            authorized_markdown: JSON.stringify(state.authorized_markdown)
        }
        insert_simulation(params).then((res) => {
            enqueueSnackbar('simulation added successfully', {
                variant: "success",
            });
            history.push("/admin/markdown")
        }).catch((err) => {
            console.error(err)
            enqueueSnackbar('error when adding simulation', {
                variant: "error",
            });

        })

    }
    /*const addParamToList = () => {
        const newTab = state.phases;
        newTab.push({ name: "Phase " + (state.phases.length + 1), rate: 0, startDate: null });
        setState({ ...state, phases: newTab });
    };
    const removeParamFromList = (index) => {
        const newTab = state.phases;
        newTab.splice(index, 1);
        setState({ ...state, phases: newTab });

    };
    const handleChangeKeyOrValue = (event, index, key) => {

        const newTab = state.phases;
        newTab[index][key] = event.target.value;
        setState({ ...state, phases: newTab, startDate: null });

    };
    */
    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }




    return (
        <GridContainer>
            <GridItem xs={12}>
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Assignment />
                        </CardIcon>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <h4 className={classes.cardIconTitle}>{project.name}</h4>
                            <h4 className={classes.cardIconTitle}>Add Simulation</h4>
                        </Breadcrumbs>


                    </CardHeader>
                    <CardBody>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <ValidatorForm
                                    onSubmit={saveSimulation}
                                    onError={() => { }}
                                >
                                    <Grid spacing={3} container justify="center" alignItems="flex-start">
                                        <Grid item md={10} sm={12}>
                                            <TextValidator
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                id="name"
                                                label="Simulation Name"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                value={state.name}
                                                onChange={(event, value) => { handleChange(event, 'name'); }}
                                                
                                            />
                                        </Grid>
                                        <Grid item md={10} sm={12}>
                                            <TextValidator
                                                fullWidth
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                id={"scenario"}
                                                label="Scenario"
                                                value={value}
                                                onChange={(event, value) => {
                                                    setState({ ...state, scenario: scenarios[value.props.value] })
                                                    setValue(value.props.value)

                                                }}
                                                variant="outlined"
                                                select

                                            >
                                                {
                                                    scenarios.map((item, index) => <MenuItem key={item.id} value={index}>{item.label}</MenuItem>)
                                                }


                                            </TextValidator>
                                        </Grid>

                                        <Grid item md={10} sm={12}>
                                            <DatePicker
                                                label="Sales data date"
                                                value={state.sales_data_date}
                                                onChange={(value) => {

                                                    setState({ ...state, sales_data_date: value.format() });
                                                }}

                                                renderInput={(props) => <TextValidator
                                                    {...props}
                                                    fullWidth
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    id="{index}_startDate"
                                                    value={state.sales_data_date}

                                                    variant="outlined"

                                                />}
                                            />
                                        </Grid>


                                        <Grid item md={5} sm={12}>
                                            <TextValidator
                                                select
                                                fullWidth
                                                variant="outlined"
                                                label="Maximum phase's number to simulate "
                                                value={state.phase_number}
                                                onChange={(event, value) => { handleChange(event, 'phase_number'); }}

                                                validators={["required"]}
                                                errorMessages={["this field is required"]}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                                }


                                            </TextValidator>
                                        </Grid>
                                        <Grid item md={5} sm={12}>

                                            <Autocomplete
                                                id="geo_zone"
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
                                                value={project.value}
                                                onChange={(event, value) => { if (value) setState({ ...state, geo_zone: value }) }}


                                                renderInput={(params) => <TextValidator
                                                    {...params}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    id="geo_zone"
                                                    label="Geographic Zone"
                                                    fullWidth

                                                    variant="outlined"
                                                    value={state.geo_zone.code}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                />}
                                            />

                                        </Grid>
                                        <Grid item md={5} sm={12}>
                                            <Typography className={classes.heading}>Business Constraints</Typography>
                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                control={<Checkbox
                                                    checked={state.stock_warehouse}
                                                    onChange={(event, value) => { setState({ ...state, stock_warehouse: value }) }}

                                                    name="stock_warehouse" />}
                                                label="Stock warehouse"
                                            />


                                            <Accordion expanded={state.rounded_price} onChange={(event, value) => { setState({ ...state, rounded_price: value }) }}>

                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <FormControlLabel
                                                        aria-label="Rounded Price"
                                                        control={<Checkbox
                                                            checked={state.rounded_price}
                                                            onChange={(event, value) => { setState({ ...state, rounded_price: value }) }}
                                                            name="rounded_price" />}
                                                        label="Rounded Price"
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={1} justify="center">

                                                        {state.rounded_prices.map((rp, index) => <Grid key={"rounded_prices" + index} item md={12} sm={12} container spacing={1} justify="center" alignItems="center">
                                                            <Grid item md={4} sm={12}>
                                                                <TextValidator
                                                                    fullWidth
                                                                    validators={['required', 'matchRegexp:^[0-9]*$']}
                                                                    errorMessages={['this field is required', 'this must be a number']}
                                                                    id={index + "_price"}
                                                                    label="price(€)"
                                                                    value={rp.price}
                                                                    onChange={(event, value) => {
                                                                        const t = state.rounded_prices;
                                                                        t[index].price = event.target.value;
                                                                        setState({ ...state, rounded_prices: t });

                                                                    }}
                                                                    variant="outlined"
                                                                />

                                                            </Grid>
                                                            <Grid item md={4} sm={12}>
                                                                <TextValidator
                                                                    fullWidth
                                                                    validators={['required', 'matchRegexp:^[0-9]*$']}
                                                                    errorMessages={['this field is required', 'this must be a number']}
                                                                    id={index + "_percentage"}
                                                                    label="percentage(%)"
                                                                    value={rp.percentage}
                                                                    onChange={(event, value) => {
                                                                        const t = state.rounded_prices;
                                                                        t[index].percentage = event.target.value;
                                                                        setState({ ...state, rounded_prices: t });

                                                                    }}

                                                                    variant="outlined"
                                                                />

                                                            </Grid>
                                                            <Grid item md={1} sm={1}>
                                                                <Tooltip title="Remove Phase">

                                                                    <Button justIcon round color="danger" onClick={() => {
                                                                        const t = state.rounded_prices;
                                                                        t.splice(index, 1);
                                                                        setState({ ...state, rounded_prices: t });


                                                                    }}>
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                </Tooltip>
                                                            </Grid>

                                                        </Grid>)}
                                                        <Grid item md={9} sm={12} container justify="center">
                                                            <Button
                                                                style={{ width: "100%" }}
                                                                color="info"
                                                                onClick={() => {
                                                                    setState({ ...state, rounded_prices: [...state.rounded_prices, { price: 1, percentage: 1 }] })
                                                                }}>Add</Button>
                                                        </Grid>

                                                    </Grid>

                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion expanded={state.booster} onChange={(event, value) => { setState({ ...state, booster: value }) }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2a-content"
                                                    id="panel2a-header"
                                                >
                                                    <FormControlLabel
                                                        aria-label="booster"
                                                        control={<Checkbox
                                                            checked={state.booster}
                                                            onChange={(event, value) => { setState({ ...state, booster: value }) }}

                                                            name="booster" />}
                                                        label="Booster"
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid item md={12} sm={12}>
                                                        <TextValidator
                                                            validators={['required']}
                                                            errorMessages={['this field is required']}
                                                            id="boosterPercent"
                                                            label="Booster Percentage"
                                                            fullWidth
                                                            margin="normal"
                                                            variant="outlined"
                                                            value={state.boosterPercent}
                                                            onChange={(event, value) => { handleChange(event, 'boosterPercent'); }}

                                                        />
                                                    </Grid>

                                                </AccordionDetails>
                                            </Accordion>
                                            <Paper style={{ padding: '15px' }}>
                                                <Typography className={classes.heading}>Autorized Markdown</Typography>
                                                <Grid container spacing={1} >
                                                    {[10, 20, 30, 40, 50, 60, 70].map((item, index) => <Grid key={"Autorized_Markdown" + index} item md={3} sm={3}>
                                                        <FormControlLabel
                                                            aria-label={item}
                                                            control={<Checkbox
                                                                checked={state.authorized_markdown[item]}
                                                                onChange={(event, value) => { setState({ ...state, authorized_markdown: { ...state.authorized_markdown, [item]: value } }) }}

                                                                name={item + " %"} />}
                                                            label={item + " %"}
                                                        />
                                                    </Grid>)}
                                                </Grid>
                                            </Paper>
                                            <Paper style={{ padding: '15px', marginTop: '5px' }}>
                                                <Typography className={classes.heading} style={{ marginBottom: '20px' }}>Category Markdown</Typography>

                                                <Grid container spacing={1} justify="center">


                                                    {state.markdown_category.map((mc, index) => <Grid key={"markdown_category" + index} item md={12} sm={12} container spacing={1} justify="center" alignItems="center">
                                                        <Grid item md={4} sm={12}>
                                                            <TextValidator
                                                                fullWidth
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                                id={index + "_category"}
                                                                label="Category"
                                                                value={mc.category}
                                                                onChange={(event, value) => {
                                                                    const t = state.markdown_category;
                                                                    t[index].category = event.target.value;
                                                                    setState({ ...state, markdown_category: t });

                                                                }}
                                                                variant="outlined"
                                                                select

                                                            >
                                                                {
                                                                    ["category one", "category two", "category three", "category four"].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                                                }


                                                            </TextValidator>

                                                        </Grid>
                                                        <Grid item md={4} sm={12}>
                                                            <TextValidator
                                                                fullWidth
                                                                validators={['required', 'matchRegexp:^[0-9]*$']}
                                                                errorMessages={['this field is required', 'this must be a number']}
                                                                id={index + "_percentage"}
                                                                label="percentage(%)"
                                                                value={mc.percentage}
                                                                onChange={(event, value) => {
                                                                    const t = state.markdown_category;
                                                                    t[index].percentage = event.target.value;
                                                                    setState({ ...state, markdown_category: t });

                                                                }}

                                                                variant="outlined"
                                                            />

                                                        </Grid>
                                                        <Grid item md={1} sm={1}>
                                                            <Tooltip title="Remove Phase">

                                                                <Button justIcon round color="danger" onClick={() => {
                                                                    const t = state.markdown_category;
                                                                    t.splice(index, 1);
                                                                    setState({ ...state, markdown_category: t });


                                                                }}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </Tooltip>
                                                        </Grid>

                                                    </Grid>)}
                                                    <Grid item md={9} sm={12} container justify="center">
                                                        <Button
                                                            style={{ width: "100%" }}
                                                            color="info"
                                                            onClick={() => {
                                                                setState({ ...state, markdown_category: [...state.markdown_category, { category: "", percentage: 1 }] })
                                                            }}>Add</Button>
                                                    </Grid>

                                                </Grid>

                                            </Paper>


                                        </Grid>
                                        <Grid item md={5} sm={12} container alignItems="flex-start">
                                            <Grid item md={12}>
                                                <Typography className={classes.heading}>Legal Constraints</Typography>
                                            </Grid>
                                            <Grid item md={12}>
                                                <FormControlLabel
                                                    aria-label="sales_with_lost"
                                                    control={<Checkbox
                                                        checked={state.sales_with_lost}
                                                        onChange={(event, value) => { setState({ ...state, sales_with_lost: value }) }}

                                                        name="sales_with_lost" />}
                                                    label="Sales with lost"
                                                />
                                            </Grid>
                                            <Grid item md={12}>
                                                <FormControlLabel
                                                    aria-label="mandatory_increasing_markdown"
                                                    control={<Checkbox
                                                        checked={state.mandatory_increasing_markdown}
                                                        onChange={(event, value) => { setState({ ...state, mandatory_increasing_markdown: value }) }}

                                                        name="mandatory_increasing_markdown" />}
                                                    label="Mondatory Increasing Markdown"
                                                />
                                            </Grid>
                                            <Grid item md={12}>
                                                <Accordion expanded={state.show_case} onChange={(event, value) => { setState({ ...state, show_case: value }) }}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <FormControlLabel
                                                            aria-label="show_case"
                                                            control={<Checkbox
                                                                checked={state.show_case}
                                                                onChange={(event, value) => { setState({ ...state, show_case: value }) }}

                                                                name="show_case" />}
                                                            label="show_case"
                                                        />
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid item md={12} sm={12}>
                                                            <TextValidator
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                                id="show_case_percent"
                                                                label="show_case Percentage"
                                                                fullWidth
                                                                margin="normal"
                                                                variant="outlined"
                                                                value={state.show_case_percent}
                                                                onChange={(event, value) => { handleChange(event, 'show_case_percent'); }}

                                                            />
                                                        </Grid>

                                                    </AccordionDetails>
                                                </Accordion>

                                            </Grid>
                                        </Grid>



                                        <Grid item md={10} sm={12}>
                                            <Grid container justify="flex-end">
                                                <Button type="submit" variant="contained" color="primary">
                                                    {'Create'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>


                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem >
        </GridContainer >
    );
}
const mapStateToProps = (state, props) => ({ ...state, ...props });

export default connect(mapStateToProps)(AddSimulation);
