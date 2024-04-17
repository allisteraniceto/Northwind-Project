import Status from "./Status";
import CorgiGif from "/cool-corgi.gif";
import CompleteCount from "./CompleteCount";
import Employees from "../dummy-employees.json";

import "../styles/EmployeeList.css";

type HandleEmployeeSelect = (employeeID: number) => void;

interface EmployeeCardProps {
  employee: String;
  employeeHID: number;
  key: number;
  status: boolean;
  isSelected: boolean;
  cardType: string;
  onSelect: HandleEmployeeSelect;
}

export default function EmployeeCard({
  employee,
  onSelect,
  isSelected,
  employeeHID,
  cardType,
}: EmployeeCardProps) {
  //handle click state
  const handleClick = () => {
    onSelect(employeeHID);
  };

  //will replace with GET REQUEST
  const employeeFind = Employees.employees.find(
    (emp) => emp.employee_id === employeeHID
  );
  const headshot = employee ? `${employeeFind?.headshot}` : CorgiGif;

  return (
    <div
      className={`employee-card ${isSelected ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="headshot-container">
        <img className="headshot-card" src={headshot} alt={"User Headshot"} />
      </div>
      <div className="employee-name">
        <p>{employee}</p>
      </div>
      <div className="status">
        {cardType === "EmployeeList" ? (
          <Status employeeHID={employeeHID} />
        ) : (
          <CompleteCount managerHID={employeeHID} />
        )}
      </div>
    </div>
  );
}
