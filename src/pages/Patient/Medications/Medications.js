import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMedicationModal from "./AddMedicationModal";
import Snackbar from "../../../components/Alert/SnackBar";
import PatientTabSkeleton from "../../../skeletons/PatientTabSkeleton";
function Medications({ id }) {
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);
  const [medications, setMedications] = useState(false);
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/listofmedication/${id}`);
      setMedications(res.data.data.listofmedication);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [id, trigger]);
  const [noOfElement, setNoOfElement] = useState(3);
  const slice = medications && medications.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  return (
    <>
      {medications ? (
        <div className="col-md-5">
          <div className="panel">
            <div className="panel-heading pb-0">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <h3 className="panel-title">Medications</h3>
                  {/* <button
                    type="button"
                    className="btn-raised btn btn-danger btn-floating float-right"
                    data-toggle="modal"
                    onClick={() => setShow(true)}
                    data-target="#addMedicationModal"
                  >
                    <i className="icon mdi mdi-plus" aria-hidden="true" />
                  </button> */}
                </div>
              </div>
            </div>

            <div className="table-responsive p-3">
              <table className="table table-striped madication-table">
                <thead>
                  <tr>
                    <th scope="col">S. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Interval</th>
                    <th scope="col">Doses</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {slice &&
                    slice.map((medication, idx) => {
                      return (
                        <tr key={idx}>
                          <th scope="row">{idx + 1}</th>
                          <td>{medication.name}</td>
                          <td>{medication.interval}</td>
                          <td>{medication.dose}</td>
                          <td>{medication.date.substring(0, 10)}</td>
                        </tr>
                      );
                    })}
                </tbody>
                {medications && medications.length >= noOfElement && (
                  <button className="btn" onClick={() => loadMore()}>
                    Load More...
                  </button>
                )}{" "}
              </table>
            </div>
          </div>
          <AddMedicationModal
            id={id}
            setTrigger={setTrigger}
            setShow={setShow}
            setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
            setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
          />
          <Snackbar
            confirmationSnackbarMessage={confirmationSnackbarMessage}
            confirmationSnackbarOpen={confirmationSnackbarOpen}
            setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
          />
        </div>
      ) : (
        <div className="col-md-5">
          <div className="table-responsive p-3">
            <PatientTabSkeleton />
          </div>
        </div>
      )}
    </>
  );
}

export default Medications;
