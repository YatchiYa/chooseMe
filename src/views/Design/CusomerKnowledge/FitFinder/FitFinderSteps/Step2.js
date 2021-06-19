import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "../../../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import {actions} from "../../../../../Store";
import {connect} from "react-redux";
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
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px",
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch,
};

class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            braSize: "",
            braSizeState: "",
            braCup: "",
            braCupState: "",
        };
        this.braSizes = [];
        for (var i = 75; i <= 140; i += 5) {
            this.braSizes.push(i);
        }

        this.braCups = [
            "A",
            "AA",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "j",
            "k",
        ];
    }

    sendState() {
        return this.state;
    }

    handleSimple = (event) => {
        this.setState({[event.target.name]: event.target.value});
        this.props.dispatch(
            actions.fitFinder.create.set(event.target.name, event.target.value)
        );
        this.setState({[event.target.name + "State"]: "success"});
    };

    isValidated() {
        if (
            this.state.braCupState === "success" &&
            this.state.braSizeState === "success"
        )
            return true;
        if (this.state.braCupState !== "success")
            this.setState({braCupState: "error"});
        if (this.state.braSizeState !== "success")
            this.setState({braSizeState: "error"});
        this.props.enqueueSnackbar("fill required fields then click next", {
            variant: "warning",
        });
        return false;
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {/*<h4 className={classes.infoText}>What are you doing? (checkboxes)</h4>*/}
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6}>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={this.state.braSizeState === "error"}
                        >
                            <InputLabel
                                htmlFor="simple-select1"
                                className={classes.selectLabel}
                            >
                                Your bra size
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={this.state.braSize}
                                onChange={this.handleSimple}
                                inputProps={{
                                    name: "braSize",
                                    id: "simple-select1",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose a bra size
                                </MenuItem>
                                {this.braSizes.map((item) => (
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                            {this.state.braSizeState === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            error={this.state.braCupState === "error"}
                        >
                            <InputLabel
                                htmlFor="simple-select2"
                                className={classes.selectLabel}
                            >
                                Your bra cups
                            </InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu,
                                }}
                                classes={{
                                    select: classes.select,
                                }}
                                value={this.state.braCup}
                                onChange={this.handleSimple}
                                inputProps={{
                                    name: "braCup",
                                    id: "simple-select2",
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem,
                                    }}
                                >
                                    Choose a bra size
                                </MenuItem>
                                {this.braCups.map((item) => (
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected,
                                        }}
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                            {this.state.braCupState === "error" && (
                                <FormHelperText>Required</FormHelperText>
                            )}
                        </FormControl>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Step2.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(withStyles(style)(withSnackbar(Step2)));
