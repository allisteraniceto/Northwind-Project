import { useState, useEffect } from "react";

import AttachmentCard from "./AttachmentCard";
import attachmentsData from "../dummy-attachments.json"; //attachmentsData will be an aray

import "../styles/Attachments.css";

interface Attachment {
  attachment_id: number;
  name: string;
  type: string;
  size: string;
  uploaded_by: string;
  uploaded_date: string;
}

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
            isSelected={attachment.attachment_id === selectedAttachment}
          />
        )
      )}
    </div>
  );
}
