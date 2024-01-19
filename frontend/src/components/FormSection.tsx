import Form from "./Form"
import "../styles/FormSection.css"

interface formTypeProp{
    formType: String;
    formStyle: string;
}

export default function FormSection(prop: formTypeProp) {
    let questionNum: number;
    if(prop.formType != "Feedback"){ //if not feedback form, do not show number
        questionNum=1;
    }else{
        questionNum=0;
    }

  return (
    <div className={prop.formStyle}>
        <Form formType={prop.formType} questionNum={questionNum>0?questionNum:0}/>
        <Form formType={prop.formType} questionNum={questionNum>0?++questionNum:0}/>
        <Form formType={prop.formType} questionNum={questionNum>0?++questionNum:0}/>
    </div> 
  );
}
