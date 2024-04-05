import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";

export default function EmployeeReviewFormPage() {
  return (
    <>
      <Header dashboard="Forms" />
      <div className="formSection">
        <div className="question-container">
          <FormList isEmployee={true} />
        </div>
        <div className="right-side">
          <div className="employee-info-container">
            <p>Employee Info</p>
          </div>
          <div className="ratings-container">
            <p>Ratings</p>
          </div>
          <div className="signature-submit-container">
            <p>Signature and Submit</p>
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
    </>
  );
}
