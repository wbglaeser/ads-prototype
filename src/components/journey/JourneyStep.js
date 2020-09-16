import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import JourneyQuestion from "./JourneyQuestion.js";
import JourneySelection from "./JourneySelection.js";
import JourneyNavigation from "./JourneyNavigation.js";
import HorizontalLinearStepper from "./JourneyStepper.js";

const useStyles = makeStyles((theme) => ({
  stepContent: {
    width: "100%"
  }
}));

export default function JourneyStep(props) {
  const classes = useStyles();
  const [stepAnswers, setStepAnswers] = useState([]);

  {/* auxiliary functions */}
  const itemFromDocument = (item) => {
    return props.activeDocument[item]
  }

  const optionsFromDocument = () => {
    return Object.keys(props.activeDocument["options"])
  }

  {/* state update functions */}
  const initialiseStepAnswers = (identifier) => {
    if (props.answers.hasOwnProperty(identifier)) {
      let _stepAnswers = props.answers[identifier];
      setStepAnswers(_stepAnswers);
    } else {setStepAnswers([])}
  }

  const updateStepAnswers = (label) => {
    let _stepAnswers = [...stepAnswers];
    if (!(_stepAnswers.includes(label))) {
      _stepAnswers.push(label);
    } else {
      _stepAnswers = _stepAnswers.filter(function(e) {return e !== label})
    }
    setStepAnswers(_stepAnswers)
  }

  {/* Action functions */}
  const updateStepButton = (direction) => {
    if (direction === "next") {
      props.increaseStep();
      props.updateActiveDocument(props.activeStep+1);
      initialiseStepAnswers(props.retrieveActiveIdentifier(props.activeStep+1))
    } else if (direction === "back") {
      props.decreaseStep();
      props.updateActiveDocument(props.activeStep-1);
      initialiseStepAnswers(props.retrieveActiveIdentifier(props.activeStep-1))
    }
    props.updateFinishLine(props.documentQueue.length);
    props.updateAnswers(itemFromDocument("identifier"), stepAnswers);
  }

  const updateStepStepper = (index) => {
    props.updateAnswers(itemFromDocument("identifier"), stepAnswers);
    props.setActiveStep(index);
    props.updateActiveDocument(index);
    initialiseStepAnswers(props.retrieveActiveIdentifier(index))
  }

  return (

    <div className={classes.stepContent}>

      <JourneyQuestion
        question={itemFromDocument("question")}
        explanation={itemFromDocument("explanation")}
      />

      <JourneySelection
        options={optionsFromDocument()}
        stepAnswers={stepAnswers}
        updateStepAnswers={updateStepAnswers}
        addDocumentQueue={props.addDocumentQueue}
        removeDocumentQueue={props.removeDocumentQueue}
      />

      <JourneyNavigation
        activeStep={props.activeStep}
        updateStep={updateStepButton}
      />

      <HorizontalLinearStepper
        activeStep={props.activeStep}
        updateStep={updateStepStepper}
        steps={props.stepTracker}
      />

    </div>
  );
}