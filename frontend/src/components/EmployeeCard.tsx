import StatusIcon from "./StatusIcon";
import CorgiGif from "/cool-corgi.gif";
import CompleteCount from "./CompleteCount";

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

  return (
    <div
      className={`employee-card ${isSelected ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="headshot-container">
        <img className="headshot-card" src={CorgiGif} alt="User Headshot" />
      </div>
      <div className="employee-name">
        <p>{employee}</p>
      </div>
      <div className="status">
        {cardType === "EmployeeList" ? (
          <StatusIcon employeeHID={employeeHID} />
        ) : (
          <CompleteCount managerHID={employeeHID} />
        )}
      </div>
    </div>
  );
}
