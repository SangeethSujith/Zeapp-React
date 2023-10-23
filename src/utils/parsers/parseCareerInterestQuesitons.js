export const parseCareerInterestQuestions = (data) => {
  return data.reduce((groupedData, item) => {
    const srl_no = item.srl_no;
    const option = { desc: item.desc, option: item.option };

    if (!groupedData[srl_no]) {
      groupedData[srl_no] = { srl_no, options: [] };
    }

    groupedData[srl_no].options.push(option);

    return groupedData;
  }, {});
};
