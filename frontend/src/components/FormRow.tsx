import Form from "./Form";
import "../styles/FormSection.css";

interface formTypeProp {
  formQuestion: String;
  questionNum: number;
}

export default function FormRow(prop: formTypeProp) {
  return (
    <div className="questionRow">
      <div className="question">
        <h3>{prop.formQuestion}</h3>
      </div>
      <div className="formRow">
        <Form formType={"Employee Comments"} questionNum={prop.questionNum} />
        <Form formType={"Manager Feedback"} questionNum={prop.questionNum} />
      </div>
    </div>
  );
}
