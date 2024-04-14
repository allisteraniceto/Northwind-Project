import { useEffect } from "react";

import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";
import StarRanking from "../components/StarRanking";
import StatusPane from "../components/StatusPane";

import "../styles/FormPage.css";

type HandleFunction = (isReviewForm: boolean) => void;
interface EmployeeReviewFormProps {
  setReviewForm: HandleFunction;
}

export default function EmployeeReviewFormPage(props: EmployeeReviewFormProps) {
  useEffect(() => {
    //set ReviewForm to true when component mounts
    props.setReviewForm(true);
    return () => {
      // Set reviewFormPage to false when unmounting the component
      props.setReviewForm(false);
    };
  }, []);

  // props.setReviewForm(true); //set reviewForm prop to true
  return (
    <>
      <Header dashboard="Forms" />
      <div className="question-container">
        <FormList isEmployee={true} />
      </div>
      <div className="employee-info-container">
        <p>Employee Info</p>
        <StatusPane status="Opened" email="john.doe@gmail.com" />
      </div>
      <div className="ratings-container">
      <div className="ratings">
          {<StarRanking formType="employee" readOnlyStarRanking={1}></StarRanking>}
          {<StarRanking formType="manager" readOnlyStarRanking={0}></StarRanking>}
        </div>
      </div>
      <div className="signature-submit-container">
        <p>Signature and Submit</p>
        <SubmitOrSignButton formType="employee" status="" buttonType="submit" />
        <SubmitOrSignButton formType="employee" status="" buttonType="sign" />
      </div>
    </>
  );
}
