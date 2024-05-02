import { Link, useNavigate } from "react-router-dom";

import "../styles/Nav.css";

interface NavBarProps {
  userType: string;
}

function NavBar({ userType }: NavBarProps) {
  const navigate = useNavigate();

  const refereshPage = () => {
    navigate(0);
  };

  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <li onClick={refereshPage}>
            <Link to={`/${userType}`}>Home</Link>
          </li>
          {userType !== "Hr" && (
            <li>
              <Link to={`/${userType}ReviewForm`}>MyForm</Link>
            </li>
          )}

          {/* <li onClick={refereshPage}>
            <Link to="/Manager">Manager</Link>
          </li>
          <li>
            <Link to="/Hr">HR</Link>
          </li> */}
        </ul>
      </nav>
    </>
  );
}

/*
default userType is an employee (CHANGE FOR NOW BECAUSE NO HR BAMBOO)
options:
- Employee
- Manager
- Hr
*/

NavBar.defaultProps = {
  userType: "Employee",
};

export default NavBar;
