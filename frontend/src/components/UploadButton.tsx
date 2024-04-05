import { useRef } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { IconContext } from "react-icons";

import "../styles/FormSection.css";

export default function UploadButton() {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    console.log("clicked!");
    hiddenFileInput.current?.click(); // ? optonal chaining, will throw error if null
  };

  return (
    <div onClick={handleClick} className="upload-button">
      <IconContext.Provider value={{ size: "2em" }}>
        <MdDriveFolderUpload />
        <span>upload</span>
        <input
          type="file"
          style={{ display: "none" }} //hide input to use react icon
          ref={hiddenFileInput} //reference to hidden input element
          //   onChange={handleOnChange}
        />{" "}
        {/*hide default file input*/}
      </IconContext.Provider>
    </div>
  );
}
