//next thing to do: make only one employee selected at a time

import EmployeeCard from "./EmployeeCard";
import { useState, useEffect } from "react"; //will use later
import axios from "axios";
import config from "../../config.json";
import "../styles/EmployeeList.css";

//import dummy employee json data
// import employeeData from "../dummy-employees.json";

type HandleFunction = (employeeId: number | null) => void; //define type here
type HandleSelectedManager = (expand: boolean) => void;

// Define the Employee interface (because Typescript lol)
interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  manager_id: number;
}

interface EmployeeListProps {
  setEmployeeID?: HandleFunction; //can mark prop options w/ ? in typescript
  dashboard: string;
  listType: string;
  managerHID: number | null;
  handleSelectedManager?: HandleSelectedManager;
  expandManager?: boolean;
}

export default function EmployeeList(props: EmployeeListProps) {
  const [employeeList, setEmployeeList] = useState<Employee[]>( //specify type here
    [] //empty array of objects for now
  );

  //handle state in parent component to track one selected employee only
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null); //null by default

  //pass the set function down to EmployeeCard
  const handleEmployeeSelect = (employeeId: number) => {
    //also want to handle expand if listType is manager

    setSelectedEmployee(employeeId === selectedEmployee ? null : employeeId);
    props.setEmployeeID &&
      props.setEmployeeID(employeeId === selectedEmployee ? null : employeeId); //for manager page (setEmployeeID optional: use && to check for null)
    if (props.handleSelectedManager) {
      props.handleSelectedManager(true);
    }
  };

  //Get request to retrieve list of employees (direct reports)
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/${props.dashboard}/${props.listType}`, {
        params: {
          employee_HID: props.managerHID,
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
  }, [props.expandManager]); //updates employeeList after component mounts and when expandManager changes

  return (
    <div className="employee-list">
      {employeeList.map(
        //use array map function to iterate through json object
        (employee, index) => (
          <EmployeeCard
            key={index}
            employee={employee.first_name + " " + employee.last_name}
            employeeNum={employee.employee_id}
            status={true}
            onSelect={handleEmployeeSelect}
            isSelected={employee.employee_id === selectedEmployee} //if selected employee matches the employee id, returns true
          />
        )
      )}
    </div>
  );
}
