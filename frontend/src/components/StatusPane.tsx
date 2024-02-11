import "../styles/StatusPane.css";
import complete from "../assets/complete.png"; //../assets/complete.png
import uncomplete from "../assets/uncomplete.png";
import managerTest from "../assets/pug.jpg";
//import { Text, StyleSheet } from "react-native";

function sendReminder() {
  return;
}

function scheduleMeeting() {
  return;
}

interface Props {
  completed: boolean;
  managerPicture: string;
  managerCompleted: boolean;
}

export default function StatusPane({
  completed,
  managerPicture,
  managerCompleted,
}: Props) {
  return (
    <>
      <nav className="formCompleted">
        {completed && <img src={complete} alt="Completed Form" width="50" />}
        {!completed && (
          <img src={uncomplete} alt="Hasn't Completed Form" width="50" />
        )}
        {!completed && <button onClick={sendReminder}>Send Reminder</button>}
      </nav>
      <nav className="managerCompleted">
        Manager Review
        <img src={managerTest} alt="Manager_Headshot" height="50" />
        {managerCompleted && (
          <img src={complete} alt="Completed Form" width="50" />
        )}
        {!managerCompleted && (
          <img src={uncomplete} alt="Hasn't Completed Form" width="50" />
        )}
        {<button onClick={scheduleMeeting}>Schedule Meeting</button>}
      </nav>
    </>
  );
}
