import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config.json';

import "../styles/Form.css";

interface FormsProps {
  questionNum: number; //question number
  formType: String;
}

export default function Form(props: FormsProps) {
  //State to store the input value
  const [inputObject, setInputObject] = useState({
    questionNum: props.questionNum,
    formType: props.formType,
    inputString: "",
  });

  //Get request to retrieve latest inputs
  // axios
  //   .get("https://dotnet/endpoint", {
  //     params: {
  //       parameter1: inputObject.questionNum,
  //       parameter2: inputObject.formType,
  //     },
  //   })
  //   .then((response) => {
  //     setInputObject({ ...inputObject, inputString: response.data });
  //   })
  //   .catch((error) => {
  //     //handle errors
  //     console.error("Error making Get request:", error.message);
  //   });

  //handler funciton to update state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value; //captures forms input in an event

    setInputObject({ ...inputObject, inputString: newInput }); //spread operator to help update the object
  };

    //send post request once save button using async/await function
    const handlePostRequest = async () => {
        try{ //axios.post(api endpoint, data, headers)
            const response = await axios.post(`${config.apiUrl}/SubmissionForm/SaveResponse`, inputObject, {
                headers:{ //metadata for server
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response data: ', response.data);
        } catch(error: any){ //post request error handling
            console.error('Error making Post request:', error.message)
        }
  };

  return (
    <>
      <form className="centered-form">
        <label>{props.formType}</label>
        {/*if questionFrom, display questionStriong, if not, feedback*/}
        <textarea
          value={inputObject.inputString} //original state
          onChange={handleInputChange} //once forms changes, handle the new input
          placeholder="type here"
          rows={4}
        />
        <button type="button" onClick={handlePostRequest}>
          Save
        </button>
      </form>
    </>
  );
}
