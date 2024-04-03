import React, { useState, useEffect} from "react";
import { FcApprove, FcDisapprove } from "react-icons/fc";

const StatusIcon = (status: string): JSX.Element => {
    const [icon, setIcon] = useState<JSX.Element>(<FcApprove />);
    useEffect(() => {
        if (status === "completed") {
            setIcon(<FcApprove />);
        } else {
            setIcon(<FcDisapprove />);
        }
    }, [status]);

    return icon;
};