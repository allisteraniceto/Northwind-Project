import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <ul>
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
    </div>
  );
}

export default NavBar;
