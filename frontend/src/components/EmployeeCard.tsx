import StatusIcon from "./statusicon";
import CorgiGif from "/cool-corgi.gif";
import CompleteCount from "./CompleteCount";

import "../styles/EmployeeList.css";

interface EmployeeCardProps {
  employee: String;
  employeeHID: number;
  key: number;
  status: Boolean;
  onSelect: any;
  isSelected: any;
  cardType: string;
  managerHID?: number;
}

export default function EmployeeCard({
  employee,
  onSelect,
  isSelected,
  employeeHID,
  cardType,
  managerHID,
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
          <CompleteCount managerHID={managerHID} />
        )}
      </div>
    </div>
  );
}
