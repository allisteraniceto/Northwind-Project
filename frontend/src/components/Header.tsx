import "../styles/Header.css";

interface HeaderProps {
  dashboard: string;
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="header">
      <h1>{props.dashboard}</h1>
    </div>
  );
}
