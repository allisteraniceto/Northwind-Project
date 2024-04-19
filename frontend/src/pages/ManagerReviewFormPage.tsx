import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";

export default function ManagerReviewFormPage() {
  return (
    <div>
      <Header />
      <div className="page-review-form">
        <div className="question-container">
          <FormList isEmployee={false} />
        </div>
        <div className="employee-info-container">
          <p>Employee Info</p>
        </div>
        <div className="ratings-container">
          <p>Ratings</p>
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
