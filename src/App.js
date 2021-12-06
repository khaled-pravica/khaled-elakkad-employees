import { useEffect, useState } from "react";
import FileInput from "./components/FileInput";
import { parseFile } from "./utils";

function App() {
  const [fileContent, setFileContent] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    if (fileContent) {
      const parsedContent = parseFile(fileContent);
      let tempResult = {
        employee1: null,
        employee2: null,
        project: null,
        intersectionTime: 0,
      };

      for (let project in parsedContent) {
        const sortedEmployeesByJoinDate = Object.keys(
          parsedContent[project]
        ).sort((a, b) => {
          const startDateA = parsedContent[project][a].startDate;
          const startDateB = parsedContent[project][b].startDate;

          if (startDateA < startDateB) {
            return -1;
          }
          if (startDateA > startDateB) {
            return 1;
          }
          return 0;
        });

        for (let i = 0; i < sortedEmployeesByJoinDate.length - 1; i++) {
          let thisEmployee = sortedEmployeesByJoinDate[i],
            nextEmployee = sortedEmployeesByJoinDate[i + 1];

          let thisEmployeeEndDate = new Date(
              parsedContent[project][thisEmployee].endDate
            ),
            nextEmployeeStartDate = new Date(
              parsedContent[project][nextEmployee].startDate
            );

          let intersection =
            thisEmployeeEndDate.getTime() - nextEmployeeStartDate.getTime();

          if (intersection > tempResult.intersectionTime) {
            tempResult = {
              employee1: thisEmployee,
              employee2: nextEmployee,
              project,
              intersectionTime: intersection,
            };
          }
        }
      }
      setResult({
        employee1: tempResult.employee1,
        employee2: tempResult.employee2,
        project: tempResult.project,
        days: tempResult.intersectionTime / (1000 * 3600 * 24),
      });
    } else {
      setResult(null);
    }
  }, [fileContent]);

  return (
    <div className="App">
      <h1>Project Teammates</h1>
      <FileInput setFileContent={setFileContent} />
      {result && (
        <table>
          <tbody>
            <tr>
              <th>Employee ID #1</th>
              <th>Employee ID #2</th>
              <th>Project ID</th>
              <th>Days worked</th>
            </tr>
            <tr>
              <td>{result.employee1}</td>
              <td>{result.employee2}</td>
              <td>{result.project}</td>
              <td>{result.days}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
