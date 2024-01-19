import Header from "../components/Header"
import FormSection from "../components/FormSection"

export default function ReviewFormPage(){
    return(
        <>
            <Header dashboard="Forms"/>
            <div className="divide">
                <FormSection formType="Question" formStyle="QuestionForm"/>
                <FormSection formType="Feedback" formStyle="FeedbackForm"/>     
            </div>    
        </>
    );
}