import FormRow from "./FormRow";

import UploadButton from "./UploadButton";

import "../styles/FormSection.css";

interface ReviewFormListProps {
  isEmployee: boolean;
  

}

export default function ReviewFormList(props: ReviewFormListProps) {
  const questions = [
    //review form questions
    "Job description and/or Job highlights noting any significant changes",
    "Evaluate performance and achieved goals",
    "Discuss Areas of excellence or improvement",
    "Discuss areas of development or improvement",
    "Develop future goals with set expectations",
  ];

  return (
    <>
      <div className="question-pane">
        <div className="form-header">

       <h1>Review Form</h1>
        
        </div>
        <div className="review-form-list">
          <div className="form-header-3">
            <h3>Current Responsibilites</h3>
          </div>
          {questions.map((question, index) => (
            <FormRow
              questionNum={index + 1}
              formQuestion={question}
              isEmployee={props.isEmployee}
            />
          ))}
        </div>
        <UploadButton />
      </div>
    </>
  );
}
