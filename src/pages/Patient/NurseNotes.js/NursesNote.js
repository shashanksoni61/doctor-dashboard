import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNurseNoteModal from "./AddNurseNoteModal";
import EditNurseNote from "./EditNurseNote";
import Snackbar from "../../../components/Alert/SnackBar";
import Note from "./Note";
function NurseNotes({ id }) {
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nurseNotes, setNurseNotes] = useState(false);
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
      const res = await axios.post(`/nurse/patientNurNote/${id}`);
      setNurseNotes(res.data.data.patientNurNote);
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

  return (
    <div class="tab-pane fade" id="nursenote" role="tabpanel">
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
                        data-target="#addnursenoteModal"
                      >
                        <i className="icon mdi mdi-plus" aria-hidden="true" />
                      </button>
                    </div>
                    {nurseNotes &&
                      nurseNotes.map((note, idx) => {
                        return idx % 2 == 0 ? (
                          <Note key={idx} note={note} clas="" Edit={setnote} />
                        ) : (
                          <Note key={idx} note={note} clas="timeline-inverted" Edit={setnote} />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNurseNoteModal
        id={id}
        setTrigger={setTrigger}
        setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      <EditNurseNote
        id={id}
        nurseNotes={note}
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

export default NurseNotes;
