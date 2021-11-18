import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPatientPayment from "./AddPatientPayment";
import Snackbar from "../../../components/Alert/SnackBar";
import { setServicesList } from "../../../redux/actions/serviceListActions";
import { useDispatch, useSelector } from "react-redux";
function Payment({ id }) {
  const dispatch=useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState(false);
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientPayment/${id}`);
      setPayments(res.data.data.patientPayment);
      const result = await axios.get("nurse/serviceList");
      dispatch(setServicesList(result.data.data));
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
  const slice = payments && payments.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  return (
    <div class="tab-pane fade" id="patienttab5" role="tabpanel">
      <div className="row mt-4">
        
        <div className="col-xxl-12 col-lg-12">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule pb-0">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="panel-title pb-0">Payment List</h3>
                </div>
              </div>
              <button
                type="button"
                className="btn-raised btn btn-danger btn-floating "
                data-toggle="modal"
                data-target="#paymentModal"
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
                    <th width="15%">Bawe Commission</th>
                    <th width="20%">Cost</th>
                    <th width="20%">Medication</th>
                    <th width="15%">Doctor Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {payments &&
                    payments.map((payment, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{payment.bawe_commision}</td>
                          <td>{payment.date.substring(0, 10)}</td>
                          <td>{payment.cost}</td>
                          <td>{payment.medication}</td>
                          <td>{payment.doctor_commision}</td>
                        </tr>
                      );
                    })}
                </tbody>
                {slice && slice.length >= noOfElement && (
                  <button className="btn" onClick={() => loadMore()}>
                    Load More...
                  </button>
                )}{" "}
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddPatientPayment
        id={id}
        setTrigger={setTrigger}
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

export default Payment;
