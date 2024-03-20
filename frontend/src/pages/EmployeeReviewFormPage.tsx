import Header from "../components/Header";
import EmployeeFormRow from "../components/EmployeeFormRow";
import SubmitOrSignButton from "../components/SubmitOrSignButton";
import { useParams } from 'react-router-dom';


export default function EmployeeReviewFormPage() {

  const { employeeHID } = useParams();

  let questionNum: number = 1;

  return (
    <>
      <Header dashboard="Forms" />
      <div className="formSection">
        <div className="divide">
          <div className="question-card">
            <div className="form-header">
              <h1>Questions</h1>
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
            <SubmitOrSignButton formType="employee" status="" buttonType="submit"/>
            <SubmitOrSignButton formType="employee" status="" buttonType="sign"/>
          </div>
        </div>
      </div>
    </>
  );
}
