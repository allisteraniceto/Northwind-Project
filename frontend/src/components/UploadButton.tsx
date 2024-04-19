import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { IconContext } from "react-icons";
import axios from "axios";

import config from "../../config.json";

import "../styles/FormSection.css";

export default function UploadButton() {
  const [file, setFile] = useState<string | File | undefined>();
  const [fileAlias, setFileAlias] = useState<string | undefined>();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault(); //prevent default behavior

    if (!file || !fileAlias?.trim()) {
      window.alert("No file has been selected or file alias named");
      console.log("No file has been selected");
      return;
    }

    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("alias", fileAlias);

    //POST request to send uploaded to file to backend
    const postRequest = async () => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/Attachments/UploadAttachment`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              console.log(progressEvent.progress);
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    postRequest();
  };

  const handleAlias = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setFileAlias(newInput);
    console.log(newInput);
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
      <p>Caption: </p>
      <input
        type="text"
        className="alias"
        maxLength={50}
        required
        onChange={handleAlias}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={handleOnChange}
        className="choose-file"
      />

      <div onClick={handleClick} className="upload-button">
        <IconContext.Provider value={{ size: "2em" }}>
          <MdDriveFolderUpload />
          <span>upload</span>
        </IconContext.Provider>
      </div>
    </div>
  );
}
