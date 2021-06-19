import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import {
    grayColor,
    roseColor,
} from "../../../../../assets/jss/material-dashboard-pro-react";
import {connect} from "react-redux";
import {actions} from "../../../../../Store";
import Snackbar from "../../../../../components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
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
    iconCheckboxChecked: {
        color: roseColor[0],
        "& > span:first-child": {
            borderColor: roseColor[0],
        },
        //  "-webkit-box-shadow": "-1px 4px 15px 0px rgba(255,143,220,1)",
        // "-moz-box-shadow": "-1px 4px 15px 0px rgba(255,143,220,1)",
        "box-shadow":
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 0,
    },
    iconCheckbox: {
        // height: "116px",
        // width: "116px",
        color: grayColor[0],
        padding: "0",
        margin: "0 auto 20px",
        "& > span:first-child": {
            // borderWidth: "4px",
            // borderStyle: "solid",
            borderColor: grayColor[9],
            textAlign: "center",
            verticalAlign: "middle",
            // borderRadius: "50%",
            color: "inherit",
            transition: "all 0.2s",
        },

        "&:hover": {
            color: roseColor[0],
            "& > span:first-child": {
                borderColor: roseColor[0],
            },
        },
    },
};

class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHip: "",
            selectedBMIIndice: 20,
        };
    }

    handleChange = (name) => (event) => {
        this.setState({selectedHip: name});
        this.props.dispatch(
            actions.fitFinder.create.set("hipForm", name.slice(name.length - 1))
        );
    };

    isValidated() {
        if (this.props.fitFinder.hipForm) return true;
        else {
            this.props.enqueueSnackbar("choose one form then click next", {
                variant: "warning",
            });
            return false;
        }
    }

    getBMI() {
        const weight = this.props.fitFinder.weight;
        const size = this.props.fitFinder.size;
        if (!weight || !size) {
            return 20;
        }
        const bmi = (weight / (size * size)) * 10000;

        if (bmi > 20 && bmi <= 26) {
            return 20;
        } else if (bmi > 26 && bmi <= 30) {
            return 26;
        } else if (bmi > 30 && bmi <= 32) {
            return 30;
        } else if (bmi > 32 && bmi <= 36) {
            return 32;
        } else if (bmi > 36) {
            return 32;
        }
        return 20;
    }

    getImg(type) {
        const bmi = this.getBMI();

        try {
            return require(`assets/img/bodyshapes/F.${bmi}.B${this.props.fitFinder.bellyForm}.${type}.png`);
        } catch (e) {
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
              {/*  <h4 className={classes.infoText}>
                    Formes Morphologiques possibles du ventre
                </h4>*/}
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12} lg={10}>
                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <div className={classes.choiche}>
                                    <Checkbox
                                        tabIndex={-1}
                                        checked={this.state.selectedHip === "H1"}
                                        onClick={this.handleChange("H1")}
                                        checkedIcon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H1")}
                                                alt=""
                                            />
                                        }
                                        icon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H1")}
                                                alt=""
                                            />
                                        }
                                        classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox,
                                        }}
                                    />
                                    <h6>Plutôt plat</h6>
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <div className={classes.choiche}>
                                    <Checkbox
                                        tabIndex={-1}
                                        checked={this.state.selectedHip === "H2"}
                                        onClick={this.handleChange("H2")}
                                        checkedIcon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H2")}
                                                alt=""
                                            />
                                        }
                                        icon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H2")}
                                                alt=""
                                            />
                                        }
                                        classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox,
                                        }}
                                    />
                                    <h6>Moyen/Je ne sais pas</h6>
                                </div>
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <div className={classes.choiche}>
                                    <Checkbox
                                        tabIndex={-1}
                                        checked={this.state.selectedHip === "H3"}
                                        onClick={this.handleChange("H3")}
                                        checkedIcon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H3")}
                                                alt=""
                                            />
                                        }
                                        icon={
                                            <img
                                                style={{height: "100%", width: "100%"}}
                                                src={this.getImg("H3")}
                                                alt=""
                                            />
                                        }
                                        classes={{
                                            checked: classes.iconCheckboxChecked,
                                            root: classes.iconCheckbox,
                                        }}
                                    />
                                    <h6>Plutôt arrondi</h6>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Step4.propTypes = {
    classes: PropTypes.object,
};
const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(withStyles(style)(withSnackbar(Step4)));
