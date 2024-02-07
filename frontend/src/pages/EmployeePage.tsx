//Employee Dashboard
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import PerformanceReviewButton from '../components/PerformanceReviewButton';

export default function EmployeePage() {

  return (
    <>
      <Header dashboard="Employee" />
      <div className="employee-section">
          <div className="employee-dashboard">
            {/*RATING CONTAINER */}
          </div>
          <div className="employee-reminder">
            <PerformanceReviewButton reviewStatus="Finalized" />
          </div>
      </div>

    </>
  );
}
