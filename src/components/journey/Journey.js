import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import JourneyStep from "./JourneyStep.js";
import Result from "./results/Results.js";

import { ActiveStep } from "./../states/activeStepState.js";

import decision_tree from "./documents/decisiontree_v2.json";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(6, 3, 6, 3),
      margin: theme.spacing(6, 3, 6, 3),
      width: "94%",
  },
}));

const initialiseDocumentQueue = () => {
  return decision_tree.filter(function (element) {
    return element.type === "default"
  })
}

const retrieveNonDefaultDocument = (identifier) => {
  let _newDoc = decision_tree.filter(function (element) {
    return element.identifier === identifier
  })
  return _newDoc[0]
}

export default function Journey(props) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [documentQueue, setDocumentQueue] = useState(initialiseDocumentQueue());
  const [stepTracker, setStepTracker] = useState(documentQueue.map(obj => obj.step_title));

  let activeStep = ActiveStep.useContainer();
  const [activeDocument, setActiveDocument] = useState(documentQueue[activeStep.activeStep]);


  {/* auxiliary functions */}
  const retrieveActiveIdentifier = (activeStep) => {
    return documentQueue[activeStep]["identifier"]
  }

  const retrieveSelectionLink = (label) => {
    return activeDocument["options"][label]
  }

  const insertNewDoc = (newDocumentIdentifier, documentQueue) => {
    let existingIdentifiers = documentQueue.map(obj => obj.identifier);
    if (!(existingIdentifiers.includes(newDocumentIdentifier.identifier))) {
      let newDocument = retrieveNonDefaultDocument(newDocumentIdentifier);
      documentQueue.splice(activeStep.activeStep+1, 0, newDocument);
      }
    return documentQueue
  }

  const removeNewDoc = (newDocumentIdentifier, documentQueue) => {
    return documentQueue.filter(function (el) {
      return el.identifier !== newDocumentIdentifier
    })
  }

  {/* state update functions */}
  const addDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveSelectionLink(label);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = insertNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  const removeDocumentQueue = (label) => {
    let _documentQueue = [...documentQueue];
    let newDocumentIdentifier = retrieveSelectionLink(label, activeDocument);
    if (!(newDocumentIdentifier === null)) {
      _documentQueue = removeNewDoc(newDocumentIdentifier, _documentQueue);
      setDocumentQueue(_documentQueue);
      updateStepTracker(_documentQueue);
    }
  }

  const updateStepTracker = (_documentQueue) => {
    setStepTracker(_documentQueue.map(obj => obj.step_title));
  }

  const updateActiveDocument = (activeStep) => {
    setActiveDocument(documentQueue[activeStep]);
  }

  const checkFinishLine = () => {
    if (activeStep.activeStep+2 > documentQueue.length) {
      setFinished(1)
      return true
    } else { return false }
  }

  return (
    <Grid container className={classes.mainSpace}>
      {
        !finished ?
          <div>
          <JourneyStep
          activeDocument={activeDocument}
          updateActiveDocument={updateActiveDocument}

          documentQueue={documentQueue}
          addDocumentQueue={addDocumentQueue}
          removeDocumentQueue={removeDocumentQueue}

          retrieveActiveIdentifier={retrieveActiveIdentifier}

          stepTracker={stepTracker}
          updateStepTracker={updateStepTracker}

          checkFinishLine={checkFinishLine}

          /></div>
        :
        <Result
        />
      }
    </Grid>

  );
}
