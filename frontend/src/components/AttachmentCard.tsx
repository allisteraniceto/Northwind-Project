import "../styles/Attachments.css";
import "../styles/EmployeeList.css";
import DeleteButton from "./DeleteButton";
import DownloadButton from "./DownloadButton";

type HandleFunction = (employeeId: number) => void; //defined type here

//need this for download button
// const currentYear = new Date().getFullYear();

interface AttachmentProps {
  attachName: string;
  attachNum: number;
  onSelect: HandleFunction;
  isSelected: boolean;
  onDelete: () => void; // Callback function to handle the delete action
  selectedYear: number;
}

export default function AttachmentCard({
  attachNum,
  onSelect,
  isSelected,
  attachName,
  onDelete,
  selectedYear,
}: AttachmentProps) {
  const handleClick = () => {
    onSelect(attachNum);
  };

  console.log(attachNum);

  //destructure AttachmentProps
  return (
    <div
      className={`attachment-card ${isSelected ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="employee-name">
        <p>{attachName}</p>
      </div>
      <div className="button-group">
        <DeleteButton
          onDelete={onDelete}
          attachmentNum={attachNum}
          attachmentName={attachName}
        />
        <DownloadButton
          attachmentId={attachNum}
          attachmentName={attachName}
          year={selectedYear}
        />
      </div>
    </div>
  );
}
