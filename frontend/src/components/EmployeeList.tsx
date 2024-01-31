import EmployeeCard from "./EmployeeCard";
import "../styles/EmployeeList.css";

//import dummy employee json data
import employeeData from "../dummy-employees.json";

export default function EmployeeList() {
  return (
    <div className="employee-list">
      {employeeData.employees.map((employee, index) => (
        <EmployeeCard
          key={index}
          employee={employee.first_name + " " + employee.last_name}
        />
      ))}
    </div>
  );
}
