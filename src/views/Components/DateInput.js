import React, {useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons

// core components

import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";
import CustomInput from "../../components/CustomInput/CustomInput";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {
    grayColor,
    infoColor,
} from "../../assets/jss/material-dashboard-pro-react";
import moment from "moment";

const useStyles = makeStyles({
    label: {
        root: {color: "red"},
    },
});
const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                color: grayColor[3],
                height: "unset",
                "&,&::placeholder": {
                    fontSize: "14px",
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: "400",
                    lineHeight: "1.42857",
                    opacity: "1",
                },
                "&::placeholder": {
                    color: grayColor[3],
                },
                "& focused": {
                    color: grayColor[3],
                },
            },
            underline: {
                "&:hover:not($disabled):before,&:before": {
                    borderColor: grayColor[4] + "!important",
                    borderWidth: "1px !important",
                },
                "&:after": {
                    borderColor: infoColor[3] + "!important",
                },
                "& + p": {
                    fontWeight: "300",
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: grayColor[3],
                focused: {
                    color: grayColor[14],
                },
            },
        },
    },
});
export default function DateInput(props) {
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
                margin="normal"
                id="date-picker-dialog"
                label={props.label}
                format="DD/MM/yyyy"
                value={props.value }
                onChange={props.onChange}
                error={props.error}
                InputProps={{
                    classes: {root: classes.root},

                }}
                autoOk
            />
        </MuiPickersUtilsProvider>
    );
}
