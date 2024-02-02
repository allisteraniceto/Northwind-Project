import {useState, useEffect } from 'react';
import axios from "axios";
import config from '../../config.json';
import '../styles/SubmitAndSignButtons.css'

interface SubmitButtonProps {
    formType: string;
    status: string;
  }

export default function SubmitButton(props: SubmitButtonProps) {
  //State to store the input value
  const [buttonStatus, setButtonStatus] = useState({
    status: props.status,
    formType: props.formType
  });

  useEffect(() => {
    // Make a GET request to API endpoint
    const fetchStatus = async () => {
      try {
          const response = await axios.get(`${config.apiUrl}/SubmissionForm/GetStatus`, {
              headers: { 
                  'Content-Type': 'application/json'
              }
          });
  
          // Handle the response data
          const responseData = response.data;
          setButtonStatus((prevButtonStatus) => ({
            ...prevButtonStatus,
            status: responseData // Set the fetched response as the input string
          }));
      } catch (error: any) {
          console.error('Error fetching data:', error.message);
      }
    };
    fetchStatus(); // Call the fetchData function
  }, []); // Run the effect only when component mounts for the first time
  
  useEffect(() => {
    // Whenever props.status changes, update the buttonStatus
    setButtonStatus((prevButtonStatus) => ({
        ...prevButtonStatus,
        status: props.status
    }));
  }, [props.status]); // Run the effect whenever props.status changes

  
  const submitPostRequest = async () => {
      try{ //axios.post(api endpoint, data, headers)
          const response = await axios.post(`${config.apiUrl}/SubmissionForm/HandleSubmission`, props.formType, {
              headers:{ //metadata for server
                  'Content-Type': 'application/json'
              }
          });
    
          setButtonStatus((prevButtonStatus) => ({
            ...prevButtonStatus,
            status: ""
        }));
          console.log('Response data: ', response.data);
      } catch(error: any){ //post request error handling
          console.error('Error making Post request:', error.message)
      }
    };

    const isReadOnly = buttonStatus.status !== 'Initiated'; // Check if the button should be read-only
    const buttonClass = isReadOnly ? 'readonlybutton' : 'submitandsignbutton'; // Set the class based on read-only status
    
    return (
          <button type="button" className={buttonClass} onClick={submitPostRequest} disabled={isReadOnly}>
            Submit
          </button>
      );
}


  