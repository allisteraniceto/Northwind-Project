import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";
import StarRanking from "../components/StarRanking";
import StatusPane from "../components/StatusPane";

import "../styles/FormPage.css";

export default function ManagerReviewFormPage() {
  return (
    <div>
      <Header />
      <div className="page-review-form">
        <div className="question-container">
          <FormList isEmployee={false} />
        </div>
        <div className="employee-info-container">
          <StatusPane email="john.doe@gmail.com" />
        </div>
        <div className="ratings-container">
          <div className="ratings">
            {<StarRanking formType="manager" readOnlyStarRanking={true}></StarRanking>}
          </div>
        </div>
        <div className="signature-submit-container">
          <p>Signature and Submit</p>
          <SubmitOrSignButton
            formType="manager"
            status=""
            buttonType="submit"
          />
          <SubmitOrSignButton formType="manager" status="" buttonType="sign" />
        </div>
      </div>
    </div>
  );
}
