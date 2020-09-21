import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Grid from '@material-ui/core/Grid';

import { Answers } from "./../states/answerState.js";
import { ActiveStep } from "./../states/activeStepState.js";
import { DocumentQueue } from "./../states/documentQueueState.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    '& > *': {
      margin: theme.spacing(1),
    },
    minHeight: "39vh"
  },
  buttonContainer: {
    margin: "0px"
  },
  buttonCardInactive: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
    height: "10vh",
    borderRadius: "0px",
  },
  buttonCardActive: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
    height: "10vh",
    borderRadius: "0px",
  },
  buttonTextBoxActive: {
    backgroundColor: "#f3b500",
    padding: theme.spacing(3,4,3,4),
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.7vh",
    height: "100%",
    width: "98%"
  },
  buttonTextBoxInactive: {
    backgroundColor: "white",
    padding: theme.spacing(3,4,3,4),
    fontFamily: "BundesSansWeb-Bold",
    fontSize: "1.7vh",
    height: "100%",
    width: "98%"
  },
  buttonStripe: {
    display: "flex",
    backgroundColor: "#f3b500",
    height: "100%",
    width: "2%"
  },
  buttonTextContainer: {
    paddingLeft: "0.8vw",
    paddingRight: "0.8vw",
    marginBottom: "3vh",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "0px"
  },
}));

export default function JourneySelection(props) {
  const classes = useStyles();
  let answers = Answers.useContainer();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();

  let activeDocument = documentQueue.active(activeStep.self)
  let stepAnswers = answers.initialiseStep(activeDocument.identifier)
  let options = Object.keys(activeDocument["options"]);

  return (
    <Grid Container className={classes.root} >

        {options.map((label, index) => {


          let CardWithPosition = (props) => {
            return(
              <Grid Item md={3} sm={6} xs={12} className={classes.buttonTextContainer}>
                {props.component}
              </Grid>
            )
          }


          let CardWithActive;
          if (!stepAnswers.includes(label)) {
            CardWithActive =
              <div className={classes.buttonCardInactive}
                onClick={() => {
                  answers.update(activeDocument.identifier, label)
                  documentQueue.add(activeStep.self, label)
                }}
              >
                <div className={classes.buttonTextBoxInactive}>
                  {label}
                </div>
               <div className={classes.buttonStripe}></div>
              </div>
          } else {
            CardWithActive =
              <div className={classes.buttonCardActive}
                onClick={() => {
                  answers.update(activeDocument.identifier, label)
                  documentQueue.remove(activeStep.self, label)
                }}
              >
                <div className={classes.buttonTextBoxActive}>
                  {label}
                </div>
                <div className={classes.buttonStripe}></div>
              </div>
          }

          return(
            <CardWithPosition component={CardWithActive}/>
          )
        })}
    </Grid>
  )
}