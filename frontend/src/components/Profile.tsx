import "../styles/Topbar.css";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile name">
        <p>Name Here</p>
      </div>
      <div>
        <img className="headshot" src="/pug.jpg" alt="User Headshot" />
      </div>
    </div>
  );
}
