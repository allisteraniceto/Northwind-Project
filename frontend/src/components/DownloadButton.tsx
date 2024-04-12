import React from "react";
import axios from "axios";
import config from "../../config.json";
import { IconContext } from "react-icons";
import { AiOutlineDownload } from "react-icons/ai";

interface DownloadButtonProps {
  attachmentId: number;
  attachmentName: string;
  year: number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  attachmentId,
  attachmentName,
  year,
}) => {
  const downloadAttachment = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/Attachments/DownloadAttachment`,
        {
          attachmentId: attachmentId,
          attachmentName: attachmentName,
          year: year,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", attachmentName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  return (
    <div className="download-button" onClick={downloadAttachment}>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <AiOutlineDownload />
      </IconContext.Provider>
    </div>
  );
};

export default DownloadButton;
