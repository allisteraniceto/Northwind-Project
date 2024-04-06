import "../styles/Attachments.css";
import "../styles/EmployeeList.css";
import "../styles/DownloadButton.css";
import "../styles/DeleteButton.css";
import DeleteButton from "./DeleteButton"; 
import DownloadButton from "./DownloadButton";

type HandleFunction = (employeeId: number) => void; //defined type here

interface AttachmentProps
 {
  attachName: string;
  attachPath: string;
  attachNum: number;
  onSelect: HandleFunction;
  isSelected: boolean;
  onDelete: HandleFunction; 
}

/*export default function AttachmentCard({
  attachNum,
  onSelect,
  isSelected,
  attachName,
  
}: AttachmentProps) {
  const handleClick = () => {
    onSelect(attachNum);
  };
*/

const AttachmentCard: React.FC<AttachmentProps> = ({
  attachName,
  attachNum,
 // onSelect,
  onDelete,
  isSelected,
  //attachPath,
}) => {
 // const handleClick = () => {
   // onSelect(attachNum);
  //};

  return (
    <div className={`attachment-card ${isSelected ? "clicked" : ""}`}>
      <div className="attachment-info">
        <p className="attachment-name">{attachName}</p>
      </div>
      <div className="action-buttons right-buttons">
        <DeleteButton onClick={() => onDelete(attachNum)} />
       <DownloadButton/>
      </div>
    </div>
  );
};

//attachPath={attachPath}

export default AttachmentCard; 
  //destructure AttachmentProps
 /* return (
    <div
      className={`attachment-card ${isSelected ? "clicked" : ""}`}
      onClick={handleClick}>
      <div className="employee-name">
        <p>{attachName}</p>
      </div>
      <div className="download-button">
        {/* insert download button component here */
  //    </div>
   // </div>
  //);

//}
