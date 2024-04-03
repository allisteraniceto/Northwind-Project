import Header from "../components/Header";
import EmployeeFormRow from "../components/EmployeeFormRow";
import SubmitOrSignButton from "../components/SubmitOrSignButton";

export default function EmployeeReviewFormPage() {
  let questionNum: number = 1;

  return (
    <>
      <Header dashboard="Forms" />
      <div className="formSection">
        <div className="question-container">
          <div className="question-card">
            <div className="form-header">
              <h1>2024 REVIEW FORM</h1>
            </div>
            <div className="form-header-3">
              <h3>Current Responsibilites</h3>
            </div>
            <EmployeeFormRow
              questionNum={questionNum}
              formQuestion="Job description and/or Job highlights noting any significant changes"
            />
            <div className="form-header-3">
              <h3>Performance Review</h3>
            </div>
            <EmployeeFormRow
              questionNum={++questionNum}
              formQuestion="Evaluate performance and achieved goals"
            />
            <EmployeeFormRow
              questionNum={++questionNum}
              formQuestion="Discuss Areas of excellance or improvement"
            />
            <EmployeeFormRow
              questionNum={++questionNum}
              formQuestion="Discuss areas of development or improvement"
            />
            <EmployeeFormRow
              questionNum={++questionNum}
              formQuestion="Develop future goals with set expectation"
            />
            <SubmitOrSignButton
              formType="employee"
              status=""
              buttonType="submit"
            />
            <SubmitOrSignButton
              formType="employee"
              status=""
              buttonType="sign"
            />
          </div>
        </div>
        <div className="right-pane">
          <div className="employee-info">
            <p>Employee Info</p>
          </div>
          <div className="comments">
            <p>Ratings</p>
          </div>
        </div>
      </div>
    </>
  );
}
