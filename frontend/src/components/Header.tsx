import Nav from "../components/NavBar";
import Profile from "../components/Profile";

import "../styles/Topbar.css";
interface HeaderProps {
  dashboard: string;
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <>
      <div className="topbar">
        <div className="northwind-logo">
          <img src="/frontend/public/vite.svg" alt="northwind logo" />
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
