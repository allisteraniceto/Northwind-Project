import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

type HandleBackClick = () => void;

interface BackButtonProps {
  handleBackClick: HandleBackClick;
}

export default function BackButton({ handleBackClick }: BackButtonProps) {
  return (
    <div onClick={handleBackClick} className="back-button">
      <IconContext.Provider value={{ size: "2em" }}>
        <IoArrowBackCircleOutline />
      </IconContext.Provider>
    </div>
  );
}
