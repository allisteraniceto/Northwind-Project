import { useState } from "react";

import Form from "./Form";
import "../styles/FormSection.css";

interface formTypeProp {
  formQuestion: String;
  isEmployee: boolean;
  questionNum: number;
}

export default function FormRow(prop: formTypeProp) {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const handleExpand = (formType: string) => {
    setSelectedForm(selectedForm === formType ? null : formType);
  };
  return (
    <div className="questionRow">
      <div className="question">
        <p>{prop.formQuestion}</p>
      </div>
      <div className="formRow">
        <Form
          formType={"Employee Comments"}
          questionNum={prop.questionNum}
          readonly={prop.isEmployee ? false : true} //if employee, can write
          onExpand={handleExpand}
          isExpanded={"Employee Comments" === selectedForm}
        />
        <Form
          formType={"Manager Feedback"}
          questionNum={prop.questionNum}
          readonly={prop.isEmployee ? true : false} //if employee, read only for manager section
          onExpand={handleExpand}
          isExpanded={"Manager Feedback" == selectedForm}
        />
      </div>
    </div>
  );
}
