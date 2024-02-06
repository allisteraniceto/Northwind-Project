import {useState, useEffect } from 'react';
import axios from "axios";
import config from '../../config.json';
import '../styles/SubmitAndSignButtons.css'

interface SubmitButtonProps {
    formType: string; //holds the type of form this is, either employee or manager
    status: string; // holds status of the review within which this button is contained
  }

export default function SubmitButton(props: SubmitButtonProps) {
  //State to store the input value
  const [buttonStatus, setButtonStatus] = useState({
    status: props.status, 
    formType: props.formType  
  });

  useEffect(() => {
    // Make a GET request to API endpoint to get the status of this review
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
            status: responseData // Set the fetched response as the status prop
          }));
      } catch (error: any) {
          console.error('Error fetching data:', error.message);
      }
    };
    fetchStatus(); 
  }, []); // Run the effect only when component mounts for the first time
  
  useEffect(() => {
    setButtonStatus((prevButtonStatus) => ({
        ...prevButtonStatus,
        status: props.status //set new status
    }));
  }, [props.status]); // Run the effect whenever status prop changes

  
  const submitPostRequest = async () => {
      try{ //make post request upon clicking of 'submit' button
          const response = await axios.post(`${config.apiUrl}/SubmissionForm/HandleSubmission`, props.formType, {
              headers:{
                  'Content-Type': 'application/json'
              }
          });
    
          setButtonStatus((prevButtonStatus) => ({
            ...prevButtonStatus,
            status: "" //update status prop to empty string after posting. This will cause button to rerender as readonly because
        }));          //its status is no longer 'Initiated' (status before employee hits submit) or 'Employee Comments Submitted' (status before manager hits submit)
          console.log('Response data: ', response.data);
      } catch(error: any){ //post request error handling
          console.error('Error making Post request:', error.message)
      }
    };

    
    // variables to hold readonly status for the submit button and the buttonClass(styling) for the submit button
    let isReadOnly; 
    let buttonClass;

    if (props.formType === 'employee') { // if this submit button is on the EmployeeReviewFormPage
      isReadOnly = buttonStatus.status !== 'Initiated'; // Check if button should be read-only (only if review no longer has "Initiated" status, meaning the submit button has been clicked by the employee)
      buttonClass = isReadOnly ? 'readonlybutton' : 'submitandsignbutton'; // Set the class based on read-only status
      
      // You can use the variables isReadOnly and buttonClass as needed within this block
    }
    else{ // if this submit button is on the ManagerReviewFormPage
      isReadOnly = buttonStatus.status !== 'Employee Comments Submitted'; // Check if button should be read-only (only if review no longer has "Employee Comments Submitted" status, meaning the submit button has been clicked by the manager)
      buttonClass = isReadOnly ? 'readonlybutton' : 'submitandsignbutton'; // Set the class based on read-only status
    }
    
    return (
          <button type="button" className={buttonClass} onClick={submitPostRequest} disabled={isReadOnly}>
            Submit
          </button>
      );
}


  