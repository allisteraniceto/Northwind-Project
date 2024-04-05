
import trashcan from '../assets/trash.png'; // Import the trashcan image
import '../styles/DeleteButton.css'; // Import the CSS file

interface DeleteButtonProps {
    onClick: () => void; // Define the onClick function
  }
  
  const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
    return (
      <button className="button" onClick={onClick}>
        <img src={trashcan} alt="Trashcan" className="image" />
      </button>
    );
  };
  
  export default DeleteButton;