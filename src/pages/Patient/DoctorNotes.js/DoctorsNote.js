import React, { useState, useEffect } from "react";
import axios from "axios";
import AddDoctorNoteModal from "./AddDoctorNoteModal";
import timeDifference from "../../../utils/timeDifference";
import Snackbar from "../../../components/Alert/SnackBar";
import { useSelector } from "react-redux";
import EditDoctorNote from "./EditDoctorNote";
import Note from "./Note";
function DoctorsNotes({ id }) {
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [docNotes, setDocNotes] = useState([]);
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  const [note, setNote] = useState();

  const setnote = (not) => {
    setNote(not);
  };
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientDocNote/${id}`);
      setDocNotes(res.data.data.patientDocNote);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  function getDocName(id) {
    const doctor_name = doctorsList.filter((elem, ind) => {
      return elem._id === id;
    });
    return doctor_name;
  }

  useEffect(() => {
    fetchData();
  }, [id, trigger]);
  return (
    <div class="tab-pane fade" id="patienttab2" role="tabpanel">
      <div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="panel ">
              <div className="row">
                <div className="col-md-10 m-auto">
                  <div className="p-5">
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-raised btn btn-danger btn-floating "
                        data-toggle="modal"
                        data-target="#addnoteModal"
                      >
                        <i className="icon mdi mdi-plus" aria-hidden="true" />
                      </button>
                    </div>

                    {docNotes &&
                      docNotes.map((note, idx) => {
                        
                        return idx % 2 == 0 ? (
                          <Note
                            key={idx}
                            note={note}
                            clas=""
                            Edit={setnote}
                            setTrigger={setTrigger}
                            setConfirmationSnackbarMessage={
                              setConfirmationSnackbarMessage
                            }
                            setConfirmationSnackbarOpen={
                              setConfirmationSnackbarOpen
                            }
                            trigger={trigger}
                          />
                        ) : (
                          <Note
                            key={idx}
                            note={note}
                            clas="timeline-inverted"
                            Edit={setnote}
                            setTrigger={setTrigger}
                            setConfirmationSnackbarMessage={
                              setConfirmationSnackbarMessage
                            }
                            setConfirmationSnackbarOpen={
                              setConfirmationSnackbarOpen
                            }
                            trigger={trigger}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddDoctorNoteModal
        id={id}
        setTrigger={setTrigger}
        setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      <EditDoctorNote
        id={id}
        doctorNotes={note}
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

export default DoctorsNotes;
