import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config.json';
import "../styles/Form.css";

interface FormsProps {
  questionNum: number; //question number
  formType: String;
  readonly: boolean;
}

export default function Form(props: FormsProps) {
  //State to store the input value
  const [inputObject, setInputObject] = useState({
    questionNum: props.questionNum,
    formType: props.formType,
    inputString: ""
  });

 

  useEffect(() => {
    // Make a GET request to API endpoint
    const fetchResponse = async () => {
      try {
          const response = await axios.post(`${config.apiUrl}/SubmissionForm/GetResponse`, inputObject, {
              headers: { 
                  'Content-Type': 'application/json'
              }
          });
  
          // Handle the response data
          const responseData = response.data.Content;
          setInputObject((prevInputObject) => ({
            ...prevInputObject,
            inputString: responseData // Set the fetched response as the input string
          }));
      } catch (error: any) {
          console.error('Error fetching data:', error.message);
      }
    };
        fetchResponse(); // Call the fetchData function
}, []); // Run the effect only when component mounts for the first time



  //handler funciton to update state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value; //captures forms input in an event

    setInputObject((prevInputObject) => ({
      ...prevInputObject,
      inputString: newInput,
    })); //spread operator to help update the object
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
          rows={5}
          readOnly={props.readonly}
        />
        {!props.readonly && (       //only display save button if readonly is false
        <button type="button" onClick={handlePostRequest}>
          Save
        </button>
      )}
      </form>
    </>
  );
}
