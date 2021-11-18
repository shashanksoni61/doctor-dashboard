import React, { useState, useEffect } from "react";
import Snackbar from "../../../components/Alert/SnackBar";
import AddEmergency from "./AddEmergency";
import axios from "axios";

function Emergency({ id }) {
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  const [trigger, setTrigger] = useState(false);
  const [emer, setEmer] = useState();

  const fetch = async () => {
    try {
      const res = await axios.post(`/nurse/patientEmerContact/${id}`);
      setEmer(res.data.data.patient_emer_contact);
    } catch (error) {
      console.error("error",error);
    } 
  }

  useEffect(() => {
    fetch();
  }, [trigger, id])

  return (
    <div
      class="tab-pane fade show active"
      id="Emergency"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <div>
        <div class="row mt-4">
          <div class="col-xxl-12 col-lg-12">
            <div class="panel" id="projects-status">
              <div class="panel-heading appointment-schedule pb-0">
                <div class="row align-items-center">
                  <div class="col-md-6">
                    <h3 class="panel-title pb-0">Emergency Contact List</h3>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn-raised btn btn-danger btn-floating "
                  data-toggle="modal"
                  data-target="#add-recordModal"
                >
                  <i class="icon mdi mdi-plus" aria-hidden="true"></i>
                </button>
              </div>

              <hr />

              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th width="15%">S.No</th>
                      <th width="20%">Name</th>
                      <th width="25%">Email</th>
                      <th width="20%">Telephone</th>
                      <th width="20%">Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emer && emer.map((elem,idx) => {
                      return (
                        <tr key={elem._id}>
                        <td>{idx+1}</td>
                        <td>{elem.name}</td>
                        <td>{elem.email}</td>
                        <td>{elem.tel_no}</td>
                        <td>{elem.mobile}</td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEmergency
        id={id}
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
  );
}

export default Emergency;
