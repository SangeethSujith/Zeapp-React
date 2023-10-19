export function parseData(jsonData) {
    // Initialize an array to store the parsed data
    const parsedData = [];

    // Loop through each item in the JSON array
    jsonData.forEach((item) => {
      // Extract relevant information
      const groupId = item.grp_id;
      const groupName = item.group_name;
      const subgroupId = item.sub_grp_id;
      const subGroupName = item.sub_group_name;
      const questionId = item.quid;
      const options = item.options;

      // Check if the group exists in the parsed data
      const groupIndex = parsedData.findIndex(
        (group) => group.grp_id === groupId
      );

      // If the group doesn't exist, add it
      if (groupIndex === -1) {
        parsedData.push({
          grp_id: groupId,
          group_name: groupName,
          subgroups: [
            {
              sub_group_id: subgroupId,
              sub_group_name: subGroupName,
              questions: [
                {
                  question_id: questionId,
                  options: options,
                },
              ],
            },
          ],
        });
      } else {
        // Check if the subgroup exists in the group
        const subgroupIndex = parsedData[groupIndex].subgroups.findIndex(
          (subgroup) => subgroup.sub_group_id === subgroupId
        );

        // If the subgroup doesn't exist, add it
        if (subgroupIndex === -1) {
          parsedData[groupIndex].subgroups.push({
            sub_group_id: subgroupId,
            sub_group_name: subGroupName,
            questions: [
              {
                question_id: questionId,
                options: options,
              },
            ],
          });
        } else {
          // Add the question to the existing subgroup
          parsedData[groupIndex].subgroups[subgroupIndex].questions.push({
            question_id: questionId,
            options: options,
          });
        }
      }
    });

    return parsedData;
  }