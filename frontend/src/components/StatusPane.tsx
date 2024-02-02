import "../styles/StatusPane.css";
import complete from "../assets/complete.png"; //../assets/complete.png
import uncomplete from "../assets/uncomplete.png";

function sendReminder() {
  return;
}

interface Props {
  completed: boolean;
  managerPicture: string;
}

export default function StatusPane({ completed, managerPicture }: Props) {
  return (
    <>
      <nav className="formCompleted">
        {completed && <img src={complete} alt="Completed Form" width="50" />}
        {!completed && (
          <img src={uncomplete} alt="Hasn't Completed Form" width="50" />
        )}
        {!completed && <button onClick={sendReminder}>Send Reminder</button>}
        <br />
        test
        <img src={managerPicture} alt="Manager Headshot" />
      </nav>
    </>
  );
}
