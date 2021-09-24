export const activateSubmitQuestion = (credentials, answers) => {
  if (
    credentials.question === '' ||
    credentials.categoryName === '' ||
    credentials.topicName === ''
  ) {
    return false
  }
  const type = credentials.type
  if (type === 'THUMB') {
    if (credentials.solution !== '') {
      return true
    }
  } else if (type === 'SINGLE') {
    if (
      credentials.solution !== '' &&
      credentials.answer1 !== '' &&
      credentials.answer2 !== '' &&
      credentials.answer3 !== '' &&
      credentials.answer4 !== ''
    ) {
      if (
        credentials.solution === credentials.answer1 ||
        credentials.solution === credentials.answer2 ||
        credentials.solution === credentials.answer3 ||
        credentials.solution === credentials.answer4
      ) {
        return true
      }
    }
  } else if (type === 'MULTI') {
    if (
      credentials.solution !== '' &&
      credentials.answer1 !== '' &&
      credentials.answer2 !== '' &&
      credentials.answer3 !== '' &&
      credentials.answer4 !== ''
    ) {
      if (answers.length > 0) {
        return true
      }
    }
  } else {
    return false
  }
}
