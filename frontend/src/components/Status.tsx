import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import { IconContext } from "react-icons";
import { FcApprove, FcDisapprove } from "react-icons/fc";

interface StatusIconProps {
  employeeHID: number;
}

function StatusIcon({ employeeHID }: StatusIconProps) {
  const [status, setStatus] = useState("");

  const year = new Date().getFullYear();

  //GET request to get status of specific employee
  useEffect(() => {
    const emulateGetEmployee = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/ManagerDashboard/GetEmployeeStatus`,
          {
            params: {
              employee_HID: employeeHID,
              year: year,
            },
          }
        );
        setStatus(response.data);
      } catch (error: any) {
        console.error("Error making Get request:", error.message);
      }
      emulateGetEmployee();
    };
  }, []);

  const [icon, setIcon] = useState<JSX.Element>(
    <IconContext.Provider value={{ size: "2.6em" }}>
      <FcDisapprove />
    </IconContext.Provider>
  ); //by default, not complete

  useEffect(() => {
    if (status === "completed") {
      setIcon(
        <IconContext.Provider value={{ size: "2.6em" }}>
          <FcApprove />
        </IconContext.Provider>
      );
    } else {
      setIcon(
        <IconContext.Provider value={{ size: "2.6em" }}>
          <FcDisapprove />
        </IconContext.Provider>
      );
    }
  }, [status]);

  return icon;
}

export default StatusIcon;
