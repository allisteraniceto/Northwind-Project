import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //import react-router-dom
import NoPage from "./pages/NoPage";
import EmployeePage from "./pages/EmployeePage";
import HrPage from "./pages/HrPage";
import ManagerPage from "./pages/ManagerPage";
import EmployeeReviewFormPage from "./pages/EmployeeReviewFormPage";
import ManagerReviewFormPage from "./pages/ManagerReviewFormPage";

import "./global.css";

export default function App() {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route index element={<EmployeePage />} />
          <Route path="/Employee" element={<EmployeePage />} />
          <Route path="/Hr" element={<HrPage />} />
          <Route path="/Manager" element={<ManagerPage />} />
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
