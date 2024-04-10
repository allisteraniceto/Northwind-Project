import { useEffect } from "react";

import Header from "../components/Header";
import FormList from "../components/FormList";
import SubmitOrSignButton from "../components/SubmitOrSignButton";

type HandleFunction = (isReviewForm: boolean) => void;
interface ManagerReviewFormProps {
  setReviewForm: HandleFunction;
}

export default function ManagerReviewFormPage(props: ManagerReviewFormProps) {
  useEffect(() => {
    //set ReviewForm to true when component mounts
    props.setReviewForm(true);
    return () => {
      // Set reviewFormPage to false when unmounting the component
      props.setReviewForm(false);
    };
  }, []);
  return (
    <>
      <Header dashboard="Forms" />
      {/* <div className="formSection"> */}
      <div className="question-container">
        
        <FormList isEmployee={false}/>
      </div>
      {/* <div className="right-side"> */}
      <div className="employee-info-container">
        <p>Employee Info</p>
      </div>
      <div className="ratings-container">
        <p>Ratings</p>
      </div>
      <div className="signature-submit-container">
        <p>Signature and Submit</p>
        <SubmitOrSignButton formType="manager" status="" buttonType="submit" />
        <SubmitOrSignButton formType="manager" status="" buttonType="sign" />
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
