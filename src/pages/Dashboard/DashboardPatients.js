import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardPatientList from "../../skeletons/DashboardPatientList";
import DashboardPatient from "../../skeletons/DashboardPatient";
import PatientListing from "./PatientListing";
function DashboardPatients({ dashboardData,onEdit }) {
  const [noOfElement, setNoOfElement] = useState(3);

  const patientsList = useSelector((state) => state.patientsList.patients);

  const slice = patientsList && patientsList.slice(0, noOfElement);

  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  const edit=()=>{
    onEdit(patientsList[0]);
  }
  return (
    <div className="col-xl-6 col-lg-6">
      {/* Widget User list */}
      <div className="card" id="widgetUserList">
        <div className="card-header cover overlay">
          {dashboardData.length !== 0 ? (
            <>
              <img
                className="cover-image h-200"
                src="assets/images/other/dashboard-header.jpg"
                alt="..."
              />
              <div className="overlay-panel vertical-align overlay-background">
                <div className="vertical-align-middle">
                  <a className="avatar avatar-100 float-left mr-20" href="/">
                    <img src="assets/images/other/5.jpg" alt="" />
                  </a>
                  <div className="float-left user-info-box">
                    <div className="font-size-20">
                      {patientsList[0] && patientsList[0].name}
                    </div>
                    <p className="mb-0 text-nowrap">
                      <span className="text-break">
                        <a className="__cf_email__">
                          {patientsList[0] && patientsList[0].tel_no}
                        </a>
                      </span>
                    </p>
                    <div className="text-nowrap font-size-18">
                      <a data-toggle="modal"  data-target="#editPatientModal" onClick={edit}>
                        <i
                          className="icon mdi mdi-pencil-box"
                          aria-hidden="true"
                        />
                      </a>
                      <Link to={`/${patientsList[0]._id}`}>
                        <i className="icon mdi mdi-eye" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ height: "12rem" }}>
              <DashboardPatient />
            </div>
          )}
        </div>
        <div className="card-block py-0">
          <ul className="list-group list-group-full list-group-dividered mb-0">
            {dashboardData.length !== 0
              ? slice &&
                slice.map((patient, idx) => {
                  return (
                    <PatientListing patient={patient} key={idx} onEdit={onEdit}/>
                  );
                })
              : [1, 2, 3].map((elem) => {
                  return (
                    <li
                      style={{ height: "5rem" }}
                      className="list-group-item"
                      key={elem}
                    >
                      <div className="media align-items-center">
                        <DashboardPatientList />
                      </div>
                    </li>
                  );
                })}
          </ul>
          <div className="text-center">
            {patientsList && patientsList.length >= noOfElement && (
              <button className="btn" onClick={() => loadMore()}>
                Load More...
              </button>
            )}
          </div>
          <button
            type="button"
            className="btn-raised btn btn-danger btn-floating"
            data-toggle="modal"
            data-target="#addproModal"
          >
            <i className="icon mdi mdi-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* End Widget User list */}
    </div>
  );
}

export default DashboardPatients;
