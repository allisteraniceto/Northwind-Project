//Employee Dashboard
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/InteractionsPane.css";

function EmployeePage() {
  return (
    <>
      <Header dashboard="Employee" />
      <div className='employee-container'>
        <Link to="/EmployeeReviewForm">
          <button type="button" className='performance-review-button'>
            Take Me To My Performance Review
          </button>
        </Link>
      </div>
    </>
  );
}

export default EmployeePage;
