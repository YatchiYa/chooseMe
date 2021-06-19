import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {cardTitle} from "assets/jss/material-dashboard-pro-react.js";
import Overview from "./Overview/Overview";
import Dresses from "./Dresses/Dresses";
import ScatterImg from "../../../../components/ScatterImg/ScatterImg";

const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center",
    },
    cardCategory: {
        margin: "0",
        color: "#999999",
    },
    pad: {
        padding: 0 + "!important",
    },
};

const useStyles = makeStyles(styles);

export default function StateOfPlay() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer justify="center">
                <GridItem classes={{item: classes.pad}} xs={12} sm={12} md={12}>
                    <NavPills
                        color="rose"
                        alignCenter
                        tabs={[
                            {
                                tabButton: "Overview",
                                tabIcon: Info,
                                tabContent: (
                                    <Card>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>
                                                Description about product
                                            </h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                                            </p>
                                        </CardHeader>
                                        <CardBody>
                                            <ScatterImg/>
                                        </CardBody>
                                    </Card>
                                ),
                            },
                            {
                                tabButton: "Dresses",
                                tabIcon: LocationOn,
                                tabContent: (
                                    <Card>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>
                                                Location of the product
                                            </h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                                            </p>
                                        </CardHeader>
                                        <CardBody>
                                            <Dresses/>
                                        </CardBody>
                                    </Card>
                                ),
                            },
                            {
                                tabButton: "Legal Info",
                                tabIcon: Gavel,
                                tabContent: (
                                    <Card>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>
                                                Legal info of the product
                                            </h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                                            </p>
                                        </CardHeader>
                                        <CardBody>
                                            <Overview/>
                                        </CardBody>
                                    </Card>
                                ),
                            },
                            {
                                tabButton: "Help Center",
                                tabIcon: HelpOutline,
                                tabContent: (
                                    <Card>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>Help center</h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                                            </p>
                                        </CardHeader>
                                        <CardBody>
                                            From the seamless transition of glass and metal to the
                                            streamlined profile, every detail was carefully considered
                                            to enhance your experience. So while its display is
                                            larger, the phone feels just right.
                                            <br/>
                                            <br/>
                                            Another Text. The first thing you notice when you hold the
                                            phone is how great it feels in your hand. The cover glass
                                            curves down around the sides to meet the anodized aluminum
                                            enclosure in a remarkable, simplified design.
                                        </CardBody>
                                    </Card>
                                ),
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
}
