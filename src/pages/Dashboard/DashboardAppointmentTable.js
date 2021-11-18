import React, { useEffect, useState } from "react";
import Time from "../Appointment/Time";
import axios from "axios";
import Card from "../Appointment/Card";
import DashboardPatient from "../../skeletons/DashboardPatient";
import DashboardPatientList from "../../skeletons/DashboardPatientList";

function DashboardAppointmentTable(props) {
  const {
    doctorsList,
    app,
    triger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;
  const [doctor, setDoctor] = useState("61236d73ec6c6a5eea309e4f");
  const [trigger, setTrigger] = useState(false);
  const [appointments, setAppointments] = useState([]);
  async function fetchData() {
    try {
      const res = await axios.get(`/doctor/appointment-list/${doctor}`);
      const arr = res.data.data.filter((elem) => {
        return elem.deleted === "0";
      });
      setAppointments(arr);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  const handleChange = (e) => {
    setDoctor(e.target.value);
  };
  useEffect(() => {
    fetchData();
  }, [trigger, doctor, triger]);
  {
    var selectedPatient = doctorsList.filter((patient, idx) => {
      return patient._id === doctor;
    });
  }
  return (
    <>
      {doctorsList.length !== 0 ? (
        <div className="col-xxl-6 col-lg-6">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h3 className="panel-title">
                    Appointment Schedule
                    <span className="badge badge-pill badge-info">
                      {appointments && appointments.length}
                    </span>
                  </h3>
                </div>
                <div className="col-md-4 ml-auto">
                  <div className="form-group doctor-appointment-filter mb-0 mr-4">
                    <select
                      id="select-new"
                      className="form-control"
                      onChange={handleChange}
                    >
                      {doctorsList &&
                        doctorsList.map((doctor, idx) => {
                          return (
                            <option value={doctor._id} key={idx}>
                              {doctor.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-raised btn btn-danger btn-floating"
                data-toggle="modal"
                data-target="#addAppointmentModal"
              >
                <i className="icon mdi mdi-plus" aria-hidden="true" />
              </button>
            </div>
            <div className="table-responsive p-3">
              <table className="table table-striped appointment-table">
                <thead>
                  <tr>
                    <th width="10%">Time</th>
                    <th width="90%">
                      <span className="dr-name">
                        {selectedPatient[0] && selectedPatient[0].name}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Time />
                    <td width="90%">
                      <table className="table w-100">
                        <tbody>
                          <tr>
                            <td width="18%">
                              <table className="table w-100">
                                <tbody>
                                  {appointments &&
                                    appointments.map((appointment, idx) => {
                                      return (
                                        appointment.deleted === "0" && (
                                          <Card
                                            key={idx}
                                            app={app}
                                            appointment={appointment}
                                            setTrigger={setTrigger}
                                            trigger={trigger}
                                            setConfirmationSnackbarMessage={
                                              setConfirmationSnackbarMessage
                                            }
                                            setConfirmationSnackbarOpen={
                                              setConfirmationSnackbarOpen
                                            }
                                          />
                                        )
                                      );
                                    })}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-xxl-6 col-lg-6">
          <DashboardPatient />
          <div className="table-responsive p-3">
            <DashboardPatientList />
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardAppointmentTable;
