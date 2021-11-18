import React from "react";
import { Link } from "react-router-dom";

function PatientListing({ patient,onEdit }) {
    const edit = () => {
        onEdit(patient);
      };
  return (
    <li className="list-group-item">
      <div className="media align-items-center">
        <div className="pr-20">
          <a className="avatar avatar-lg" href="/">
            <img
              className="img-responsive"
              src="assets/images/other/5.jpg"
              alt="..."
            />
          </a>
        </div>
        <div className="media-body">
          <h5 className="mt-0 mb-0">{patient.name}</h5>
          <small>{patient.tel_no}</small>
          <div className="edit-icon">
            <a
              data-toggle="modal"
              data-target="#editPatientModal"
              className="white mr-10"
              onClick={edit}
            >
              <i className="icon mdi mdi-pencil" />
            </a>
            <Link to={`/${patient._id}`}>
              <i className="icon mdi mdi-eye" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PatientListing;
