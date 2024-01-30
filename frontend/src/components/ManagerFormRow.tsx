import Form from "./Form";
import "../styles/FormSection.css";

interface formTypeProp {
  formQuestion: String;
  questionNum: number;
}

export default function ManagerFormRow(prop: formTypeProp) {
  return (
    <div className="questionRow">
      <div className="question">
        <p>{prop.formQuestion}</p>
      </div>
      <div className="formRow">
        <Form formType={"Employee Comments"} questionNum={prop.questionNum} readonly={true}/>
        <Form formType={"Manager Feedback"} questionNum={prop.questionNum} readonly={false} />
      </div>
    </div>
  );
}
