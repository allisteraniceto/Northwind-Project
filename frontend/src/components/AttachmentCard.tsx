import "../styles/Attachments.css";
import "../styles/EmployeeList.css";

type HandleFunction = (employeeId: number) => void; //defined type here

interface AttachmentProps {
  attachName: string;
  attachPath: string;
  attachNum: number;
  onSelect: HandleFunction;
  isSelected: boolean;
}

export default function AttachmentCard({
  attachNum,
  onSelect,
  isSelected,
  attachName,
}: AttachmentProps) {
  const handleClick = () => {
    onSelect(attachNum);
  };

  //destructure AttachmentProps
  return (
    <div
      className={`attachment-card ${isSelected ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="employee-name">
        <p>{attachName}</p>
      </div>
      <div className="download-button">
        {/* insert download button component here */}
      </div>
    </div>
  );
}
