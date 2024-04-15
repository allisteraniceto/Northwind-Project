import "../styles/EmployeeList.css";
import "../styles/InteractionsPane.css";

interface OvalVignetteProps {
  src: string;
  alt: string;
}

function OvalVignette({ src, alt }: OvalVignetteProps) {
  return (
    <div className="vignette">
      <img
        src={src ? src : "dogedance.gif"}
        alt={alt}
        className="headshot-selected pane"
      />
    </div>
  );
}

export default OvalVignette;
