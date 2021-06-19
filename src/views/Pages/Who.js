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
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    React.useEffect(() => {
        let id = setTimeout(function () {
            setCardAnimation("");
        }, 700);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.clearTimeout(id);
        };
    });
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <GridContainer justify="center" >
                <GridItem xs={12} sm={6} md={8}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="rose"
                            >
                                <h4 className={classes.cardTitle}>Our communauty</h4>
                            </CardHeader>
                            <CardBody>
                                <h4>We are a a communauty that ...</h4>
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}
