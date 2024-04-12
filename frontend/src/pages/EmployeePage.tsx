//Employee Dashboard
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import RatingTile from "../components/RatingTile";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";
import SelectedEmployee from "../components/SelectedEmployee";

import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import config from "../../config.json";


export default function EmployeePage() {

  const [EmployeeHID, setEmployeeHID] = useState(null);

  // Make a GET request to API endpoint for the EmployeeHID of the logged in employee
  useEffect(() => {
    const fetchEmployeeHID = async () => {
      try {
         const response = await axios.get(
          `${config.apiUrl}/SubmissionForm/GetEmployeeHID`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setEmployeeHID(response.data);

      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchEmployeeHID(); // Call the fetchData function
  }, []); // Run the effect only when component mounts for the first time

  return (
    <>
      <Header dashboard="Employee" />
      <div className="employee-dashboard">
        <div className="employee-rating-pane">
          <RatingTile ratingNum={12} />
        </div>
        <div className="employee-criteria-pane">
          {/* CRITERIA CONTAINER */}
          <ul>
            <li>
              Job description and/or Job highlights noting any significant
              changes
            </li>
            <li>Evaluate performance and achieved goals</li>
            <li>Discuss areas of excellence within performance</li>
            <li>Discuss areas of development or improvement</li>
            <li>Develop future goals with set expectation</li>
          </ul>
        </div>
      </div>
      <div className="selected-employee-container">
        <SelectedEmployee EmployeeId={EmployeeHID}/>
        <PerformanceReviewButton
          linkTo="/EmployeeReviewForm"
          reviewStatus="Finalized"
        />
      </div>
      <div className="attachments-container">
        <div className="attachment-list-header">
          <h3>Attachments</h3>
        </div>
        <AttachmentList />
      </div>
      <div className="previous-years-container">
        {/* PREVIOUS REVIEWS */}
        <p>Previous Reviews</p>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
