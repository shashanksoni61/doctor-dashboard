import React from "react";
import TimeComponent from "./TimeComponent";

function Time() {
  return (
    <td width="10%">
      <table className="table" style={{ width: "100%" }}>
        <tbody>
          {[
            "08:00 AM",
            "08:10 AM",
            "08:20 AM",
            "08:30 AM",
            "08:40 AM",
            "08:50 AM",
            "09:00 AM",
            "09:10 AM",
            "09:20 AM",
            "09:30 AM",
            "09:40 AM",
            "09:50 AM",
            "10:00 AM",
            "10:10 AM",
            "10:20 AM",
            "10:30 AM",
            "10:40 AM",
            "10:50 AM",
            "11:00 AM",
            "11:10 AM",
            "11:20 AM",
            "11:30 AM",
            "11:40 AM",
            "11:50 AM",
            "12:00 PM",
            "12:10 PM",
            "12:20 PM",
            "12:30 PM",
            "12:40 PM",
            "12:50 PM",
            "01:00 PM",
            "01:10 PM",
            "01:20 PM",
            "01:30 PM",
            "01:40 PM",
            "01:50 PM",
            "02:00 PM",
            "02:10 PM",
            "02:20 PM",
            "02:30 PM",
            "02:40 PM",
            "02:50 PM",
            "03:00 PM",
            "03:10 PM",
            "03:20 PM",
            "03:30 PM",
            "03:40 PM",
            "03:50 PM",
            "04:00 PM",
            "04:10 PM",
            "04:20 PM",
            "04:30 PM",
            "04:40 PM",
            "04:50 PM",
            "05:00 PM",
          ].map((elem, ind) => {
            return <TimeComponent time={elem} key={ind} />;
          })}
        </tbody>
      </table>
    </td>
  );
}

export default Time;