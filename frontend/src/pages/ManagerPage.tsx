
//Manager Dashboard
//Employee Dashboard
import Header from "../components/Header";

import DeleteButton from "../components/DeleteButton";
import DownloadButton from "../components/DownloadButton";

import YearCardList from "../components/YearCardList";
import '../styles/YearRadioButton.css';
import '../styles/DeleteButton.css'; // Import the CSS file
import '../styles/YearCard.css'; // Import the CSS file

import '../styles/YearCardList.css'; // Import the CSS file

import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
import "../styles/ManagerSection.css";



const ManagerPage: React.FC = () => {
  const navigateToReview = (year: number) => {
    console.log(`Navigating to performance review for year ${year}`);
    // Implement your navigation logic here
  };

  const handleClick = () => {
    console.log('Year clicked');
  };

  return (
    <>
      <Header dashboard="Manager" />
      <div className="manager-section">
        <div className="employee_list-container">
          <div className="employee-list-header">
            <h3>Direct Reports</h3>
          </div>
          <EmployeeList />
        </div>
        <div className="interactions-section">
          <div className="selected-employee-container">
            {/*SELECTED EMPLOYEE*/}
            <PerformanceReviewButton
              linkTo="/ManagerReviewForm"
              reviewStatus="Finalized"
            />
            <p>Selected Employee</p>
          </div>
          <div className="employee-container">
            
          <DeleteButton/>
               <DownloadButton/>
              
            <h3>Take Me To This Employee's Performance Review</h3>
              <div className="go-button">
              <Link to="/ManagerReviewForm">
                <button type="button" className="performance-review-button">
                  Go
                </button>
              </Link>
              </div>
          </div>


          <div className="previous-years-container">
          <YearCardList startYear={2023} endYear={2026} navigateToReview={() => console.log('Dummy navigateToReview function')} />

           </div>
            
            
      
            <p>Previous Reviews</p>

          </div>
      </div>
    </>
  );
}

export default ManagerPage;
