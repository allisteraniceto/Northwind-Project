import "../styles/Header.css";
import { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config.json";
import Employees from "../dummy-employees.json";

interface Employee {
  FirstName: string;
  LastName: string;
  Email: string;
  HID: number;
  ManagerHID: number;
  Role: string;
}

export default function Profile() {
  const [employee, setEmployee] = useState<Employee | null>(null);

  // call EmulateEmployee on backend to change the Global Identity information to that of a logged in employee. THIS IS FOR DEMO PURPOSES ONLY.
  useEffect(() => {
    // Make a GET request to API endpoint to get the status of this review
    const emulateEmployee = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/EmployeeDashboard/EmulateGetEmployee`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setEmployee({ ...response.data });
        console.log("employee:", employee);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    emulateEmployee();
  }, []); // Run the effect only when component mounts for the first time

  const employeeDemo = Employees.employees.find(
    (emp) => emp.employee_id === employee?.HID
  );

  return (
    <div className="profile">
      <div className="profile name">
        {employee && <p>{employee.FirstName + " " + employee.LastName}</p>}
      </div>
      <div>
        <img
          className="headshot"
          src={employeeDemo ? employeeDemo.headshot : "/pug.jpg"}
          alt="User Headshot"
        />
      </div>
    </div>
  );
}
