import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //import react-router-dom
import { useState, useEffect } from "react";
import NoPage from "./pages/NoPage";
import EmployeePage from "./pages/EmployeePage";
import HrPage from "./pages/HrPage";
import ManagerPage from "./pages/ManagerPage";
import EmployeeReviewFormPage from "./pages/EmployeeReviewFormPage";
import ManagerReviewFormPage from "./pages/ManagerReviewFormPage";
import axios from "axios";
import config from "../config.json";
import "./global.css";

export default function App() {
  const [EmployeeHID, setEmployeeHID] = useState<number>(0);
  const [ManagerHID, setManagerHID] = useState<number>(0);

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

  useEffect(() => {
    const fetchManagerHID = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/SubmissionForm/GetManagerHID`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setManagerHID(response.data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchManagerHID(); // Call the fetchData function
  }, []); // Run the effect only when component mounts for the first time

  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<EmployeePage employeeHID={EmployeeHID} />} />
          <Route
            path="/Employee"
            element={<EmployeePage employeeHID={EmployeeHID} />}
          />
          <Route path="/Hr" element={<HrPage />} />
          <Route
            path="/Manager"
            element={<ManagerPage managerHID={ManagerHID} />}
          />
          <Route
            path="/EmployeeReviewForm"
            element={<EmployeeReviewFormPage />}
          />
          <Route
            path="/ManagerReviewForm"
            element={<ManagerReviewFormPage />}
          />
          <Route path="*" element={<NoPage />} />{" "}
          {/* *: anything else another the other routes */}
        </Routes>
      </Router>
    </div>
  );
}
