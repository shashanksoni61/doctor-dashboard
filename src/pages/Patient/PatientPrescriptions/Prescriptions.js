import React, { useState,useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddPrescriptionModal from "../PatientPrescriptions/AddPrescriptionModal";
import Snackbar from "../../../components/Alert/SnackBar";
function Prescriptions({ id }) {
  const [trigger, setTrigger] = useState(false);
  const [loading,setLoading]=useState(false);
  const [prescriptions,setPrescreptions]=useState(false);
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
  useState("");
const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
  useState(false);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientPres/${id}`);
      setPrescreptions(res.data.data.patientPres);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [trigger,id]);
  const history = useHistory();
  const [noOfElement, setNoOfElement] = useState(3);
  const slice = prescriptions && prescriptions.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  
  return (
    <div class="tab-pane fade" id="patienttab6" role="tabpanel">
      <div className="row mt-4">
        <div className="col-xxl-12 col-lg-12">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule pb-0">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="panel-title pb-0">Prescription List</h3>
                </div>
              </div>
              <button
                type="button"
                className="btn-raised btn btn-danger btn-floating "
                data-toggle="modal"
                data-target="#prescriptionModal"
              >
                <i className="icon mdi mdi-plus" aria-hidden="true" />
              </button>
            </div>
            <hr />
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th width="15%">S.No</th>

                    <th width="15%">Date</th>
                    <th width="20%">Name</th>
                    <th width="20%">Doses</th>
                    <th width="15%">Interval</th>
                  </tr>
                </thead>
                <tbody>
                  {slice &&
                    slice.map((prescription, idx) => {
                     
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>

                          <td>{prescription.date.substring(0, 10)}</td>
                          <td>{prescription.name}</td>
                          <td>{prescription.dose}</td>
                          <td>{prescription.interval}</td>
                        </tr>
                      );
                    })}
                </tbody>
                {prescriptions && prescriptions.length >= noOfElement && (
                  <button className="btn" onClick={() => loadMore()}>
                    Load More...
                  </button>
                )}{" "}
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddPrescriptionModal id={id} setTrigger={setTrigger}  setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}/>
           <Snackbar
        confirmationSnackbarMessage={confirmationSnackbarMessage}
        confirmationSnackbarOpen={confirmationSnackbarOpen}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      
    </div>
  );
}

export default Prescriptions;
