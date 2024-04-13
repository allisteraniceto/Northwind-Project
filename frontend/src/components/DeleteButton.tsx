import { IconContext } from "react-icons";
import { CiTrash } from "react-icons/ci";
<CiTrash />;

interface DeleteButtonProps {
  onDelete: (attachmentNum: number, filename: string) => void; // Callback function to handle the delete action
  attachmentNum: number;
  attachmentName: string;
}

function DeleteButton({
  onDelete,
  attachmentNum,
  attachmentName,
}: DeleteButtonProps) {
  const handleClick = () => {
    onDelete(attachmentNum, attachmentName);
  };

  return (
    <div className="delete-button" onClick={handleClick}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <CiTrash className="trash-logo" />
      </IconContext.Provider>
    </div>
  );
}

export default DeleteButton;
