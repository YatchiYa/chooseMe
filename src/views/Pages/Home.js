import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { Button as Button1, Grid, Avatar } from "@material-ui/core";
import CardFooter from "components/Card/CardFooter.js";
import { useSnackbar } from 'notistack';
import axios from "axios"

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import "./page.scss"

import { deepPurple } from '@material-ui/core/colors';
const useStyles = makeStyles(styles);
const useStyles2 = makeStyles((theme) => ({
    ...styles,
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: "50px",
        height: "50px",
    },
    imgProfile: {
        width: "100%",
        height: "100%",
    }
}));

export default function LoginPage() {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [open, setOpen] = React.useState(false);
    const [dataWinners, setData] = React.useState([])
    const { enqueueSnackbar } = useSnackbar();
    React.useEffect(() => {
        let id = setTimeout(function () {
            setCardAnimation("");
        }, 700);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.clearTimeout(id);
        };
    });

    React.useEffect(() => {
        var tmp = []
        var myParams = {
            id : "1405698055135977472"
        }
        
    }, []);
    const classes = useStyles();

    
    return (
        <div className={classes.container}>
            <GridContainer justify="center" >
               {/**
                <GridItem xs={12} sm={6} md={10}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>Winners of the week</h4>
                            </CardHeader>
                            <CardBody>
                                
                                
                                <GridContainer >
                                    {open === true ?
                                    <>
                                        {dataWinners.map(item => 
                                            
                                        <GridItem md="3">
                                            <div className="card ffd">
                                                <div className="card-body">
                                                <div className="avatar">
                                                    <img
                                                    src={item.profile_img}
                                                    className="card-img-top"
                                                    alt=""
                                                    />
                                                </div>
                                                <h5 className="card-title">
                                                    {item.name}
                                                </h5>
                                                <h6 className="card-title">
                                                    @{item.screen_name}
                                                </h6>
                                                </div>
                                            </div>
            
                                        </GridItem>
                                        )}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                </GridContainer>



                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
 */}
                
                <GridItem xs={12} sm={6} md={10}>
                    <h2 className="whyC"> Why choose us ?</h2>
                </GridItem>

                <GridItem xs={12} sm={6} md={10}>
                    <h3 className="whyX"> Imartial Choice </h3>
                    <h3 className="whyX"> Simple & intuitive </h3>
                    <h3 className="whyX"> The cheapest in market </h3>
                    <h3 className="whyX"> 100% Proof Secure  </h3>
                </GridItem>
            </GridContainer>
        </div>
    );
}
