import Header from "../components/Header";
import ReviewFormList from "../components/ReviewFormList";

export default function EmployeeReviewFormPage() {
  return (
    <>
      <Header dashboard="Forms" />
      <div className="formSection">
        <div className="question-container">
          <ReviewFormList isEmployee={true} />
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
