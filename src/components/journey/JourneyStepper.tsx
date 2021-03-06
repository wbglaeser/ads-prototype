import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import { colorMain } from "components/styleguide"

import { DocumentQueue } from "states/documentQueueState"
import { ActiveStep } from "states/activeStepState";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: colorMain["115"],
    },
  },
  completed: {
    '& $line': {
      borderColor: colorMain["115"],
    },
  },
  line: {
    borderColor: colorMain["115"],
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: colorMain["45"],
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: colorMain["115"],
  },
  circle: {
    width: "2vh",
    height: "2vh",
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: colorMain["115"],
    zIndex: 1,
    fontSize: "3.5vh",
  },
});

type QontoStepIconProps = {
   active: boolean,
   completed: boolean
};

function QontoStepIcon(props: QontoStepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: colorMain["15"],
    width: '100%',
    position: "absolute",
    left: "-100vw",
    right: "-100vw",
    margin: "auto",

  },
}));

export default function CustomizedStepper() {
  const classes = useStyles();
  let activeStep = ActiveStep.useContainer();
  let documentQueue = DocumentQueue.useContainer();
  let steps = documentQueue.extractStepTitles()
  let activeDefaultStep = documentQueue.activeDefaultStep(activeStep.self);

  return (
      <Stepper alternativeLabel activeStep={activeDefaultStep} connector={<QontoConnector />} className={classes.root}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}
