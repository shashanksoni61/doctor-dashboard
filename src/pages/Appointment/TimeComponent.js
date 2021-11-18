import React from "react";

function TimeComponent(props) {
  return (
    <tr>
      <td>
        <span className="time">
          <i className="mdi mdi-timer" /> {props.time}
        </span>
      </td>
    </tr>
  );
}

export default TimeComponent;
