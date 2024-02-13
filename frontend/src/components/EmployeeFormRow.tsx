import Form from "./Form";
import "../styles/FormSection.css";

interface formTypeProp {
  formQuestion: String;
  questionNum: number;
}

export default function EmployeeFormRow(prop: formTypeProp) {
  return (
    <div className="questionRow">
      <div className="question">
        <p>{prop.formQuestion}</p>
      </div>
      <div className="formRow">
        <Form formType={"Employee Comments"} questionNum={prop.questionNum} readonly={false}/>
        <Form formType={"Manager Feedback"} questionNum={prop.questionNum} readonly={true} />
      </div>
    </div>
  );
}
