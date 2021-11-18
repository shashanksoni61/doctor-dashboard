import React, { useState, useEffect } from "react";

import axios from "axios";
import AddDocumentModal from "./AddDocumentModal";
import Snackbar from "../../../components/Alert/SnackBar";
import EditDocumentModal from "./EditDocumentModal";
import DocumentModal from "./DocumentModal";
function Documents({ id }) {
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [doc, setDoc] = useState();
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");
  const [confirmationSnackbarOpen, setConfirmationSnackbarOpen] =
    useState(false);
  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientDoc/${id}`);
      setDocuments(res.data.data.patientDoc);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  const docu = (docs) => {
    setDoc(docs);
  };
  useEffect(() => {
    fetchData();
  }, [trigger, id]);
  const [noOfElement, setNoOfElement] = useState(3);
  const slice = documents && documents.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  return (
    <div class="tab-pane fade" id="patienttab3" role="tabpanel">
      <div className="row mt-4">
        <div className="col-xxl-12 col-lg-12">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="panel-title">Documents</h3>
                </div>
                {/* <button
                  type="button"
                  className="btn-raised btn btn-danger btn-floating "
                  data-toggle="modal"
                  data-target="#addDocumentModal"
                >
                  <i className="icon mdi mdi-plus" aria-hidden="true" />
                </button> */}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td>S.No</td>
                    <td>Date</td>
                    <td>Title</td>
                    <td>Descriprion</td>
                    <td>Uploaded Document</td>
                    <td className="text-left">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {slice &&
                    slice.map((document, idx) => {
                      return (
                        <DocumentModal
                          document={document}
                          key={idx}
                          idx={idx}
                          docu={docu}
                        />
                      );
                    })}
                </tbody>
                {documents && documents.length >= noOfElement && (
                  <button className="btn" onClick={() => loadMore()}>
                    Load More...
                  </button>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddDocumentModal
        id={id}
        setTrigger={setTrigger}
        trigger={trigger}
        setConfirmationSnackbarMessage={setConfirmationSnackbarMessage}
        setConfirmationSnackbarOpen={setConfirmationSnackbarOpen}
      />
      <EditDocumentModal
        id={id}
        setTrigger={setTrigger}
        trigger={trigger}
        document={doc}
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

export default Documents;
