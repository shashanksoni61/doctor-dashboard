import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import AddPatientLabModal from "./AddPatientLabModal";
import Snackbar from "../../../components/Alert/SnackBar";
function PatientLab({id,setId}) {
  const [trigger, setTrigger] = useState(false);
  const [loading,setLoading]=useState(false);
  const [labs,setLabs]=useState(false);
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
  useState("");
const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
  useState(false);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientlb/${id}`);
      setLabs(res.data.data.patientlb);
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

  const [noOfElement, setNoOfElement] = useState(3);
  const slice = labs && labs.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  
  return (
    <div class="tab-pane fade" id="patienttab7" role="tabpanel">
      <div className="row mt-4">
        <div className="col-xxl-12 col-lg-12">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule pb-0">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="panel-title pb-0">
                    Patient Laboratory Report
                  </h3>
                </div>
              </div>
              <button
                type="button"
                className="btn-raised btn btn-danger btn-floating "
                data-toggle="modal"
                data-target="#addlabModal"
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
                    <th width="15%">Name</th>
                    <th width="20%">Note</th>
                
                  </tr>
                </thead>
                <tbody>
                  {slice &&
                    slice.map((lab, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{lab.name}</td>
                          <td>{lab.note}</td>
                        </tr>
                      );
                    })}
                </tbody>
                {labs && labs.length >= noOfElement && (
              <button className="btn" onClick={() => loadMore()}>
                Load More...
              </button>
            )}{" "}
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddPatientLabModal id={id} setTrigger={setTrigger}  setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}/>
           <Snackbar
        confirmationSnackbarMessage={confirmationSnackbarMessage}
        confirmationSnackbarOpen={confirmationSnackbarOpen}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      
    </div>
  );
}

export default PatientLab;
