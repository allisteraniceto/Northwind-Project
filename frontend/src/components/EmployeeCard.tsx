import "../styles/EmployeeList.css";

interface EmployeeProps {
  employee: String;
  key: Number;
}

export default function EmployeeCard(props: EmployeeProps) {
  return (
    <div className="employee-card">
      <div>
        <img className="headshot" src="/pug.jpg" alt="User Headshot" />
      </div>
      <div>
        <p>{props.employee}</p>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="green"
        >
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
      </div>
    </div>
  );
}
