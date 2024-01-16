import Nav from "../components/NavBar";

import "../styles/Topbar.css";
interface HeaderProps {
  dashboard: string;
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <>
      <div className="topbar">
        <div>
          <img className="headshot" src="/pug.jpg" alt="User Headshot" />
        </div>
        <div>
          <p>Name Here</p>
        </div>
      </div>
      <div className="dashboard">
        <h3>{props.dashboard} Dashboard</h3>
      </div>
      <Nav />
    </>
  );
}
