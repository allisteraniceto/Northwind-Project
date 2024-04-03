import "../styles/StatusPane.css";
import { useEffect } from "react";
import axios from "axios";
import config from "../../config.json";

interface Props {
  status: string;
  email: string;
}

export default function StatusPane({ status, email }: Props) {
  let statustwo;
  //modify to get employee name and status
  useEffect(() => {
    // Make a GET request to API endpoint to get the status of this review
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/SubmissionForm/GetStatus`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the response data
        statustwo = response.data;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchStatus();
  }, []); // Run the effect only when component mounts for the first time

  let textColor = "white";
  let buttonColor = "red";
  let buttonText = "Send Reminder";
  let displayButton = true;
  let mailtoLink = "mailto:" + email;

  if (status === "Not Opened") {
    textColor = "grey";
  } else if (status === "Opened") {
    textColor = "blue";
  } else if (status === "Employee Reviewed") {
    textColor = "brown";
    buttonColor = "green";
    buttonText = "Schedule a Meeting";
  } else if (status === "Ready For Signatures") {
    textColor = "red";
    buttonColor = "green";
    buttonText = "Schedule a Meeting";
  } else if (status === "Complete") {
    textColor = "green";
    displayButton = false;
  }
  const styles = {
    colorButton: {
      backgroundColor: buttonColor,
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "16px",
      marginTop: "20px",
      maxWidth: "200px",
    },
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: "<!-- comment text -->" }} />
      <nav className="statusPane">
        <nav className="status">
          Status: <>&nbsp;</>
          <div style={{ color: textColor }}>{statustwo}</div>
        </nav>
        <nav className="statusButton" style={{ color: textColor }}>
          {displayButton && (
            <button
              style={styles.colorButton}
              onClick={() => (window.location.href = mailtoLink)}
            >
              {buttonText}
            </button>
          )}
        </nav>
      </nav>
    </>
  );
}
