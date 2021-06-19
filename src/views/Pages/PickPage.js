import React from "react";

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

import { useSnackbar } from 'notistack';
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
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [open, setOpen] = React.useState(false);
    const [comments, setComments] = React.useState([])
    const  [data, setData] = React.useState({})
    const [Id, setId] = React.useState("")
    const { enqueueSnackbar } = useSnackbar();



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
        
        var id_filtred = Id.split("/")
        var id_okey = ""
        if (id_filtred.length === 1){
            id_okey = Id
        }
        else{
            id_okey = id_filtred[id_filtred.length - 1]
        }
        var myParams = {
            id: id_okey
        }
        /**
        setData({
            'id' : 23423432,
            'created_at' : "12/12/1222 33:44",
            'text' : "Hello there how ur u ?",
            'username': "Maria kaisa",
            'scree_name': "Mariakaisa",
            "profile_img" : "https://media.istockphoto.com/photos/giant-panda-ailuropoda-melanoleuca-picture-id117996443?k=6&m=117996443&s=612x612&w=0&h=MteGM0RHjlSv9tuatgKtPZ4BRDp4qtUZ_kEEZY5gNwY=",
            'liked' : "23423",
            'user_followers_count' : "1232",
            'retweet_count' : "234",
            'favorite_count' : "4444",
            'winners' : [
                {'name' : "Mikasa Yeager", "screen_name" : "MikasaYeager", "profile_img" : "https://randomuser.me/api/portraits/women/40.jpg" },
                {'name' : "Mikasa Yeager", "screen_name" : "MikasaYeager", "profile_img" : "https://randomuser.me/api/portraits/women/40.jpg" },
                {'name' : "Mikasa Yeager", "screen_name" : "MikasaYeager", "profile_img" : "https://randomuser.me/api/portraits/women/40.jpg" }
            ]
        })
        setOpen(true)
         */ 
        await axios.post('/api/verify', myParams)
            .then(async (res) => {
                if (res.data.status === "success"){
                    enqueueSnackbar('Ticket verified', {
                        variant: "success",
                    });
                    console.log(res.data.data.lotterie_data)
                    setData(res.data.data)
                    setOpen(true)
                }
                else{
                    enqueueSnackbar('Non valide ticket', {
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
            
            {open &&
            <GridContainer >
                <GridItem md={12} justify="center"> 
                    <h4  className="tgfs">Tweet</h4>
                </GridItem>
                <GridItem md={12}>
                    <GridContainer>
                        <GridItem md={2}></GridItem>
                        <GridItem md={8} className="bbxds">
                            <GridContainer>
                                <GridItem md={1}>
                                    <div className="avatar">
                                        <img
                                        src={data.profile_img}
                                        className="card-img-top"
                                        alt=""
                                        />
                                    </div>
                                </GridItem>
                                <GridItem md={6} className="dfcx">
                                    {data.username}
                                    <br />
                                    <span className="ddff">@{data.screen_name}</span>
                                </GridItem>
                                
                                <GridItem md={12} className="dfcxxx">
                                    {data.text}<br />
                                    
                                    <span className="ddfxxq">Date : {data.created_at.split(" ")[1]} at {data.created_at.split(" ")[0]}. Twitter Web app</span>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>

                </GridItem>
                <GridItem md={12} justify="center"> 
                    <h4  className="tgfs">Date : {data.lotterie_data.split(" ")[2]} at {data.lotterie_data.split(" ")[4]} </h4>
                </GridItem>
                <GridItem md={12} justify="center"> 
                    <h4  className="tgfs">Winners </h4>
                </GridItem>
                   
                   
                <GridItem md="12">
                    <GridContainer>
                        <GridItem md="2"></GridItem>
                        
                        {data.winners.map(item => 
                            <GridItem md="2">
                            <Card style={{padding: "0"}}>
                            <CardBody className="dvvxc">
                                <div className="avatar vvfd">
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
                            </CardBody>
                        </Card>
    
                        </GridItem>
                        )}

                    </GridContainer>
                </GridItem>
                </GridContainer>
                }
                
            {!open &&
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
                                    Verify
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
            }

        </div>
    );
}
