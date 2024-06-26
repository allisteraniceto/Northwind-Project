import axios from "axios";
import config from "../../config.json";
import { IconContext } from "react-icons";
import { AiOutlineDownload } from "react-icons/ai";

interface DownloadButtonProps {
  attachmentId: number;
  attachmentName: string;
  year: number;
}

function DownloadButton({
  attachmentId,
  attachmentName,
  year,
}: DownloadButtonProps) {
  const downloadAttachment = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/Attachments/DownloadAttachment`,
        {
          params: {
            fileID: attachmentId,
            year: year,
          },
        }
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
        <AiOutlineDownload className="download-logo" />
      </IconContext.Provider>
    </div>
  );
}

export default DownloadButton;
