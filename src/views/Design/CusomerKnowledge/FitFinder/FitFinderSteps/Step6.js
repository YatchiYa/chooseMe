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
import Card from "../../../../../components/Card/Card";
import CardHeader from "../../../../../components/Card/CardHeader";
import CardIcon from "../../../../../components/Card/CardIcon";
import Icon from "@material-ui/core/Icon";
import CardFooter from "../../../../../components/Card/CardFooter";
import Danger from "../../../../../components/Typography/Danger";
import Warning from "@material-ui/icons/Warning";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import {
    cardTitle,
    grayColor,
} from "../../../../../assets/jss/material-dashboard-pro-react";
import CardBody from "../../../../../components/Card/CardBody";
import Table from "../../../../../components/Table/Table";
import {connect} from "react-redux";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    cardCategory: {
        color: grayColor[0],
        fontSize: "14px",
        paddingTop: "10px",
        marginBottom: "0",
        marginTop: "0",
        margin: "0",
    },
    cardTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "3px",
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
    },
    stats: {
        color: grayColor[0],
        fontSize: "12px",
        lineHeight: "22px",
        display: "inline-flex",
        "& svg": {
            position: "relative",
            top: "4px",
            width: "16px",
            height: "16px",
            marginRight: "3px",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            position: "relative",
            top: "4px",
            fontSize: "16px",
            marginRight: "3px",
        },
    },
};

class Step6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
        };
    }

    sendState() {
        return this.state;
    }

    handleSimple = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    isValidated() {
        return true;
    }

    getImg = () => {
        try {
            console.log(this.props.fitFinder.result.morphoImg);
            return this.props.fitFinder.result.morphoImg ? require(`assets/img/morphotypes/${this.props.fitFinder.result.morphoImg}`):null;
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        const {classes, fitFinder} = this.props;
        const morphImg = this.getImg();

        return (
            <GridContainer>
                <GridItem xs={6} sm={6}>
                    <Card>
                        <CardHeader color="warning" icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>

                            <h3 className={classes.cardIconTitle}>Parameters</h3>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableData={[
                                    ["age", fitFinder.age],
                                    ["size", fitFinder.size],
                                    ["weight", fitFinder.weight],
                                    ["Bra Size", fitFinder.braSize],
                                    ["Bra Cup", fitFinder.braCup],
                                    ["Belly Form", fitFinder.bellyForm],
                                    ["Hip Form", fitFinder.HipForm],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={6} sm={6}>
                    <Card>
                        <CardHeader color="warning" icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>

                            <h3 className={classes.cardIconTitle}>mensuration</h3>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableData={[
                                    ["Bust", fitFinder.result.bust],
                                    ["Under bust", fitFinder.result.under_bust],
                                    ["Waist", fitFinder.result.waist],
                                    ["Hip", fitFinder.result.hip],
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={6} sm={6}>
                    <Card>
                        <CardHeader color="warning" icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>

                            <h3 className={classes.cardIconTitle}>morphotype</h3>
                        </CardHeader>
                        <CardBody>
                            <img style={{height:500,width:"100%"}} src={morphImg} alt=""/>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

Step6.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(withStyles(style)(Step6));
