import EmployeeCard from "./EmployeeCard";
import { useState, useEffect } from "react"; //will use later
import axios from "axios";
import config from "../../config.json";
import "../styles/EmployeeList.css";

//import dummy employee json data
// import employeeData from "../dummy-employees.json";

// Define the Employee interface (because Typescript lol)
interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  manager_id: number;
}

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState<Employee[]>( //specify type here
    [] //empty array of objects for now
  );

  //will use this when api works
  useEffect(() => {
    //Get request to retrieve list of employees
    axios
      .get(`${config.apiUrl}/ManagerDashboard/EmployeeListAll`, {
        params: {
          parameter1: "employees",
          parameter2: "inputObject.formType",
        },
      })
      .then((response) => {
        setEmployeeList(response.data);
        console.log(`EmployeeList: ${employeeList}`);
      })
      .catch((error) => {
        //handle errors
        console.error("Error making Get request:", error.message);
      });
  }, []); //updates employeeList after component mounts

  return (
    <div className="employee-list">
      {employeeList.map(
        //use array map function to iterate through json object
        (employee, index) => (
          <EmployeeCard
            key={index}
            employee={employee.first_name + " " + employee.last_name}
            status={true}
          />
        )
      )}
    </div>
  );
}
