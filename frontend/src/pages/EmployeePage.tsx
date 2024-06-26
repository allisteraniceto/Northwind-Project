//Employee Dashboard
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import RatingTile from "../components/RatingTile";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";
import SelectedEmployee from "../components/SelectedEmployee";
import YearCardList from "../components/YearCardList";
// import Footer from "../components/Footer";

import config from "../../config.json";

import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import "../styles/Footer.css";
import "../styles/YearCard.css";
import "../styles/YearCardList.css";
interface EmployeePageProps {
  employeeHID: number;
}

export default function EmployeePage({ employeeHID }: EmployeePageProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // call EmulateEmployee on backend to change the Global Identity information to that of a logged in employee. THIS IS FOR DEMO PURPOSES ONLY.
  useEffect(() => {
    // Make a GET request to API endpoint to get the status of this review
    const emulateEmployee = async () => {
      try {
        await axios.get(`${config.apiUrl}/EmployeeDashboard/EmulateEmployee`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    emulateEmployee();
  }, []); // Run the effect only when component mounts for the first time

  const handleYearSelected = (year: number | null) => {
    console.log(`Year ${year} selected`);
    setSelectedYear(year);
  };

  return (
    <div>
      <Header />
      <div className="page">
        <div className="employee-dashboard">
          <div className="employee-rating-pane">
            <h3 className="employee-rating-header">My Rating</h3>
            <RatingTile ratingNum={48} />
          </div>
          <div className="employee-criteria-pane">
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
          <div className="performance-review-button-container">
            <PerformanceReviewButton
              linkTo="/EmployeeReviewForm"
              reviewStatus="Submit"
            />
          </div>
        </div>
        <div className="attachments-container">
          <div className="attachment-list-header">
            <h3>Attachments</h3>
            {/* Display performance review year only when a year are selected */}
            {selectedYear === null ? (
              <p>
                <span style={{ color: "#FF0000" }}>
                  *Please select a performance review year
                </span>
              </p>
            ) : (
              <p>Performance Review Year: {selectedYear}</p>
            )}
          </div>
          {selectedYear && <AttachmentList selectedYear={selectedYear} />}
        </div>
        <div className="previous-years-container">
          {/* PREVIOUS REVIEWS */}
          <YearCardList
            startYear={2023}
            endYear={2029}
            onYearSelected={handleYearSelected}
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
