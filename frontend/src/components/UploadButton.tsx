import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { IconContext } from "react-icons";
import axios from "axios";

import config from "../../config.json";

import "../styles/FormSection.css";

export default function UploadButton() {
  const [file, setFile] = useState<string | File | undefined>();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault(); //prevent default behavior

    if (typeof file === "undefined") {
      console.log("No file has been selected");
      return;
    }

    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);

    //POST request to send uploaded to file to backend
    axios
      .post(`${config.apiUrl}/Attachments/UploadAttachment`, formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.progress);
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  //handle when file(s) are uploaded
  async function handleOnChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement & {
      files: FileList; //type File
    };

    setFile(target.files[0]); //grab first file inside targe.files
    console.log("target", file);
  }

  return (
    <div className="upload-row">
      <input type="file" onChange={handleOnChange} />
      <div onClick={handleClick} className="upload-button">
        <IconContext.Provider value={{ size: "2em" }}>
          <MdDriveFolderUpload />
          <span>upload</span>
        </IconContext.Provider>
      </div>
    </div>
  );
}
