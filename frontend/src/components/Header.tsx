import Nav from "./Nav";
import Profile from "../components/Profile";
import NorthwindLogo from "/northwind-logo.png";

import "../styles/Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="northwind-logo-container">
          <img
            className="northwind-logo"
            src={NorthwindLogo}
            alt="northwind logo"
          />
        </div>
        <div>
          <Nav />
        </div>
        <div className="profile-side">
          <Profile />
        </div>
      </div>
    </>
  );
}
