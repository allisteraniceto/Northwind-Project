import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";
import StarRanking from "../components/StarRanking";
import SelectedEmployee from "../components/SelectedEmployee";

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
          <SelectedEmployee EmployeeId={6} />
        </div>
        <div className="ratings-container">
          <div className="ratings">
            {
              <StarRanking
                formType="employee"
                readOnlyStarRanking={false}></StarRanking>
            }
          </div>
        </div>
        <div className="signature-submit-container">
          <p>
            By signing this review form, I acknowledge that I have reviewed the
            contents of this performance review and understand the feedback
            provided.
          </p>
          <div className="sign-submit-row">
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
      </div>
    </div>
  );
}
