import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { IconContext } from "react-icons";
import axios from "axios";

import config from "../../config.json";

import "../styles/FormSection.css";

export default function Upload() {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState<string | undefined>();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault(); //prevent default behavior

    if (!file || !caption?.trim()) {
      window.alert("No file has been selected or file alias named");
      console.log("No file has been selected");
      return;
    }

    console.log("file LOG:", file);
    console.log("caption LOG:", caption);

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    //POST request to send uploaded to file to backend
    const postRequest = async () => {
      console.log("formData:", formData.get("caption"));
      console.log("formData:", formData.get("file"));
      try {
        const response = await axios.post(
          `${config.apiUrl}/Attachments/UploadAttachment`,
          formData,
          {
            params: {
              caption: caption,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
          // {
          //   onUploadProgress: (progressEvent) => {
          //     console.log(progressEvent.progress);
          //   },
          // }
        );
        console.log(response);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    postRequest();
  };

  const handleAlias = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setCaption(newInput);
    console.log(newInput);
  };

  //handle when file(s) are uploaded
  async function handleOnChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement & {
      files: FileList; //type File
    };
    console.log("target", target.files[0]);

    setFile(target.files[0]); //grab first file inside targe.files
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
