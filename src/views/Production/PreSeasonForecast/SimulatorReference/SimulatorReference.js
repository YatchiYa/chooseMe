import React, {useEffect, useState} from "react";
// react component plugin for creating a beautiful datetime dropdown picker
// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";
// plugin that creates slider
import Slider from "nouislider";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormLabel from "@material-ui/core/FormLabel";
import Button from "../../../../components/CustomButtons/Button";

import DateInput from "../../../Components/DateInput";

import FormHelperText from "@material-ui/core/FormHelperText";
import moment from "moment";
import getAllFamilies, {
    checkResult,
    download_file,
    getSubFamilies,
    possibleValues,
    predictionOneShot
} from "../services";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {withSnackbar} from "notistack";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "../../../../components/Table/Table";
import CardBody from "../../../../components/Card/CardBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileDownload from "js-file-download";

const useStyles = makeStyles(styles);

function SimulatorReference(props) {
    const initValue = {
        runName: "",
        familyCode: "",
        subFamilyCode: "",
        productTypology: "",
        matterCode: "",
        colorCode: "",
        codeManche: "",
        season: "",
        implantationDate: null,
        codePLM: "",
        referenceCode: "",
        initialPrice: 0,
        purchaseP1: 0,
        purchaseP2: 0,
        purchaseP3: 0,
    };
    const [state, setState] = React.useState(initValue);
    const [error, setError] = React.useState(initValue);
    const [families, setFamilies] = React.useState([]);
    const [subFamilies, setSubFamilies] = React.useState([]);
    const [productTypologies, setProductTypologies] = React.useState([]);
    const [matterCodes, setMatterCodes] = React.useState([]);
    const [colorCodes, setColorCodes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [hiddenManche, setHiddenManche] = React.useState(false);
    const [codeManches, setCodeManches] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [runId, setRunID] = React.useState([]);
    useEffect(() => {
        getAllFamilies().then(res => {
            setFamilies(res.data)
            console.log(res)
        })

    }, []);

    const handleChange = (event, name) => {
        console.log(event.target.value)
        console.log(name)
        console.log(state)
        setState({...state, [name]: event.target.value});
        setError({...error, [name]: "success"});
        if (name === 'familyCode') {
            if (['F02', 'F03', 'F04', 'F12', 'F16', 'F80', ''].indexOf(event.target.value) !== -1) {
                setHiddenManche(true);
                setError({...error, codeManche: "success"})
                setState(state=>({...state, codeManche: ""}))
                setCodeManches([]);
            } else  setHiddenManche(false)
            getSubFamilies({code_famille: event.target.value}).then(res => {
                setSubFamilies(res.data)
                setState((state)=>({...state,subFamilyCode: "",productTypology: "",matterCode: "",codeManche: ""}))

            })

        }
        if (name === 'subFamilyCode') {

            const state_ = {
                code_famille: state.familyCode,
                code_sous_famille: event.target.value,
                code_plm: state.codePLM || 'ND',
                code_reference: state.referenceCode || 'ND',
                code_couleur: state.colorCode || 'ND',
                typologie_produit: state.productTypology || 'ND',
                code_manche: state.codeManche || 'ND',
                code_matiere: state.matterCode || 'ND',
                min_vente: state.implantationDate,
                prix_initial: state.initialPrice,
                p1: "H2",
                p2: "H3",
                p3: "E1",
                achats_p1: state.purchaseP1,
                achats_p2: state.purchaseP2,
                achats_p3: state.purchaseP3
            };


            if (state.season === 'E') {
                state_.p1 = "E2";
                state_.p2 = "E3";
                state_.p3 = "H1";
            }


            possibleValues({
                state: state_
            }).then(res => {

                setProductTypologies(res.data.actions.typologie_produit)
                setMatterCodes(res.data.actions.code_matiere)
                setColorCodes(res.data.actions.code_couleur)
                setCodeManches(res.data.actions.code_manche)



            })
        }
    };

    const validate = (event, name) => {
        if (!state[name]) {
            setError({...error, [name]: "error"});
        } else setError({...error, [name]: "success"});


    };
    const validateAll = () => {

        let isvalide = true
        let updatedError = {}
        for (let key of Object.keys(error)) {
            if (error[key] !== "success") {
                updatedError[key] = "error"
                console.log(key,error)
                isvalide = false
            }

        }

        setError({...error, ...updatedError})
        return isvalide
    }
    const submit = () => {
        if (validateAll()) {
            let model = {
                params: {
                    run_name: state.runName,
                    mode_rc: true,
                },
                samples: [
                    {
                        achats_p1: parseInt(state.purchaseP1),
                        achats_p2: parseInt(state.purchaseP2),
                        achats_p3: parseInt(state.purchaseP3),
                        code_couleur: state.colorCode,
                        code_famille: state.familyCode,
                        code_manche: state.codeManche || "ND",
                        code_matiere: state.matterCode,
                        code_plm: state.codePLM,
                        code_sous_famille: state.subFamilyCode,
                        p1: 'H2',
                        p2: 'H3',
                        p3: 'E1',
                        prix_initial: parseInt(state.initialPrice),
                        code_reference: state.referenceCode,
                        typologie_produit: state.productTypology,
                        min_vente: state.implantationDate.format('YYYY-MM-DD')
                    }
                ]
            };

            if (state.season === 'E') {
                model.samples[0].p1 = "E2";
                model.samples[0].p2 = "E3";
                model.samples[0].p3 = "H1";
            }

            model.samples[0].achats_p1 = Number(model.samples[0].achats_p1) ? model.samples[0].achats_p1 : 0;
            model.samples[0].achats_p2 = Number(model.samples[0].achats_p2) ? model.samples[0].achats_p2 : 0;
            model.samples[0].achats_p3 = Number(model.samples[0].achats_p3) ? model.samples[0].achats_p3 : 0;
            setLoading(true)
            predictionOneShot(model).then(res=>{
                console.log(res)
                props.enqueueSnackbar('job submeted successfully ', {
                    variant: "success",
                });
                props.enqueueSnackbar('wait a moment to get the results', {
                    variant: "info",
                });
                setRunID(res.data.run_id)
                getResults(res.data.run_id)

            }).catch(err=>{
                console.log(err)
                setLoading(false)
                props.enqueueSnackbar('error when submeting job', {
                    variant: "error",
                });
            })


        } else  props.enqueueSnackbar('invalide form', {
            variant: "warning",
        });
    };
    const sleep = m => new Promise(r => setTimeout(r, m))
    const getResults = async (run_id,retry=10) =>{
        let goON=true
        let res={}
        let i=1
        setLoading(true)
        while (goON) {
            try {
                res = await checkResult({run_id})
                goON=!res.data.success
                await sleep(5000)
            } catch (err) {
                props.enqueueSnackbar('error when fetching results', {
                    variant: "error",
                });
                goON=false
                setLoading(false)
            }

            if(i>=retry){
                goON=false;
                props.enqueueSnackbar('fetching results takes a long time', {
                    variant: "warning",
                });
            }
            i++;
        }
        if (res.data?.success) parseResults(res.data)
        setLoading(false)
    }
    const parseResults = (res) =>{
        setResults(res.RC.map(rc=>[
            [rc?.p1, rc?.achats_p1, rc?.pred_p1, rc?.pred_buff_p1, rc?.rsd_p1, rc?.rsd_buff_p1],
            [rc?.p2, rc?.achats_p2, rc?.pred_p2, rc?.pred_buff_p2, rc?.rsd_p2, rc?.rsd_buff_p2],
            [rc?.p3, rc?.achats_p3, rc?.pred_p3, rc?.pred_buff_p3, rc?.rsd_p3, rc?.rsd_buff_p3],
            ["TOTAL", rc?.achats, rc?.ventes_predites, rc?.ventes_predites_buff, rc?.rsd, rc?.rsd_buff]
        ]).reduce((x,y)=>x.concat(y)))
    }
    const download = () => {
        download_file({run_id:runId,one_shot:true}).then(res=>{
            console.log(res)
            FileDownload(res.data, runId+".json")
        }).catch(err=>{
            console.log(err)
        })
    }
    const classes = useStyles();
    return (
        <GridContainer spacing={4} justify="center">
            <GridItem xs={12} sm={10} md={10}>
                <CustomInput
                    success={error.runName === "success"}
                    error={error.runName === "error"}
                    labelText="Run Name"
                    id="runname"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    value={state.runName}
                    helperText={error.runName === "error" && "field required"}
                    inputProps={{
                        onChange: (event) => {
                            handleChange(event, "runName");
                        },
                        onBlur: (event) => validate(event, "runName"),

                        required: true,
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
                <legend>Product Attribute</legend>
                <GridContainer spacing={4}>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={error.familyCode === "error"}
                            required
                        >
                            <InputLabel
                                htmlFor="family-code"
                                classes={{root: classes.selectLabel}}
                            >
                                Family Code
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={state.familyCode}
                                onChange={(event) => handleChange(event, "familyCode")}
                                onClose={(event) => {
                                    validate(event, "familyCode");
                                }}
                                inputProps={{
                                    name: "familyCode",
                                    id: "family-code",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose Family Code
                                </MenuItem>
                                {families.map(family => <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    key={family.code_famille}
                                    value={family.code_famille}
                                >
                                    {family.lib_famille}({family.code_famille})
                                </MenuItem>)}

                            </Select>
                            {error.familyCode === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={2}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={error.subFamilyCode === "error"}
                            required
                        >
                            <InputLabel
                                htmlFor="sub-family-code"
                                className={classes.selectLabel}
                            >
                                Sub Family Code
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={state.subFamilyCode}
                                onChange={(event) => handleChange(event, "subFamilyCode")}
                                onClose={(event) => {
                                    validate(event, "subFamilyCode");
                                }}
                                inputProps={{
                                    name: "subFamilyCode",
                                    id: "sub-family-code",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose Sub Family Code
                                </MenuItem>
                                {subFamilies.map(sf => <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    key={sf.code_sous_famille}
                                    value={sf.code_sous_famille}
                                >
                                    {sf.lib_sous_famille} ({sf.code_sous_famille})
                                </MenuItem>)}
                            </Select>
                            {error.subFamilyCode === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={error.productTypology === "error"}
                            required
                        >
                            <InputLabel
                                htmlFor="product-typology"
                                className={classes.selectLabel}
                            >
                                Product Typology
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={state.productTypology}
                                onChange={(event) => handleChange(event, "productTypology")}
                                onClose={(event) => {
                                    validate(event, "productTypology");
                                }}
                                inputProps={{
                                    name: "productTypology",
                                    id: "product-typology",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose Product Typology
                                </MenuItem>
                                {productTypologies.map(item => <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value={item.typologie_produit}
                                    key={item.typologie_produit}
                                >
                                    {item.lib}
                                </MenuItem>)}

                            </Select>
                            {error.productTypology === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={2}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={error.matterCode === "error"}
                            required
                        >
                            <InputLabel htmlFor="matter-code" className={classes.selectLabel}>
                                Matter Code
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={state.matterCode}
                                onChange={(event) => handleChange(event, "matterCode")}
                                onClose={(event) => {
                                    validate(event, "matterCode");
                                }}
                                inputProps={{
                                    name: "matterCode",
                                    id: "matter-code",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose Matter Code
                                </MenuItem>
                                {matterCodes.map(item => <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value={item.code_matiere}
                                    key={item.code_matiere}
                                >
                                    {item.lib} ({item.code_matiere})
                                </MenuItem>)}

                            </Select>
                            {error.matterCode === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                    { !hiddenManche && <GridItem xs={12} sm={6} md={3} lg={2}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={error.codeManche === "error"}
                            required
                        >
                            <InputLabel htmlFor="manche-code" className={classes.selectLabel}>
                                Handle Code
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={state.codeManche}
                                onChange={(event) => handleChange(event, "codeManche")}
                                onClose={(event) => {
                                    validate(event, "codeManche");
                                }}
                                inputProps={{
                                    name: "codeManche",
                                    id: "manche-code",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose Handle Code
                                </MenuItem>
                                {codeManches.map(item => <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected,
                                    }}
                                    value={item.code_manche}
                                    key={item.code_manche}
                                >
                                    {item.lib} ({item.code_manche})
                                </MenuItem>)}

                            </Select>
                            {error.codeManche === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>}
                    <GridItem xs={12} sm={12}>
                        <Autocomplete

                            id="matterCode"
                            options={colorCodes}
                            getOptionLabel={(option) => option.lib}
                            value={state.code_couleur}
                            renderInput={(params) => (
                                <TextField {...params} label="Color Code" margin="normal"
                                           helperText={error.colorCode === "error" && "required"}
                                           error={error.colorCode === "error"}

                                />
                            )}
                            onChange={(event, value) => {
                                if (value) {
                                    setState({...state, colorCode: value.code_couleur});
                                    setError({...error, colorCode: "success"});
                                } else {
                                    setError({...error, colorCode: "error"});
                                }


                            }}
                            onClose={(event) => {


                            }}
                        />

                    </GridItem>
                </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
                <legend>Product Information</legend>
                <GridContainer spacing={4}>
                    <GridItem xs={12} sm={12}>
                        <FormControl error={error.season === "error"} component="fieldset">
                            <FormLabel component="legend">Season:</FormLabel>
                            <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                            >
                                <FormControlLabel
                                    value="H"
                                    control={<Radio color="primary"/>}
                                    label="Winter"
                                    onChange={(event) => handleChange(event, "season")}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="E"
                                    control={<Radio color="primary"/>}
                                    onChange={(event) => handleChange(event, "season")}
                                    label="Summer"
                                />
                            </RadioGroup>
                            {error.season === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Implantation Date"
                                format="DD/MM/yyyy"
                                value={state.implantationDate}
                                onChange={(date) => {
                                    setState({...state, implantationDate: date})
                                }}
                                onBlur={(event) => validate(event, "implantationDate")}
                                error={error.codePLM === "error"}
                                helperText={error.implantationDate === "error" && "required"}

                                autoOk
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <CustomInput
                            error={error.codePLM === "error"}
                            success={error.codePLM === "success"}
                            labelText="PLM Code"
                            id="PLMCode"
                            helperText={error.codePLM === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.codePLM}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "codePLM");
                                },
                                onBlur: (event) => validate(event, "codePLM"),
                                required: true,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <CustomInput
                            error={error.referenceCode === "error"}
                            success={error.referenceCode === "success"}
                            labelText="Reference Code"
                            id="referencecode"
                            helperText={error.referenceCode === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.referenceCode}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "referenceCode");
                                },
                                onBlur: (event) => validate(event, "referenceCode"),
                                required: true,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3} lg={3}>
                        <CustomInput
                            error={error.initialPrice === "error"}
                            success={error.initialPrice === "success"}
                            labelText="Initial Price"
                            id="initialprice"
                            helperText={error.initialPrice === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.initialPrice}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "initialPrice");
                                },
                                onBlur: (event) => validate(event, "initialPrice"),
                                required: true,
                                type: "number",
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
                <legend>CGA Forecast</legend>
                <GridContainer spacing={4}>
                    <GridItem xs={12} sm={6} md={4} lg={4}>
                        <CustomInput
                            error={error.purchaseP1 === "error"}
                            success={error.purchaseP1 === "success"}
                            labelText="Purchase P1"
                            id="initialprice"
                            helperText={error.purchaseP1 === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.purchaseP1}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "purchaseP1");
                                },
                                onBlur: (event) => validate(event, "purchaseP1"),
                                required: true,
                                type: "number",
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4} lg={4}>
                        <CustomInput
                            error={error.purchaseP2 === "error"}
                            success={error.purchaseP2 === "success"}
                            labelText="Purchase P2"
                            id="purchaseP2"
                            helperText={error.purchaseP2 === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.purchaseP2}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "purchaseP2");
                                },
                                onBlur: (event) => validate(event, "purchaseP2"),
                                required: true,
                                type: "number",
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4} lg={4}>
                        <CustomInput
                            error={error.purchaseP3 === "error"}
                            success={error.purchaseP3 === "success"}
                            labelText="Purchase P3"
                            id="purchaseP3"
                            helperText={error.purchaseP3 === "error" && "required"}
                            formControlProps={{
                                fullWidth: true,
                            }}
                            value={state.purchaseP3}
                            inputProps={{
                                onChange: (event) => {
                                    handleChange(event, "purchaseP3");
                                },
                                onBlur: (event) => validate(event, "purchaseP3"),
                                required: true,
                                type: "number",
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
                <Button disabled={loading} color="success" round onClick={submit}>
                    Launch Simulation
                </Button>
                <Button round>Reset</Button>
                { results.length!==0 && <Button onClick={download} round  color="info">Download</Button>}
            </GridItem>
            {loading && <GridItem xs={12} sm={10} md={10}>
                <LinearProgress />
            </GridItem>}
            <GridItem xs={12} sm={10} md={10}>
                <Table
                hover
                tableHead={["", "Achats", "Predictions", "Predictions avec stock tampon", "Résiduel","Résiduel avec stock tampon"]}
                tableData={results}
                />
            </GridItem>
        </GridContainer>
    );
}
export default withSnackbar(SimulatorReference);