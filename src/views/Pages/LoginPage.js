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
import { useSnackbar } from 'notistack';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios"
import { useHistory } from 'react-router-dom';
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [data, setData] = React.useState({
        'email' : '',
        'password' : ''
    });

    React.useEffect(() => {
        let id = setTimeout(function () {
            setCardAnimation("");
        }, 700);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.clearTimeout(id);
        };
    });

    const handleChange = (e) => {
        setData({...data, email : e.target.value})
    }
    const handleChange2 = (e) => {
        setData({...data, password : e.target.value})
    }
    const classes = useStyles();

    const login = async () => {
        const myParams = {
            'email' : data.email,
            'password' : data.password
        }
        await axios.post('/api/login', myParams)
            .then(async (res) => {
                console.log(res.data)
                console.log(res.data.status)
                if (res.data.status === "success"){
                    
                    enqueueSnackbar('Logged successfully', {
                        variant: "success",
                    });
                    history.push("/admin/dashboard")
                }
                else{
                    enqueueSnackbar('Error login', {
                        variant: "error",
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>Log in</h4>
                                <div className={classes.socialLine}>
                                    {[
                                        "fab fa-twitter",
                                    ].map((prop, key) => {
                                        return (
                                            <Button
                                                color="transparent"
                                                justIcon
                                                key={key}
                                                className={classes.customButtonClass}
                                            >
                                                <i className={prop}/>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="Email..."
                                    id="email"
                                    value={data.email}
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        onChange: (event) => handleChange(event),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email className={classes.inputAdornmentIcon}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <CustomInput
                                    labelText="Password"
                                    id="password"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        onChange: (event) => handleChange2(event),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className={classes.inputAdornmentIcon}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                        type: "password",
                                        autoComplete: "off",
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                                <Button color="rose" simple size="lg" block onClick={(e) => {
                                    e.preventDefault()
                                    login()
                                }}>
                                    Let{"'"}s Go
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}
