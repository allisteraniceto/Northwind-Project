//Employee Dashboard
import {useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import config from '../../config.json';
import PerformanceReviewButton from '../components/PerformanceReviewButton';


export default function EmployeePage() {

  useEffect(() => {
    // Make a GET request to API endpoint for the EmployeeHID of the logged in employee
    const fetchEmployeeHID = async () => {
      try {
          await axios.post(`${config.apiUrl}/SubmissionForm/SetSelectedEmployeeHID`, -1,  {
              headers: { 
                  'Content-Type': 'application/json'
              }
          });

      } catch (error: any) {
          console.error('Error fetching data:', error.message);
      }
    };
        fetchEmployeeHID(); // Call the fetchData function
}, []); // Run the effect only when component mounts for the first time


  return (
    <>
      <Header dashboard="Employee" />
      <div className="employee-section">
        <div className="employee-dashboard">
          <div className="employee-rating-pane">
            {/*RATING CONTAINER */}
          </div>
          <div className="employee-criteria-pane">
            {/*CRITERIA CONTAINTER*/}
          </div>
        </div>
        <div className="employee-reminder">
          <PerformanceReviewButton reviewStatus="Finalized" />
        </div>
      </div>
    </>
  );
}