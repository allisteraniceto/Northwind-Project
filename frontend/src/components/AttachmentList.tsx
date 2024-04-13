import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import AttachmentCard from "./AttachmentCard";
import attachmentsData from "../dummy-attachments.json"; //attachmentsData will be an aray

// import axios from "axios";
// import config from "../../config.json";
import "../styles/Attachments.css";

interface Attachment {
  attachment_id: number;
  name: string;
  type: string;
  size: string;
  uploaded_by: string;
  uploaded_date: string;
}
const currentYear = new Date().getFullYear();

export default function AttachmentList() {
  const [attachmentList, setAttachmentList] = useState<Attachment[]>(
    [] //empty for now
  );

  //handle state in parent component to track one selected employee only
  const [selectedAttachment, setSelectedAttachment] = useState<number | null>(
    null //null by default
  );

  //pass the set function down to EmployeeCard
  const handleAttachmentSelect = (attachmentId: number) => {
    setSelectedAttachment(
      attachmentId === selectedAttachment ? null : attachmentId
    );
  };

  const handleAttachmentDelete = async (
    attachmentId: number,
    filename: string
  ) => {
    try {
      const updatedAttachmentList = attachmentList.filter(
        (attachment) => attachment.attachment_id !== attachmentId
      );
      setAttachmentList(updatedAttachmentList);
      console.log(attachmentList);
      // If the selected attachment is deleted, clear the selection
      if (attachmentId === selectedAttachment) {
        setSelectedAttachment(null);
      }

      //DELETE attachment in backend later (for now)
      await axios.post(`${config.apiUrl}/Attachments/DeleteAttachment`, {
        params: {
          year: currentYear,
          attachmentName: filename,
        },
      });
    } catch (error) {
      console.error("Error deleting attachment:", error);
    }
  };

  //GET request to retreive list of attachments from employee
  useEffect(() => {
    const getAllAttachments = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/Attachments/GetAllAttachments`,
          {}
        ); //no endpoint yet for attachments
        setAttachmentList(response.data);
        console.log(`AttachmentList: ${attachmentList}`);
        getAllAttachments();
      } catch (error) {
        //handle errors
        console.error("Errore making GET request", error);
      }
    };
  }, []);

  //hardcoded for now
  useEffect(() => {
    // Set the attachment list when the component mounts
    setAttachmentList(attachmentsData.attachments);
  }, []); // Empty dependency array means this effect will run only once after the component mounts

  return (
    <div className="attachment-list">
      {attachmentList.map(
        //use array map method to iterate through json onject
        (attachment) => (
          <AttachmentCard
            attachName={attachment.name}
            attachNum={attachment.attachment_id}
            attachPath="./path"
            onSelect={handleAttachmentSelect} //pass click handle function to get selected ID
            onDelete={() =>
              handleAttachmentDelete(attachment.attachment_id, attachment.name)
            }
            isSelected={attachment.attachment_id === selectedAttachment}
          />
        )
      )}
    </div>
  );
}
