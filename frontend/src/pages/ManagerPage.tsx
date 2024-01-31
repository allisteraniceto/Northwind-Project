//Manager Dashboard

import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";

function ManagerPage() {
  return (
    <>
      <Header dashboard="Manager" />
      <EmployeeList />
    </>
  );
}

export default ManagerPage;
