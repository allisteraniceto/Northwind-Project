//Employee Dashboard
import Header from "../components/Header";
import {useEffect} from 'react';
import axios from "axios";
import RatingTile from "../components/RatingTile";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";
import SelectedEmployee from "../components/SelectedEmployee";
import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import config from "../../config.json";

interface EmployeePageProps {
  employeeHID: number;
}

export default function EmployeePage({ employeeHID }: EmployeePageProps) {
    // call EmulateEmployee on backend to change the Global Identity information to that of a logged in employee. THIS IS FOR DEMO PURPOSES ONLY.
    useEffect(() => {
      // Make a GET request to API endpoint to get the status of this review
      const emulateEmployee = async () => {
        try {
            await axios.get(`${config.apiUrl}/EmployeeDashboard/EmulateEmployee`, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
      };
      emulateEmployee(); 
    }, []); // Run the effect only when component mounts for the first time
  return (
    <div>
      <Header />
      <div className={"page"}>
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
          <SelectedEmployee EmployeeId={employeeHID} />
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
      </div>
    </div>
  );
}
