import EmployeeCard from "./EmployeeCard";
//import React, { useState, useEffect } from "react"; //will use later
//import axios from "axios";
import "../styles/EmployeeList.css";

//import dummy employee json data
import employeeData from "../dummy-employees.json";

export default function EmployeeList() {
  // const [employeeList, setEmployeeList] = useState(
  //   {} //empty object for now
  // );

  // //will use this when api works
  // useEffect(() => {
  //   //updates employeeList after component mounts
  //   //Get request to retrieve list of employees
  //   axios
  //     .get("https://dotnet/endpoint", {
  //       params: {
  //         parameter1: "employees",
  //         parameter2: "inputObject.formType",
  //       },
  //     })
  //     .then((response) => {
  //       setEmployeeList(response.data.employees);
  //     })
  //     .catch((error) => {
  //       //handle errors
  //       console.error("Error making Get request:", error.message);
  //     });
  // }, []);

  return (
    <div className="employee-list">
      {employeeData.employees.map(
        //use array map function to iterate through json object
        (employee, index) => (
          <EmployeeCard
            key={index}
            employee={employee.first_name + " " + employee.last_name}
          />
        )
      )}
    </div>
  );
}
