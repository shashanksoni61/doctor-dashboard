import React from "react";
import timeDifference from "../../../utils/timeDifference";
import axios from "axios";
import { useSelector } from "react-redux";

function Note(props) {
  const {
    note,
    Edit,
    clas,
    setConfirmationSnackbarMessage,
    setConfirmationSnackbarOpen,
    setTrigger,
    trigger,
  } = props;
  const edit = () => {
    Edit(note);
  };
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const deleteNote = async () => {
    const result = await axios
      .get(`/doctor/deleteDoctorNote/${note._id}`)
      .then((response) => {
        setConfirmationSnackbarMessage("Note succesfully deleted!");
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Delete!");
        setConfirmationSnackbarOpen(true);
      });
  };
  function getDocName(id) {
    const doctor_name = doctorsList.filter((elem, ind) => {
      return elem._id === id;
    });
    return doctor_name;
  }
  const doc = getDocName(note.doctor_id);
  return (
    <>
      <ul className="timeline mt-2">
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
              <a
                data-toggle="modal"
                data-target="#editdoctornoteModal"
                onClick={edit}
              >
                Edit <i className="mdi mdi-pencil" />
              </a>{" "}
              |{" "}
              <a onClick={deleteNote}>
                Delete <i className="mdi mdi-delete" />
              </a>{" "}
              &nbsp;{" "}
              <span>
                Noted By <i className="mdi mdi-file-document-box" />: Dr.
                {doc.length !== 0 && doc[0].name}
              </span>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Note;
