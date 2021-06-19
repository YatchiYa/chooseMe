import React from "react";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";
// plugin that creates slider
import Slider from "nouislider";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles(styles);

function BrowseTrend(props) {
    const tileData = [
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
        {
            img: require("assets/img/card-1.jpeg"),
            title: "Image",
            author: "author",
        },
    ];
    const getGridListCols = () => {
        if (isWidthUp("xl", props.width)) {
            return 6;
        }

        if (isWidthUp("lg", props.width)) {
            return 4;
        }

        if (isWidthUp("md", props.width)) {
            return 3;
        }
        if (isWidthUp("sm", props.width)) {
            return 2;
        }

        return 1;
    };

    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2} lg={2}>
                            <CustomDropdown
                                buttonText="Multilevel Dropdown"
                                hoverColor="info"
                                buttonProps={{
                                    round: true,
                                    block: true,
                                    color: "info",
                                }}
                                dropPlacement="bottom"
                                dropdownList={[
                                    "Action",
                                    "Another action",
                                    <CustomDropdown
                                        key={"key"}
                                        data-ref="multi"
                                        innerDropDown
                                        buttonText="Submenu"
                                        hoverColor="info"
                                        buttonProps={{
                                            simple: true,
                                            block: true,
                                        }}
                                        dropPlacement="right-start"
                                        dropdownList={[
                                            "Submenu action",
                                            "Submenu action",
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Subsubmenu action 1",
                                                    "Subsubmenu action 2",
                                                ]}
                                            />,
                                            <CustomDropdown
                                                key={"key"}
                                                data-ref="multi"
                                                innerDropDown
                                                hoverColor="info"
                                                buttonText="Second Subsubmenu"
                                                buttonProps={{
                                                    simple: true,
                                                }}
                                                dropPlacement="right-start"
                                                dropdownList={[
                                                    "Second Subsubmenu action 1",
                                                    "Second Subsubmenu action 2",
                                                ]}
                                            />,
                                        ]}
                                    />,
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <GridList cols={getGridListCols()} cellHeight={200}>
                        {tileData.map((tile) => (
                            <GridListTile key={tile.img}>
                                <img src={tile.img} alt={tile.title}/>
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={<span>by: {tile.author}</span>}
                                    actionIcon={
                                        <IconButton
                                            aria-label={`info about ${tile.title}`}
                                            className={classes.icon}
                                        >
                                            <InfoIcon/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default withWidth()(BrowseTrend);
