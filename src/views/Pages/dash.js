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
        'screen_name': "",
        'profile_img': "",
        'liked' : "",
        'user_followers_count' : "",
        'retweet_count' : "",
        'favorite_count' : "",
        'commented_by' : [],
        'choosedOnes' : []
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
        
        await axios.post('/api/saveDataRandom', myParams)
            .then(async (res) => {
                setData({...data, commented_by: res.data.commented_by, id:res.data.id, text:res.data.text,
                username : res.data.username, favorite_count: res.data.favorite_count,
                retweet_count : res.data.retweet_count, user_followers_count: res.data.user_followers_count,
                created_at: res.data.created_at, liked: res.data.liked, screen_name: res.data.screen_name, profile_img: res.data.profile_img})
                setChargeur(false)
                setTwiterIsReady(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function submitVerify_sec(){
        
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
        await axios.post('/api/saveDataRandom_sec', myParams)
            .then(async (res) => {
                setData({...data, id:res.data.id, text:res.data.text,
                username : res.data.username, favorite_count: res.data.favorite_count,
                retweet_count : res.data.retweet_count, user_followers_count: res.data.user_followers_count,
                created_at: res.data.created_at, liked: res.data.liked, screen_name: res.data.screen_name, profile_img: res.data.profile_img})
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
    async function chooseWinner_sec() {
        if (nb_winners === 0 && winners.wins.length === 0){
            enqueueSnackbar('Please select the number of winners first', {
                variant: "error",
            });
        }
        else if (nb_winners > 0){
            var nb_c = data.choosedOnes.length
            if ( nb_c != 0){
                var tmp = winners.wins
                var vtmp = data.choosedOnes[0]
                tmp.push(vtmp)
                setWinners({...winners, wins:tmp})
                var xer = data.choosedOnes
                console.log(xer)
                xer.splice(0, 1)
                console.log(xer)
                setData({...data, choosedOnes: xer})
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
        var currentdate = new Date(); 
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        const myParams = {
            'id' : data.id,
            'created_at' :data.created_at,
            'text' : data.text,
            'username': data.username,
            'lotterie_data': datetime,
            'screen_name': data.screen_name,
            'profile_img': data.profile_img,
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
    return (

        <GridContainer >
        {(!chargeur && !twiterIsReady) && 
        <>
                <GridItem md={3}></GridItem>
                <GridItem md={4}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>My URL</h4>
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
                                    setChargeur(true)
                                    submitVerify_sec()
                                }}>
                                    Choose Winners
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
                <GridItem md={5}></GridItem>
        </>
            }

            {chargeur &&  
            <>
                <h3>Searching for tweet informations : </h3>
                <CircularProgress  />
            </>
            }

            {twiterIsReady && 
                <>
                    <GridItem md={12} justify="center">
                        <h6 id="ttrs">Choose a random winner</h6><br /> 
                       
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>Set more settings</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                
                                <Typography> 
                                    <TextField onChange={(e) =>{
                                        setNb(e.target.value)
                                    }} type="number"  id="standard-basic" label="Standard" label="nb_winners" />
                                
                                <br />
                                <br />
                                <br />
                                <br />
                                <h7>Members : </h7>
                                <br />
                                {data.choosedOnes.length === 0 && <h8>List members empty</h8>}
                                {data.choosedOnes.map(item => <h8 key={item.name}>name : {item.name} <br /></h8>)}
                                <br />
                                <br />
                                
                                <TextField onChange={(e) =>{
                                        setCcd(e.target.value)
                                    }} type="text"  id="standard-basic" label="Standard" label="add_winner_name" />
                                <br />
                                <TextField onChange={(e) =>{
                                        setCcd2(e.target.value)
                                    }} type="text"  id="standard-basic" label="Standard" label="add_winner_screen_name" />
                                <br />
                                <TextField onChange={(e) =>{
                                        setCcd3(e.target.value)
                                    }} type="text"  id="standard-basic" label="Standard" label="add_winner_img_profile" />
                                <br />
                                <Button color="info" simple  block onClick={() => {
                                    var tmp = data.choosedOnes
                                    var xed = {
                                        "name" :cchod,
                                        "screen_name" : cchod2,
                                        "profile_img" : cchod3
                                    }
                                    tmp.push(xed)
                                    setData({...data, choosedOnes: tmp})
                                }}>
                                    add winner
                                </Button>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    
                    </GridItem>
                    <GridItem md={12} style={{textAlign:"center"}}>
                        {finish ? 
                        
                        <Button color="rose"  size="lg" onClick={() => {
                            saveToDatabase()
                        }}>
                                        finish 
                        </Button> 
                        :
                        <Button color="rose"  size="lg" onClick={() => {
                            chooseWinner_sec()
                        }}>
                                        Run 
                        </Button>
                        }
                    </GridItem>
                    
                    
                    {winners.wins.map(item => 
                        
                            <GridItem md="4">
                                <Card>
                                <CardBody>
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
                                </CardBody>
                            </Card>
          
                            </GridItem>
                            )}

                    </>
                
            }
            </GridContainer>
            
    );
}

