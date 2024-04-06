import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //import react-router-dom
import { useState, useEffect } from "react";
import NoPage from "./pages/NoPage";
import EmployeePage from "./pages/EmployeePage";
import HrPage from "./pages/HrPage";
import ManagerPage from "./pages/ManagerPage";
import EmployeeReviewFormPage from "./pages/EmployeeReviewFormPage";
import ManagerReviewFormPage from "./pages/ManagerReviewFormPage";

import "./global.css";

export default function App() {
  const [reviewFormPage, setReviewFormPage] = useState(false);
  const [loggedInHID, setLoggedInHID] = useState<number>();

  useEffect(() => {
    setLoggedInHID(4); //will have to set this once login is implemented
    console.log(loggedInHID);
  }, []);

  // to see if routed to a review form page
  const handleReviewFormPage = (isReviewForm: boolean) => {
    setReviewFormPage(isReviewForm);
  };
  return (
    <div className={reviewFormPage ? "page-review-form" : "page"}>
      <Router>
        <Routes>
          <Route index element={<EmployeePage />} />
          <Route path="/Employee" element={<EmployeePage />} />
          <Route path="/Hr" element={<HrPage />} />
          <Route path="/Manager" element={<ManagerPage />} />
          <Route
            path="/EmployeeReviewForm"
            element={
              <EmployeeReviewFormPage setReviewForm={handleReviewFormPage} />
            }
          />
          <Route
            path="/ManagerReviewForm"
            element={
              <ManagerReviewFormPage setReviewForm={handleReviewFormPage} />
            }
          />
          <Route path="*" element={<NoPage />} />{" "}
          {/* *: anything else another the other routes */}
        </Routes>
      </Router>
    </div>
  );
}
