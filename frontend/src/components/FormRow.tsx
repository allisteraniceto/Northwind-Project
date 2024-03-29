import Form from "./Form";
import "../styles/FormSection.css";

interface formTypeProp {
  formQuestion: String;
  isEmployee: boolean;
  questionNum: number;
}

export default function FormRow(prop: formTypeProp) {
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
        />
        <Form
          formType={"Manager Feedback"}
          questionNum={prop.questionNum}
          readonly={prop.isEmployee ? true : false} //if employee, read only for manager section
        />
      </div>
    </div>
  );
}
