import { IconContext } from "react-icons";
import { CiTrash } from "react-icons/ci";
<CiTrash />

interface DeleteButtonProps {
  onDelete: () => void; // Callback function to handle the delete action
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  const handleClick = () => {
    onDelete();
  };

  return (
    <div className="delete-button" onClick={handleClick}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <CiTrash />
      </IconContext.Provider>
    </div>
  );
};

export default DeleteButton;
