import "../styles/Attachments.css";
import "../styles/EmployeeList.css";

import DeleteButton from './DeleteButton';
import "../styles/DeleteButton.css";
type HandleFunction = (employeeId: number) => void; //defined type here

interface AttachmentProps {
  attachName: string;
  attachPath: string;
  attachNum: number;
  onSelect: HandleFunction;
  isSelected: boolean;

  onDelete: (attachmentId: number) => void; 
}

export default function AttachmentCard({
  attachNum,
  onSelect,
  isSelected,
  attachName,

  onDelete, // Included onDelete prop
}: AttachmentProps) {
  const handleClick = () => {
    onSelect(attachNum);
  };

  return (
    <div className={`attachment-card ${isSelected ? "clicked" : ""}`} onClick={handleClick}>
      <div className="employee-name">
        <p>{attachName}</p>
      </div>
      <div className="action-buttons">
        {/* Add the DeleteButton component here */}
        <DeleteButton onClick={() => onDelete(attachNum)} />
      </div>
    </div>
  );
}