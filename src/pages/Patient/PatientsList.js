import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Snackbar from "../../components/Alert/SnackBar";
import AddPatientForm from "../Dashboard/AddPatientForm";
function PatientsList({id,setId}) {
    const patientsList = useSelector((state) => state.patientsList.patients);
    const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
    const history=useHistory();
    const handleSelect = (e) => {
        setId(e.value);
        history.push(`/${id}`);
      };
  return (
    <>
    <div className="mb-3 d-flex w-100 align-items-center auto-fill-patient">
      {/* <select
        className="form-control"
        name="patient_id"
        onChange={handleSelect}
      >
        {patientsList &&
          patientsList.map((patient, idx) => {
            return (
              <option value={patient._id} key={idx}>
                {patient.name}
              </option>
            );
          })}
      </select> */}
       <Select
        className="form-control"
        name="patient_id"
        onChange={handleSelect}
        isSearchable
        style={{outline: 'none'}}
        options={patientsList &&
            patientsList.map((patient, idx) => {
              return {
                 value:patient._id,
                  label:patient.name
              }
            })}
      ></Select>


      <div className="col-md-3 rounded text-center">
        <button
          type="button"
          className="btn-raised btn btn-danger btn-floating"
          data-toggle="modal"
          data-target="#addproModal"
        >
          <i className="icon mdi mdi-plus" aria-hidden="true" />
        </button>
      </div>
      <Snackbar
              confirmationSnackbarMessage={confirmationSnackbarMessage}
              confirmationSnackbarOpen={confirmationSnackbarOpen}
              setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
            />
    </div>
    <AddPatientForm
        setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
    </>
  );
}

export default PatientsList;
