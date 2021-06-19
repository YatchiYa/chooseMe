import React, {useState} from "react";

import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

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
import axios from "axios"
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./page.scss"
const useStyles = makeStyles(styles);

const useStyles2 = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #fff',
      boxShadow: "0px 0px 3px white",
      padding: theme.spacing(2, 4, 3),
    },
  }));
export default function LoginPage() {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [open, setOpen] = useState(false);
    const [winners, setWinners] = useState({
        wins: [],
    })
    const  [data, setData] = useState({
        'id' : 0,
        'created_at' : "",
        'text' : "",
        'username': "",
        'liked' : "",
        'user_followers_count' : "",
        'retweet_count' : "",
        'favorite_count' : "",
        'commented_by' : [],
    })
    const [Id, setId] = React.useState("")



    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      

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
    const classes2 = useStyles2();
    
    async function submitVerify(){
        
        handleOpen()
        var myParams = {
            id: Id
        }
        await axios.post('/api/saveDataRandom', myParams)
            .then(async (res) => {
                setData({...data, commented_by: res.data.commented_by})
                handleOpen()
                console.log("debug 1")
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // to checkkkk
    async function chooseWinner() {
        console.log(data.commented_by)
        console.log(data.commented_by.length)
        console.log(data.commented_by[0])
        var taille = data.commented_by.length - 1
        var index = Math.floor((Math.random() * taille) + 0);
        console.log(index)
        var tmp = winners.wins
        var vtmp = {'name' : "Mikasa Yeager", "username" : "MikasaYeager", "profile_img" : "https://randomuser.me/api/portraits/women/40.jpg" }
        tmp.push(data.commented_by[index])
        setWinners({...winners, wins:tmp})
        
    }
    
    return (
        <div className={classes.container}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes2.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes2.paper}>
                    <h4 id="transition-modal-title" className="User">Choose a random winner</h4><br />
                    <h6> We are choosing 5 winners every one week, don't stay behind and follow us !!!</h6>
                    <h5 id="transition-modal-title" className="User">Winner players</h5><br />
                    
                    
                    <GridContainer container >
                    {winners.wins.map(item => 
                        
                            <GridItem md="4">
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
                                        @{item.username}
                                    </h6>
                                    </div>
                                </div>

                            </GridItem>
                            )}
                        </GridContainer>


                    <Button color="rose" simple size="lg" block onClick={() => {
                        chooseWinner()
                    }}>
                                    Run 
                    </Button>
                </div>
                </Fade>
            </Modal>

            <GridContainer justify="center" >
                <GridItem xs={12} sm={6} md={4}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>Enter URL or ID</h4>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="URL or ID twitter"
                                    id="text"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        onChange: (event) => setId(event.target.value),
                                        endAdornment: (
                                            <InputAdornment position="end" >
                                                <Icon className={classes.inputAdornmentIcon}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                        type: "text",
                                        value:{Id},
                                        autoComplete: "off",
                                        value:Id,
                                        
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                                <Button color="rose" simple size="lg" block onClick={() => {
                                    submitVerify()
                                }}>
                                    Choose ticket
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>

        </div>
    );
}
