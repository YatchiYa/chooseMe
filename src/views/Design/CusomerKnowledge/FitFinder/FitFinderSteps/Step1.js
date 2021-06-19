import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from "../../../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import {connect} from "react-redux";
import {predictionTaillant} from "../../services";
import {actions} from "../../../../../Store";
import {withSnackbar} from "notistack";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    inputAdornmentIcon: {
        color: "#555",
    },
    inputAdornment: {
        position: "relative",
    },
};

class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: null,
            ageState: "",
            ageHelp: "",
            size: null,
            sizeState: "",
            sizeHelp: "",
            weight: null,
            weightState: "",
            weightHelp: "",
        };
    }

    sendState() {
        return this.state;
    }

    // function that returns true if value is weight, false otherwise
    verifyweight(value) {
        return true;
    }

    // function that verifies if a string has a given length or not
    verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }

    change(event, stateName, type, min, max) {
        switch (type) {
            case "range":
                if (event.target.value >= min && event.target.value <= max) {
                    this.setState({[stateName + "State"]: "success"});
                    this.setState({[stateName + "Help"]: ""});
                } else {
                    this.setState({[stateName + "State"]: "error"});
                    this.setState({
                        [stateName +
                        "Help"]: `${stateName} age must be between ${min} and ${max}`,
                    });
                }
                break;
            default:
                break;
        }
        this.setState({[stateName]: event.target.value});
        this.props.dispatch(
            actions.fitFinder.create.set(stateName, event.target.value)
        );
    }

    isValidated() {
        if (
            this.state.ageState === "success" &&
            this.state.sizeState === "success" &&
            this.state.weightState === "success"
        ) {
            return true;
        } else {
            if (this.state.ageState !== "success") {
                this.setState({ageState: "error"});
            }
            if (this.state.sizeState !== "success") {
                this.setState({sizeState: "error"});
            }
            if (this.state.weightState !== "success") {
                this.setState({weightState: "error"});
            }
        }

        this.props.enqueueSnackbar('correct fields then click next"', {
            variant: "warning",
        });
        return false;
    }

    render() {
        const {classes} = this.props;
        return (
            <GridContainer justify="center">
          {/*      <GridItem xs={12} sm={12}>
                    <h4 className={classes.infoText}>
                        Let{"'"}s start with the basic information (with validation)
                    </h4>
                </GridItem>*/}
                <GridItem xs={12} sm={6}>
                    <form>
                        <CustomInput
                            success={this.state.ageState === "success"}
                            error={this.state.ageState === "error"}
                            labelText={
                                <span>
                  Age<small>(required)</small>
                </span>
                            }
                            id="age"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            helperText={this.state.ageHelp}
                            inputProps={{
                                onChange: (event) => this.change(event, "age", "range", 16, 65),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        className={classes.inputAdornment}
                                    >
                                        <span className={classes.inputAdornmentIcon}>years</span>
                                    </InputAdornment>
                                ),
                                type: "number",
                                placeholder: "16-65",
                            }}
                        />
                        <CustomInput
                            success={this.state.sizeState === "success"}
                            error={this.state.sizeState === "error"}
                            type="number"
                            labelText={
                                <span>
                  Size<small>(required)</small>
                </span>
                            }
                            id="size"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            helperText={this.state.sizeHelp}
                            inputProps={{
                                onChange: (event) =>
                                    this.change(event, "size", "range", 130, 220),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        className={classes.inputAdornment}
                                    >
                                        <span className={classes.inputAdornmentIcon}>cm</span>
                                    </InputAdornment>
                                ),
                                type: "number",
                                placeholder: "130-220",
                            }}
                        />
                        <CustomInput
                            success={this.state.weightState === "success"}
                            error={this.state.weightState === "error"}
                            type="number"
                            labelText={
                                <span>
                  Weight <small>(required)</small>
                </span>
                            }
                            id="weight"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            helperText={this.state.weightHelp}
                            inputProps={{
                                onChange: (event) =>
                                    this.change(event, "weight", "range", 35, 130),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        className={classes.inputAdornment}
                                    >
                                        <span className={classes.inputAdornmentIcon}>kg</span>
                                    </InputAdornment>
                                ),
                                type: "number",
                                placeholder: "35-130",
                            }}
                        />
                    </form>
                </GridItem>
            </GridContainer>
        );
    }
}

Step1.propTypes = {
    classes: PropTypes.object,
};

export default connect()(withStyles(style)(withSnackbar(Step1)));
