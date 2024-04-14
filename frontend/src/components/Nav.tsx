import { Link } from "react-router-dom";

import "../styles/Nav.css";

function NavBar() {
  return (
    <>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/Employee">Employee</Link>
          </li>
          <li>
            <Link to="/Manager">Manager</Link>
          </li>
          <li>
            <Link to="/Hr">HR</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
