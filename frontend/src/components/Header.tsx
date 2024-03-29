import Nav from "../components/NavBar";
import Profile from "../components/Profile";
import NorthwindLogo from "/northwind-logo.png";

import "../styles/Topbar.css";
interface HeaderProps {
  dashboard: string;
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <>
      <div className="topbar">
        <div className="northwind-logo-container">
          <img
            className="northwind-logo"
            src={NorthwindLogo}
            alt="northwind logo"
          />
        </div>
        <div className="profile-side">
          <Profile />
        </div>
      </div>
      <div className="dashboard">
        <h3>{props.dashboard} Dashboard</h3>
      </div>
      <Nav />
    </>
  );
}
