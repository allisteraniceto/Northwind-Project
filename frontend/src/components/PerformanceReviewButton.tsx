//Employee Dashboard
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";
import config from '../../config.json';
import "../styles/InteractionsPane.css";


interface PerformanceReviewButtonProps {
    reviewStatus: string;
  }


export default function PerformanceReviewButton(props : PerformanceReviewButtonProps) {

    const [statusObject, setStatusObject] = useState({
        reviewStatus: props.reviewStatus
      });
    
    
      useEffect(() => {
        // Make a GET request to API endpoint for status of the current review
        const fetchStatus = async () => {
          try {
              const response = await axios.get(`${config.apiUrl}/SubmissionForm/GetStatus`, {
                  headers: { 
                      'Content-Type': 'application/json'
                  }
              });
      
              // Handle the response data
              const responseData = response.data;
              setStatusObject((prevStatusObject) => ({
                ...prevStatusObject,
                reviewStatus: responseData // Set the fetched response as the status
              }));
          } catch (error: any) {
              console.error('Error fetching data:', error.message);
          }
        };
            fetchStatus(); // Call the fetchStatus function
    }, []); // Run the effect only when component mounts for the first time

    if (statusObject.reviewStatus === "Finalized"){
        return (
            <>
                <Link to="/EmployeeReviewForm">
                    <button type="button" className='readonly-performance-review-button' disabled={true}>
                    Take Me To My Performance Review
                    </button>
                </Link>
            </>
        )
    }
    else{
        return (
            <>
                <Link to="/EmployeeReviewForm">
                    <button type="button" className='performance-review-button' disabled={false}>
                    Take Me To My Performance Review
                    </button>
                </Link>
            </>
          );
    }
}