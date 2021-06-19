import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";

import FitFinder from "./FitFinder/FitFinder";

import {widgetStories, bugs, website, server} from "variables/general.js";

import image from "assets/img/faces/card-profile1-square.jpg";

import {
    cardTitle,
    roseColor,
} from "assets/jss/material-dashboard-pro-react.js";
import Batch from "./Batch/Batch";
import Results from "./Results/Results";

const styles = {
    cardTitle,
    cardTitleWhite: {
        ...cardTitle,
        color: "#FFFFFF",
        marginTop: "0",
    },
    cardCategoryWhite: {
        margin: "0",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: ".875rem",
    },
    cardCategory: {
        color: "#999999",
        marginTop: "10px",
    },
    icon: {
        color: "#333333",
        margin: "10px auto 0",
        width: "130px",
        height: "130px",
        border: "1px solid #E5E5E5",
        borderRadius: "50%",
        lineHeight: "174px",
        "& svg": {
            width: "55px",
            height: "55px",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            width: "55px",
            fontSize: "55px",
        },
    },
    iconRose: {
        color: roseColor,
    },
    marginTop30: {
        marginTop: "30px",
    },
    testimonialIcon: {
        marginTop: "30px",
        "& svg": {
            width: "40px",
            height: "40px",
        },
    },
    cardTestimonialDescription: {
        fontStyle: "italic",
        color: "#999999",
    },
};

const useStyles = makeStyles(styles);

export default function CustomerKnowledge() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        title=""
                        headerColor="rose"
                        tabs={[
                            {
                                tabName: "Fit finder",
                                tabIcon: BugReport,
                                tabContent: <FitFinder/>,
                            },
                            {
                                tabName: "Batch",
                                tabIcon: Code,
                                tabContent: <Batch/>,
                            },
                            {
                                tabName: "Results",
                                tabIcon: Cloud,
                                tabContent: <Results/>,
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
}
