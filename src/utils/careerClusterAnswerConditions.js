export function countAnsweredQuestions(answerData) {
  const uniqueGroupIds = new Set(answerData.map((answer) => answer.group_id));
  return uniqueGroupIds.size;
}
export function checkIfOneAnsweredPerSubgroup(answerData, questionData) {
  const answered = questionData.every((group) => {
    const { grp_id, subgroups } = group;

    return subgroups.every((subgroup) => {
      return subgroup.questions.some((question) => {
        return answerData.some(
          (answer) =>
            answer.group_id === grp_id &&
            answer.option_id === question.question_id
        );
      });
    });
  });

  return answered;
}
