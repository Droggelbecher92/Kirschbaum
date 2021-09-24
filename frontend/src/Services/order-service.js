export const orderMultiAnswers = (givenAnswers, possibleAnswersInOrder) => {
  let answersInOrder = ''
  for (let i = 0; i < possibleAnswersInOrder.length; i++) {
    for (let k = 0; k < givenAnswers.length; k++) {
      if (possibleAnswersInOrder[i] === givenAnswers[k]) {
        answersInOrder += givenAnswers[k] + ' '
      }
    }
  }
  return answersInOrder
}
