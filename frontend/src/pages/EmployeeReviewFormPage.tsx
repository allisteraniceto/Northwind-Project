import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";
import StarRanking from "../components/StarRanking";
import StatusPane from "../components/StatusPane";

import "../styles/FormPage.css";
import "../styles/FormSection.css";

export default function EmployeeReviewFormPage() {
  // props.setReviewForm(true); //set reviewForm prop to true
  return (
    <div>
      <Header />
      <div className="page-review-form">
        <div className="question-container">
          <FormList isEmployee={true} />
        </div>
        <div className="employee-info-container">
          <StatusPane status="Opened" email="john.doe@gmail.com" />
        </div>
        <div className="ratings-container">
          <div className="ratings">
            {<StarRanking formType="employee" readOnlyStarRanking={0}></StarRanking>}
            {<StarRanking formType="manager" readOnlyStarRanking={1}></StarRanking>}
          </div>
        </div>
        <div className="signature-submit-container">
          <p>Signature and Submit</p>
          <SubmitOrSignButton
            formType="employee"
            status=""
            buttonType="submit"
          />
          <SubmitOrSignButton formType="employee" status="" buttonType="sign" />
        </div>
      </div>
    </div>
  );
}
