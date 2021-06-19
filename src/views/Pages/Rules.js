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
                                color="info"
                            >
                                <h4 className={classes.cardTitle}>Twitter rules</h4>
                            </CardHeader>
                            <CardBody>
                                <h4>Guidelines for Promotions on Twitter</h4>
                                <p>Businesses, organizations, and even some creative individuals have hosted contests and sweepstakes through their Twitter profile. Contests and sweepstakes on Twitter may offer prizes for Tweeting a particular update, for following a particular account, or for posting updates with a specific hashtag. If you’ve been thinking about hosting a contest using your Twitter profile, here are some simple guidelines to follow to ensure your contest doesn't ask anyone to violate any of Twitter's rules or guidelines:</p><br />
                                <h5>Discourage the creation of multiple accounts</h5>
                                <p>If people create a lot of accounts in order to enter a contest more than once, they’re liable to get all of their accounts suspended. Please be sure to include a rule stating that anyone found to use multiple accounts to enter will be ineligible.</p><br />
                                <h5>Discourage posting the same Tweet repeatedly</h5>
                                <p>Posting duplicate, or near duplicate, updates or links is a violation of the Twitter Rules and jeopardizes search quality. Please don’t set rules to encourage lots of duplicate updates (e.g., “whoever Retweets this the most wins”).  Your contest or sweepstakes could cause people to be automatically filtered out of Twitter search. We recommend setting clear contest rules stating that multiple entries in a single day will not be accepted.</p><br />
                                <h5>Ask people to mention you in their update so you can see all the entries</h5>
                                <p>When it comes to picking a winner, you’ll want to see all the contestants. If the updates mention you, you’ll be able to see all the updates in your Notifications timeline (learn more about replies and mentions). Simply running a public search may not show every single update, and some contestants may be filtered from search for quality.</p> <br />
                                <h5>Encourage the use of topics relevant to the contest</h5>
                                <p>You might decide to have people include relevant hashtag topics along with the updates (e.g., #contest or #yourcompanyname). Keep in mind that hashtag topics need to be relevant to the update; encouraging people to add your hashtag to totally unrelated updates might cause them to violate the Twitter Rules.</p> <br />
                                <h5>Follow the Twitter Rules</h5>
                                <p>While these guidelines should help keep your contest entrants in good standing, please make sure you also review both the Twitter Rules and our search best practices before starting your contest. If you’re a business on Twitter, you might also want to check out business.twitter.com for more information and tips.</p><br />
                                <h5>Applicable laws and regulations</h5> 
                                <p>Before starting any contests or sweepstakes please ensure that they comply with all applicable laws and regulations. Compliance with such laws and regulations is your responsibility; please consult with an attorney if you have questions about legal compliance.</p> <br />
                                <a href="https://help.twitter.com/en/rules-and-policies/twitter-rules"> <h6>More about twitter rules </h6> </a> 


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
