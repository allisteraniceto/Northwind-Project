import Header from "../components/Header";
import FormRow from "../components/FormRow";

export default function ReviewFormPage() {
  let questionNum: number = 1;
  return (
    <>
      <Header dashboard="Forms" />
      <div className="formSection">
        <div className="divide">
          <h1>Questions</h1>
          <FormRow
            questionNum={questionNum}
            formQuestion="Job description and/or Job highlights noting any significant changes"
          />
          <FormRow
            questionNum={++questionNum}
            formQuestion="Evaluate performance and achieved goals"
          />
          <FormRow
            questionNum={++questionNum}
            formQuestion="Discuss Areas of excellance or improvement"
          />
          <FormRow
            questionNum={++questionNum}
            formQuestion="Discuss areas of development or improvement"
          />
          <FormRow
            questionNum={++questionNum}
            formQuestion="Develop future goals with set expectation"
          />
        </div>
      </div>
    </>
  );
}
