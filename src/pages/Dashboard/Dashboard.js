import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorsList } from "../../redux/actions/doctorActions";
import DashboardAppointmentTable from "./DashboardAppointmentTable";
import { setPatientsList } from "../../redux/actions/patientListActions";
import EditPatientForm from "./EditPatientForm";
import AddPatientForm from "./AddPatientForm";
import AddAppointmentModal from "../Appointment/AddAppointmentModal";
import GraphCards from "./GraphCards";
import PatientsList from "./DashboardPatients";
import Snackbar from "../../components/Alert/SnackBar";
import EditAppointmentModal from "../Appointment/EditAppointmentModal";
import { setNursesList } from "../../redux/actions/nurseAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [patient, setPatient] = useState();
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  const [app, setApp] = useState();
  const setAppointment = (appoint) => {
    setApp(appoint);
  };
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  // const patientsList = useSelector((state) => state.patientsList.patients);

  async function fetchData() {
    try {
      const result = await axios.get("nurse/dashboard");
      const res = await axios.get("admin/doctor-list");
      const r = await axios.get("admin/patient-list");
      const nurse = await axios.get("admin/nurse-list");
      dispatch(setNursesList(nurse.data.data));
      dispatch(setDoctorsList(res.data.data));
      dispatch(setPatientsList(r.data.data));
      setDashboardData(result.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  const onEdit = (e) => {
    setPatient(e);
  };
  useEffect(() => {
    const unsubscribe = fetchData(); //subscribe
    return unsubscribe; //unsubscribe
  }, [trigger]);

  return (
    <div>
      <section className="dashboard">
        <div className=" container-fluid p-0">
          <div className="row" data-plugin="matchHeight" data-by-row="true">
            <GraphCards dashboardData={dashboardData} />
            <PatientsList dashboardData={dashboardData} onEdit={onEdit} />
            <EditPatientForm
              patient={patient && patient}
              setTrigger={setTrigger}
              trigger={trigger}
              setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
              setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
            />
            <AddPatientForm
              setTrigger={setTrigger}
              trigger={trigger}
              setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
              setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
            />
            <AddAppointmentModal
              setTrigger={setTrigger}
              trigger={trigger}
              setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
              setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
            />
            <DashboardAppointmentTable
              doctorsList={doctorsList}
              app={setAppointment}
              triger={trigger}
              setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
              setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
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
      </section>
    </div>
  );
};

export default Dashboard;
