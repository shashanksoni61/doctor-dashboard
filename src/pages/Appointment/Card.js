import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Card(props) {
  const {
    app,
    appointment,
    setTrigger,
    trigger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;
  const [mt, setMT] = useState("0rem");
  const patientsList = useSelector((state) => state.patientsList.patients);
  async function deleteAppointmentHandler() {
    await axios
      .post(`/nurse/deletePatientAppointment/${appointment._id}`)
      .then((response) => {
        setConfirmationSnackbarMessage("Appointment Deleted succesfully!");
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Delete!");
        setConfirmationSnackbarOpen(true);
      });
  }

  const margin = () => {
    let h = parseInt(appointment.start_time.substring(0, 2));
    let m = parseInt(appointment.start_time.substring(3));
    if (h < 8) {
      h += 4;
    } else {
      h -= 8;
    }
    m += h * 60 - 2 * h - 3;
    setMT(`${m * 0.3}rem`);
  };

  useEffect(() => {
    margin();
  }, [appointment]);

  var selectedPatient = patientsList.filter((patient, idx) => {
    return patient._id === appointment.patient_id;
  });

  const setAppointment = () => {
    app(appointment);
  };

  const width =
    window.location.pathname === "/Dashboard" ||
    window.location.pathname === "/dashboard" ||
    window.location.pathname === "/"
      ? "95%"
      : "92%";

  return (
    <tr>
      <td
        style={{ position: "absolute", width: width, marginTop: mt }}
        className="clearfix d-block appointment-box-relative"
        rowSpan={3}
      >
        <div className="appointment-box">
          <p className="notes-edit text-right">
            <a
              onClick={setAppointment}
              data-toggle="modal"
              data-target="#editAppointmentModal"
            >
              Edit <i className="mdi mdi-pencil" />
            </a>{" "}
            |{" "}
            <a onClick={deleteAppointmentHandler}>
              Delete <i className="mdi mdi-delete" />
            </a>{" "}
            &nbsp; <span />
          </p>
          <span className="patient-name text-capitalize">
            <Link to={`/${appointment.patient_id}`} style={{ color: "white" }}>
              {window.location.pathname === "/" ||
              window.location.pathname === "/dashboard" ||
              window.location.pathname === "/Dashboard"
                ? appointment.patient_id.name
                : selectedPatient[0] && selectedPatient[0].name}
            </Link>
          </span>
          <div className="mb-0 d-flex align-items-center">
            <p className="mb-0">
              {appointment.status === "Completed" && (
                <a>
                  <span className="badge badge-primary">Completed</span>
                </a>
              )}
              {appointment.status === "Arrived" && (
                <a>
                  <span className="badge badge-primary">Arrive</span>
                </a>
              )}
              {appointment.status === "Waiting" && (
                <a>
                  <span className="badge badge-warning">Waiting</span>
                </a>
              )}
              {appointment.status === "set" && (
                <a>
                  <span className="badge badge-warning">set</span>
                </a>
              )}
              {appointment.status === "OTW" && (
                <a>
                  <span className="badge badge-info">OTW</span>
                </a>
              )}
              {appointment.status === "Cancel" && (
                <a>
                  {" "}
                  <span className="badge badge-danger">Cancel</span>
                </a>
              )}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Card;
