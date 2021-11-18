import React, { useEffect, useState } from "react";
import axios from "axios";
function VisitLog({ id }) {
  const [visitorLog, setVisitorLog] = useState([]);
  async function fetchData() {
    try {
      const res = await axios.post(`/nurse/visitorLog/${id}`);

      setVisitorLog(res.data.data.visitorLogData);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div class="tab-pane fade" id="patienttab4" role="tabpanel">
      <div className="row mt-4">
        <div className="col-xxl-12 col-lg-12">
          <div className="panel" id="projects-status">
            <div className="panel-heading appointment-schedule">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h3 className="panel-title">Visit Log</h3>
                </div>
              </div>
              {/* <button
                type="button"
                className="btn-raised btn btn-danger btn-floating "
                data-toggle="modal"
                data-target="#paymentModal"
              >
                <i className="icon mdi mdi-plus" aria-hidden="true" />
              </button> */}
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLog &&
                    visitorLog.map((visit, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{visit.date.substring(0, 10)}</td>
                          <td>{visit.time_in}</td>
                          <td>{visit.time_out}</td>
                          <td>{visit.status}</td>
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
  );
}

export default VisitLog;