import React from "react";
import { useSelector } from "react-redux";
import DashboardPatient from "../../../skeletons/DashboardPatient";
import EditPatientForm from "../../Dashboard/EditPatientForm";
function ProfileCard() {
  const patientInfo = useSelector((state) => state.patientInfo.patient);
  return (
    <div className="card mb-3 patient-box" id="widgetUserList">
      <div className="card-header cover overlay">
        <img
          className="cover-image h-200"
          src="assets/images/other/dashboard-header.jpg"
          alt="..."
        />
        <div className="overlay-panel vertical-align overlay-background">
          <div className="row w-100 align-items-center">
            {patientInfo.personalDetails?
            <div className="col-md-3">
              <div className="vertical-align-middle patient-details">
                <a className="avatar avatar-100 float-left mr-20" href="/">
                  <img src="assets/images/other/5.jpg" alt="" />
                </a>
                <div className="float-left user-info-box">
                  <div className="font-size-20">
                    {patientInfo.personalDetails &&
                      patientInfo.personalDetails.name}
                  </div>
                  <p className="mb-0 text-nowrap">
                    <span className="text-break">
                      <a href className="__cf_email__">
                        {patientInfo.personalDetails &&
                          patientInfo.personalDetails.mobile}
                      </a>
                    </span>
                  </p>
                  <div className="text-nowrap font-size-18">
                    <a data-toggle="modal"
                      data-target="#editPatientModal" className="white mr-10">
                      <i className="icon mdi mdi-pencil-box" />
                    </a>
                    <a
                      
                      className="white mr-10"
                    >
                      <i className="icon mdi mdi-eye" />
                    </a>
                  </div>
                </div>
              </div>
            </div>:<div className="col-md-3"><DashboardPatient/></div>}
            <div class="col-md-9">
              <div class="other-details-patient">
                <ul>
                  <li>
                    <p>Gender</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.gender}
                    </h5>
                  </li>
                  <li>
                    <p>Age</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.age}
                    </h5>
                  </li>
                  <li>
                    <p>Address</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.address}
                    </h5>
                  </li>
                  <li>
                    <p>Email</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.email}
                    </h5>
                  </li>
                  <li>
                    <p>Birthday</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.birthday.substring(0, 10)}
                    </h5>
                  </li>
                  <li>
                    <p>Occupation</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.occupation}
                    </h5>
                  </li>
                  <li>
                    <p>Mobile</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.mobile}
                    </h5>
                  </li>
                  <li>
                    <p>Tel Number</p>
                    <h5>
                      {patientInfo.personalDetails &&
                        patientInfo.personalDetails.tel_no}
                    </h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-btn">
          <a
            href
            className="btn btn-gradient-primary mr-2 white-color"
            data-toggle="modal"
            data-target="#addContactTracingModal"
          >
            Contact Tracing
          </a>
        </div>
      </div>
      <EditPatientForm patient={patientInfo.personalDetails}/>
    </div>
  );
}

export default ProfileCard;
