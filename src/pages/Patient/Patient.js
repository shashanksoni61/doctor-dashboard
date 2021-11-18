import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MedicalQuestions from "./MedicalQuestions/MedicalQuestions";
import { setPatientInfo } from "../../redux/actions/patientInfoActions";
import Medications from "./Medications/Medications";
import Documents from "./Documents/Documents";
import Prescriptions from "./PatientPrescriptions/Prescriptions";
import PatientLab from "./PatientLaboratory/PatientLab";
import ContactTracing from "./ContactTracing";
import VisitLog from "./VisitLog/VisitLog";
import Payment from "./Payment/Payment";
import ProfileCard from "./PatientProfileCard/ProfileCard";
import { setPatientsList } from "../../redux/actions/patientListActions";
import "react-datepicker/dist/react-datepicker.css";
import EditPatientForm from "../Dashboard/EditPatientForm";
import { useHistory, useParams } from "react-router-dom";
import Snackbar from "../../components/Alert/SnackBar";

import { setDoctorsList } from "../../redux/actions/doctorActions";
import PatientsList from "./PatientsList";
import Emergency from "./Emergency/Emergency";
import DoctorsNotes from "./DoctorNotes.js/DoctorsNote";

const Patient = () => {
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  const [trigger, setTrigger] = useState(false);
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const patientInfo = useSelector((state) => state.patientInfo.patient);
  const patientsList = useSelector((state) => state.patientsList.patients);
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState(
    params.id ? params.id : "6103f172ef6ebe0359c9e411"
  );
  useEffect(() => {}, [trigger]);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientDetails/${id}`);
      const result = await axios.get("nurse/dashboard");
      const res2 = await axios.get("doctor/list");
      dispatch(setDoctorsList(res2.data.data));
      dispatch(setPatientsList(result.data.data.patient_list));
      dispatch(setPatientInfo(res.data.data));
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <section className="dashboard">
        <div className=" container-fluid p-0">
          <div className="row" data-plugin="matchHeight" data-by-row="true">
            <div className="col-xl-12 col-lg-12">
              <PatientsList id={id} setId={setId} />
              {/* Widget User list */}
              <ProfileCard />
              <div className="tabs-list-patient doctor-tab">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#Emergency"
                      role="tab"
                      aria-controls="Emergency"
                      aria-selected="true"
                    >
                      Emergency
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab1"
                      role="tab"
                      aria-controls="patienttab1"
                      aria-selected="true"
                    >
                      Health Details
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab2"
                      role="tab"
                      aria-controls="patienttab2"
                      aria-selected="false"
                    >
                      Doctor's Notes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab3"
                      role="tab"
                      aria-controls="patienttab3"
                      aria-selected="false"
                    >
                      Document
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab4"
                      role="tab"
                      aria-controls="patienttab4"
                      aria-selected="false"
                    >
                      Visit logs
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab5"
                      role="tab"
                      aria-controls="patienttab5"
                      aria-selected="false"
                    >
                      Payment
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab6"
                      role="tab"
                      aria-controls="patienttab6"
                      aria-selected="false"
                    >
                      Prescription
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab7"
                      role="tab"
                      aria-controls="patienttab7"
                      aria-selected="false"
                    >
                      Laboratory
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade"
                  id="patienttab1"
                  role="tabpanel"
                >
                  <div>
                    <div className="row mt-4">
                      <MedicalQuestions
                        patient_id={id}
                        setTrigger={setTrigger}
                        setConfirmationSnackbarMessage={
                          setConfirmationSnackbarMessage
                        }
                        setConfirmationSnackbarOpen={
                          setConfirmationSnackbarOpen
                        }
                      />
                      <Medications id={id} />
                    </div>
                  </div>
                </div>
                <DoctorsNotes id={id} />
                <Documents id={id} />
                <VisitLog id={id} />
                <Payment id={id} />
                <Emergency id={id} />
                <Prescriptions id={id} />
                <PatientLab id={id} />
              </div>
            </div>
          </div>
        </div>
        <ContactTracing
          patient_id={id}
          setTrigger={setTrigger}
          trigger={trigger}
          setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
          setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
        />
      </section>
      <Snackbar
        confirmationSnackbarMessage={confirmationSnackbarMessage}
        confirmationSnackbarOpen={confirmationSnackbarOpen}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      <EditPatientForm patient={patientsList[0] && patientsList[0]} />
    </div>
  );
};

export default Patient;
