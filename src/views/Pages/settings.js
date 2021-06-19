import React, {useState} from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

import Modal from '@material-ui/core/Modal';
import { useSnackbar } from 'notistack';
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  export default function MarkDown(props) {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [open, setOpen] = useState(false);
    const [twiterIsReady, setTwiterIsReady] = useState(false);
    const [chargeur, setChargeur] = useState(false);
    const [nb_winners, setNb] = useState(0);
    const [cchod, setCcd] = useState("");
    const [cchod2, setCcd2] = useState("");
    const [cchod3, setCcd3] = useState("");
    const [finish, setFinish] = useState(false);
    const [choosedOnes, setChoosedOnes] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    
    const [winners, setWinners] = useState({
        wins: [
              ],
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
        
        var myParams = {
            id: Id
        }
        await axios.post('/api/saveDataRandom', myParams)
            .then(async (res) => {
                setData({...data, commented_by: res.data.commented_by, id:res.data.id, text:res.data.text,
                username : res.data.username, favorite_count: res.data.favorite_count,
                retweet_count : res.data.retweet_count, user_followers_count: res.data.user_followers_count,
                created_at: res.data.created_at, liked: res.data.liked})
                setChargeur(false)
                setTwiterIsReady(true)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // to checkkkk
    async function chooseWinner() {
        if (nb_winners === 0 && winners.wins.length === 0){
            enqueueSnackbar('Please select the number of winners first', {
                variant: "error",
            });
        }
        else if (nb_winners > 0){
            var nb_c = choosedOnes.length
            if ( nb_c != 0){
                var tmp = winners.wins
                var vtmp = choosedOnes[0]
                tmp.push(vtmp)
                setWinners({...winners, wins:tmp})
                var xer = choosedOnes
                xer.slice(0, 1)
                setChoosedOnes(xer)
            }
            else{
                var taille = data.commented_by.length - 1
                var index = Math.floor((Math.random() * taille) + 0);
                console.log(index)
                var tmp = winners.wins
                //var vtmp = {'name' : "Mikasa Yeager", "username" : "MikasaYeager", "profile_img" : "https://randomuser.me/api/portraits/women/40.jpg" }
                tmp.push(data.commented_by[index])
                setWinners({...winners, wins:tmp})
                var xer = data.commented_by
                xer.slice(index, 1)
                setData({...data, commented_by: xer})
            }
            var v = nb_winners - 1
            setNb(v)
        }
        else{
            setFinish(true)
            enqueueSnackbar('Max winners already selected', {
                variant: "error",
            });
        }
        
    }

    const saveToDatabase = () => {
        const myParams = {
            'id' : data.id,
            'created_at' :data.created_at,
            'text' : data.text,
            'username': data.username,
            'liked' : data.liked,
            'user_followers_count' : data.user_followers_count,
            'retweet_count' : data.retweet_count,
            'favorite_count' : data.favorite_count,
            'winners' : winners.wins
        }
        axios.post('/api/saveGagnantData', myParams)
            .then(async (res) => {
                enqueueSnackbar('Data saved with success', {
                    variant: "success",
                });
                
            })
            .catch(err => {
                console.log(err)
            })
    }
    const setURL = () => {
        
        var id_filtred = Id.split("/")
        var id_okey = ""
        if (id_filtred.length === 1){
            id_okey = Id
        }
        else{
            id_okey = id_filtred[id_filtred.length - 1]
        }
        var myParams = {
            id : id_okey,
            date:  new Date()
        }
        axios.post('/api/saveTicket', myParams)
            .then(async (res) => {
                if (res.data.status === "success"){
                    enqueueSnackbar('ticket saved', {
                        variant: "success",
                    });
                }
                else{
                    enqueueSnackbar('ticket already exists', {
                        variant: "error",
                    });

                }
                
            })
            .catch(err => {
                console.log(err)
            })
        
    }
    return (

        <GridContainer >
            
                <GridItem md={3}></GridItem>
                <GridItem md={4}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="rose"
                            >
                                <h4 className={classes.cardTitle}>Settings</h4>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="My URL of the week"
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
                                    setURL()
                                }}>
                                    Set URL of this week
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
                <GridItem md={5}></GridItem>

            </GridContainer>
            
    );
}

