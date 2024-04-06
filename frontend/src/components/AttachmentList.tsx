import { useState, useEffect } from "react";

import AttachmentCard from "./AttachmentCard";
import attachmentsData from "../dummy-attachments.json"; //attachmentsData will be an aray

// import axios from "axios";
// import config from "../../config.json";
import "../styles/Attachments.css";

interface AttachmentListProps {

  
}

interface Attachment {
  attachment_id: number;
  name: string;
  type: string;
  size: string;
  uploaded_by: string;
  uploaded_date: string;
}


export default function AttachmentList(props: AttachmentListProps) {

  const [attachmentList, setAttachmentList] = useState<Attachment[]>(
    []); //empty for now



  //handle state in parent component to track one selected employee only
  const [selectedAttachment, setSelectedAttachment] = useState<number | null>(
    null //null by default
  );

  //pass the set function down to EmployeeCard
  const handleAttachmentSelect = (attachmentId: number) => {
    setSelectedAttachment
    (
      attachmentId === selectedAttachment ? null : attachmentId
    );
  };


  const handleAttachmentDelete = (attachmentId: number) => {
    // Filter out the selected attachment from the attachment list
    const updatedAttachments = attachmentList.filter(
      (attachment) => attachment.attachment_id !== attachmentId
    );
    setAttachmentList(updatedAttachments);
    // If the selected attachment is deleted, clear the selection
    if (attachmentId === selectedAttachment) {
      setSelectedAttachment(null);
    }
  };


  // //GET request to retreive list of attachments from employee
  // useEffect(() => {
  //   axios
  //     .get(`${config.apiUrl}/EmployeeDashboard/AttachmentListAll`) //no endpoint yet for attachments
  //     .then((response) => {
  //       setAttachmentList(response.data);
  //       console.log(`AttachmentList: ${attachmentList}`);
  //     })
  //     .catch((error) => {
  //       //handle errors
  //       console.error("Errore making GET request", error.message);
  //     });
  // });

  //hardcoded for now
  useEffect(() => {
    // Set the attachment list when the component mounts
    setAttachmentList(attachmentsData.attachments);
  }, []); // Empty dependency array means this effect will run only once after the component mounts

  return (
    <div className="attachment-list">
 {attachmentList.map((attachment) => (
        <AttachmentCard
          key={attachment.attachment_id}
          attachName={attachment.name}
          attachNum={attachment.attachment_id}
          attachPath="./path"
          onSelect={handleAttachmentSelect}
          onDelete={handleAttachmentDelete} // Pass delete function to AttachmentCard
          isSelected={attachment.attachment_id === selectedAttachment}

        />
      ))}
    </div>
  );
}
