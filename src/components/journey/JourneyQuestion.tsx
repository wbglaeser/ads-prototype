import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { questionHeader, questionExplanation } from "components/styleguide"

import { DocumentQueue } from "states/documentQueueState"
import { ActiveStep } from "states/activeStepState"

const useStyles = makeStyles((theme) => ({
  questionBox: {
    minHeight: "12vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "0.8vw",
    marginBottom: "2vh"
  },
  question: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: questionHeader["fontFamily"],
    fontSize:  questionHeader["fontSize"],
    marginBottom: "1.5vh"
  },
  explanation: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: questionExplanation["fontFamily"],
    fontSize:  questionExplanation["fontSize"],
    lineHeight: 1.15,
    whiteSpace: "pre-wrap",
    marginBottom: "1.5vh"
  }
}));

export default function JourneyQuestion() {
  const classes = useStyles()
  let documentQueue = DocumentQueue.useContainer();
  let activeStep = ActiveStep.useContainer();
  let activeDocument = documentQueue.returnActiveDocument(activeStep.self)

  return (
    <div className={classes.questionBox}>
      <div className={classes.question}>
        {activeDocument.question}
      </div>
      <div className={classes.explanation}>
        {activeDocument.explanation}
      </div>
    </div>
);
}
