import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import Slider from "@material-ui/core/Slider";
import Snackbar from "../../../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import {actions} from "../../../../../Store";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import predictionTaillant, {predictionMorpho} from "../../services";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    ...customSelectStyle,
};

class Step5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warn: false,
            message: "",
        };
        this.marks = [
            {
                value: 0,
                label: "Plus serré",
            },
            {
                value: 1,
                label: "A ma taille",
            },
            {
                value: 2,
                label: "Plus ample",
            },
        ];
    }

    handleSimple = (event, value) => {
        this.props.dispatch(actions.fitFinder.create.set("fitPreference", value));
    };

    valuetext(value) {
        return `${value}°C`;
    }

    getMorphoImg(result) {
        if (result.A === 1.0) {
            return "morphotypes_A.jpg";
        } else if (result.H === 1.0) {
            return "morphotypes_H.jpg";
        } else if (result.O === 1.0) {
            return "morphotypes_O.jpg";
        } else if (result.Trapeze === 1.0) {
            return "morphotypes_8.jpg";
        } else if (result.V === 1.0) {
            return "morphotypes_V.jpg";
        } else if (result.X === 1.0) {
            return "morphotypes_X.jpg";
        }
        return "";
    }

    async isValidated() {
        const {fitFinder} = this.props;
        this.props.parent.setState((previousState) => ({
            ...previousState,
            loading: true,
        }));
        try {
            const res1 = await predictionTaillant({
                mesures: [
                    parseInt(fitFinder.size + "0"),
                    parseInt(fitFinder.weight),
                    parseInt(fitFinder.age),
                    parseInt(fitFinder.braSize),
                    fitFinder.braCup,
                    parseInt(fitFinder.bellyForm),
                    parseInt(fitFinder.hipForm),
                ],
                session_id: 1,
            });
            this.props.enqueueSnackbar("Mensuration predicted successfully", {
                variant: "success",
            });
            this.props.dispatch(actions.fitFinder.create.set("result", res1.data));
            const res2 = await predictionMorpho({
                size: parseFloat(fitFinder.size + "0"),
                hip: parseFloat(res1.data.hip.toFixed(2)),
                bust: parseFloat(res1.data.bust.toFixed(2)),
                waist: parseFloat(res1.data.waist.toFixed(2)),
                session_id: "",
            });
            this.props.enqueueSnackbar("Morphotype predicted successfully", {
                variant: "success",
            });
            this.props.dispatch(
                actions.fitFinder.result.create.set(
                    "morphoImg",
                    this.getMorphoImg(res2.data.result)
                )
            );
        } catch (error) {
            console.error(error);
            this.props.enqueueSnackbar("Error:" + error.message, {
                variant: "error",
            });
            this.props.parent.setState((previousState) => ({
                ...previousState,
                loading: false,
            }));
            return false;
        }

        this.props.parent.setState((previousState) => ({
            ...previousState,
            loading: false,
        }));

        return true;
    }

    render() {
        const {classes} = this.props;
        return (
            <GridContainer justify="center">
               {/* <GridItem xs={12} sm={12}>
                    <h4 className={classes.infoText}>Are you living in a nice area?</h4>
                </GridItem>*/}
                <GridItem xs={12} sm={7}>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={this.valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={1}
                        valueLabelDisplay="auto"
                        marks={this.marks}
                        track={false}
                        max={2}
                        min={0}
                        name="fitPreference"
                        onChange={this.handleSimple}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

Step5.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(withStyles(style)(withSnackbar(Step5)));
