import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentList } from "../../redux/actions/appointmentActions";
import Time from "./Time";
import Card from "./Card";
import AddAppointmentModal from "./AddAppointmentModal";
import { setPatientsList } from "../../redux/actions/patientListActions";
import { setDoctorsList } from "../../redux/actions/doctorActions";
import Snackbar from "../../components/Alert/SnackBar";
import DashboardPatient from "../../skeletons/DashboardPatient";
import EditAppointmentModal from "./EditAppointmentModal";

const Appointment = () => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);
  const appointmentList = useSelector(
    (state) => state.doctorAppointmentList.appointments.total_data
  );
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  const [app, setApp] = useState();

  const handleClose = () => setShow(false);
  async function fetchData() {
    try {
      const res = await axios.get("/nurse/all-doctors-appointments");
      const result = await axios.get("nurse/dashboard");
      const res2 = await axios.get("doctor/list");
      dispatch(setAppointmentList(res.data.data));
      dispatch(setPatientsList(result.data.data.patient_list));

      dispatch(setDoctorsList(res2.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  const setAppointment = (appoint) => {
    setApp(appoint);
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);

  return (
    <div>
      <div>
        <section className="dashboard">
          <div className=" container-fluid p-0">
            <div className="row" data-plugin="matchHeight" data-by-row="true">
              <div className="col-xxl-12 col-lg-12">
                {/* Panel Projects Status */}
                <div className="panel" id="projects-status">
                  <div className="panel-heading appointment-schedule appointment-list pt-3">
                    <div className="row align-items-center m-0">
                      <div className="col-md-2">
                        <h3 className="panel-title pt-0 pb-0">Appointments</h3>
                      </div>
                    </div>
                    <hr />
                    <button
                      type="button"
                      className="btn-raised btn btn-danger btn-floating "
                      data-toggle="modal"
                      data-target="#addAppointmentModal"
                    >
                      <i className="icon mdi mdi-plus" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="table-responsive p-3">
                    {appointmentList ? (
                      <table className="table table-striped appointment-table">
                        <thead>
                          <tr>
                            <th width="10%">Time</th>
                            {appointmentList &&
                              appointmentList.map((doctor, idx) => {
                                return (
                                  <th width="18%" key={idx}>
                                    <span className="dr-name">
                                      {doctor.doctors.name}
                                    </span>
                                  </th>
                                );
                              })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <Time />
                            {appointmentList &&
                              appointmentList.map((doctor, key) => {
                                return (
                                  <td width="18%" key={key}>
                                    <table className="table w-100">
                                      <tbody>
                                        {doctor.Appointment &&
                                          doctor.Appointment.map(
                                            (appointment, idx) => {
                                              return (
                                                appointment.deleted === "0" && (
                                                  <Card
                                                    key={idx}
                                                    setTrigger={setTrigger}
                                                    trigger={trigger}
                                                    setConfirmationSnackbarMessage={
                                                      setConfirmationSnackbarMessage
                                                    }
                                                    setConfirmationSnackbarOpen={
                                                      setConfirmationSnackbarOpen
                                                    }
                                                    appointment={appointment}
                                                    app={setAppointment}
                                                  />
                                                )
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </table>
                                  </td>
                                );
                              })}
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <DashboardPatient />
                    )}
                  </div>
                </div>
                {/* End Panel Projects Stats */}
              </div>
            </div>
          </div>
        </section>
        {/* Modal */}
        <AddAppointmentModal
          show={show}
          setShow={setShow}
          setTrigger={setTrigger}
          trigger={trigger}
          setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
          setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
          handleClose={handleClose}
        />
        <EditAppointmentModal
          appointment={app}
          setTrigger={setTrigger}
          trigger={trigger}
          setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
          setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
        />
        <Snackbar
          confirmationSnackbarMessage={confirmationSnackbarMessage}
          confirmationSnackbarOpen={confirmationSnackbarOpen}
          setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
        />
      </div>
    </div>
  );
};

export default Appointment;
