import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";

interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  manager_id: number;
}

interface CompleteCountProps {
  managerHID?: number;
}

export default function CompleteCount({ managerHID }: CompleteCountProps) {
  const [employeeList, setEmployeeList] = useState<Employee[]>( //specify type here
    [] //empty array of objects for now
  );

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/ManagerDashboard/EmployeeList`, {
        params: {
          employee_HID: managerHID,
        },
      })
      .then((response) => {
        setEmployeeList(response.data);
        console.log(`ManagerList: ${employeeList}`);
      })
      .catch((error) => {
        //handle errors
        console.error("Error making Get request:", error.message);
      });
  }, [managerHID]); //make GET request again when back button is clicked

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>0/{employeeList.length}</p>
    </div>
  );
}
