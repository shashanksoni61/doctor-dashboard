import React from "react";
import timeDifference from "../../../utils/timeDifference";

function Note(props) {
    const {note, Edit, clas} = props;
    const edit = () => {
        Edit(note);
    }
  return (
    <div>
      <ul className="timeline mt-5">
        <li className={clas}>
          <div className="timeline-badge info">
            <i className="mdi mdi-check" />
          </div>
          <div className="timeline-panel">
            <p className="time-box">
              <small className="text-muted">
                <i className="mdi mdi-av-timer" />{" "}
                {timeDifference(new Date(), new Date(note.date))}
              </small>
            </p>
            <div className="timeline-body">
              <p className="mb-3">{note.note}</p>
            </div>
            <p className="notes-edit">
              <a onClick={edit} data-toggle="modal" data-target="#editnursenoteModal">
                Edit <i className="mdi mdi-pencil" />
              </a>{" "}
              |{" "}
              <a>
                Delete <i className="mdi mdi-delete" />
              </a>{" "}
              &nbsp;{" "}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Note;
