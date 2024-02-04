//Manager Dashboard
//Employee Dashboard
import { Link } from "react-router-dom";
import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
import "../styles/ManagerSection.css";

function ManagerPage() {
  return (
    <>
      <Header dashboard="Manager" />
      <div className="manager-section">
        <div className="employee_list-container">
          <EmployeeList />
        </div>
        <div className="employee-container">
          <Link to="/ManagerReviewForm">
            <button type="button" className="performance-review-button">
              Take Me To This Employee's Performance Review
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
