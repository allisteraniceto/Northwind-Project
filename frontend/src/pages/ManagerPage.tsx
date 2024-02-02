//Manager Dashboard
//Employee Dashboard
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

function ManagerPage() {
  return (
    <>
      <Header dashboard="Manager" />
      <EmployeeList />
      <div className='employee-container'>
        <Link to="/ManagerReviewForm">
          <button type="button" className='performance-review-button'>
            Take Me To This Employee's Performance Review
          </button>
        </Link>
      </div>
    </>
  );
}

export default ManagerPage;
