import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
function AddPatientLabModal(props) {
  const {
    id,
    setTrigger,
    setShow,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data = { ...data, patient_id: id };
    const result = await axios
      .post("/nurse/addPatientLabNote", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Patient Lab Note succesfully added!");
        setConfirmationSnackbarOpen(true);
        setTrigger(true);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Save!");
        setConfirmationSnackbarOpen(true);
      });
  };
  return (
    <div
      className="modal fade"
      id="addlabModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Laboratory Report
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
              <p className="formErrors">{errors.name?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Patient Name"
                  {...register("name", {
                    required: " Name is required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Alphabets are only allowed",
                    },
                  })}
                />
              </div>
              <div className="form-group">
                <p className="formErrors">{errors.note?.message}</p>
                <label htmlFor="exampleTextarea1">
                  Add Note<sup>*</sup>
                </label>
                <textarea
                  type="text"
                  name="note"
                  rows={4}
                  className="form-control"
                  placeholder="Enter Address"
                  {...register("note", {
                    required: "Note is required",
                  })}
                />
              </div>

              <button type="submit" className="btn btn-gradient-primary mr-2">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatientLabModal;
