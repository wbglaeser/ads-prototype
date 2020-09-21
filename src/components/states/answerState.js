import { createContainer } from 'unstated-next';
import { useState } from 'react';

function useAnswers(initialState = {}) {
  let [self, setAnswers] = useState(initialState)

  let keys = () => Object.keys(self)

  let update = (identifier, label) => {
    let _answers = {...self}
    if (self.hasOwnProperty(identifier)) {
      if (_answers[identifier].includes(label)) {
        const index = _answers[identifier].indexOf(label)
        _answers[identifier].splice(index, 1)
      } else { _answers[identifier].push(label) }
    } else {
      _answers[identifier] = [label]
    }
    setAnswers(_answers);
  }

  let initialiseStep = (identifier) => {
    if (Object.keys(self).includes(identifier)) {
      return self[identifier]
    } else { return [] }
  }

  return { self, update, initialiseStep, keys }
}
export const Answers = createContainer(useAnswers)
