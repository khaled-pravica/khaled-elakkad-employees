export const parseFile = (fileContent) => {
  const contentRows = fileContent.trim().split("\n");
  const projectsObj = {};
  for (let row of contentRows) {
    const [employeeId, projectId, startDate, endDate] = row.trim().split(", ");
    projectsObj[projectId] = projectsObj[projectId]
      ? {
          ...projectsObj[projectId],
          [employeeId]: { startDate, endDate },
        }
      : { [employeeId]: { startDate, endDate } };
  }
  return projectsObj;
};
