import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import AttachmentCard from "./AttachmentCard";
// import attachmentsData from "../dummy-attachments.json"; //attachmentsData will be an aray

// import axios from "axios";
// import config from "../../config.json";
import "../styles/Attachments.css";

interface Attachment {
  [key: number]: string;
}
// const currentYear = new Date().getFullYear();

interface AttachmentListProps {
  selectedYear: number;
}

export default function AttachmentList({
  selectedYear, //default = current year
}: AttachmentListProps) {
  const [attachmentList, setAttachmentList] = useState<Attachment>({});

  //handle state in parent component to track one selected employee only
  const [selectedAttachment, setSelectedAttachment] = useState<number | null>(
    null //null by default
  );

  //GET request to retreive list of attachments from employee
  useEffect(() => {
    const getAllAttachments = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/Attachments/GetAllAttachments`,
          {
            params: {
              year: selectedYear,
            },
          }
        ); //no endpoint yet for attachments
        console.log("response:", response.data);
        setAttachmentList(response.data);
        // console.log(`AttachmentList: ${attachmentList}`);
      } catch (error) {
        //handle errors
        console.error("Error making GET request:", error);
        setAttachmentList({});
      }
    };
    getAllAttachments();
  }, [selectedYear]);

  //pass the set function down to EmployeeCard
  const handleAttachmentSelect = (attachmentId: number) => {
    setSelectedAttachment(
      attachmentId === selectedAttachment ? null : attachmentId
    );
  };

  const handleAttachmentDelete = async (
    attachmentId: number,
    fileID: number
  ) => {
    try {
      console.log("before delete", attachmentList);
      const updatedAttachmentList = { ...attachmentList };
      delete updatedAttachmentList[attachmentId];
      setAttachmentList(updatedAttachmentList);
      console.log("after delete", attachmentList);

      // If the selected attachment is deleted, clear the selection
      if (attachmentId === selectedAttachment) {
        setSelectedAttachment(null);
      }

      console.log("selectedYear", selectedYear);
      //DELETE attachment in backend later (for now)
      const response = await axios.delete(
        `${config.apiUrl}/Attachments/DeleteAttachment`,
        {
          params: {
            year: selectedYear,
            fileID: fileID,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting attachment:", error);
    }
  };

  // //hardcoded for now
  // useEffect(() => {
  //   // Set the attachment list when the component mounts
  //   setAttachmentList(attachmentsData.attachments);
  // }, []); // Empty dependency array means this effect will run only once after the component mounts

  return (
    <div className="attachment-list">
      {Object.entries(attachmentList).map(([key, value]) => (
        <AttachmentCard
          attachName={value}
          attachNum={parseInt(key)}
          onSelect={handleAttachmentSelect} //pass click handle function to get selected ID
          onDelete={() => handleAttachmentDelete(parseInt(key), parseInt(key))}
          isSelected={parseInt(key) === selectedAttachment}
          selectedYear={selectedYear}
        />
      ))}
    </div>
  );
}
