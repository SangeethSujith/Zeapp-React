export function parseData(jsonData) {
  const transformedData = jsonData.reduce((result, item) => {
    const { grp_id, sub_grp_id, options, quid, sub_group_name, group_name } =
      item;
    // Find the group in the result array or create a new one if it doesn't exist
    let group = result.find((g) => g.grp_id === grp_id);
    if (!group) {
      group = {
        grp_id: grp_id,
        group_name: group_name,
        subgroups: [],
      };
      result.push(group);
    }

    // Find the sub-group in the group or create a new one if it doesn't exist
    let subgroup = group.subgroups.find((sg) => sg.sub_group_id === sub_grp_id);
    if (!subgroup) {
      subgroup = {
        sub_group_id: sub_grp_id,
        sub_group_name: sub_group_name,
        questions: [],
      };
      group.subgroups.push(subgroup);
    }

    // Add the question to the sub-group
    subgroup.questions.push({
      question_id: quid,
      options: options,
    });

    return result;
  }, []);

  return transformedData;
}
