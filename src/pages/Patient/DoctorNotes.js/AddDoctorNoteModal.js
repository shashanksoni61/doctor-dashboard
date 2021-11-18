import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
function AddDoctorNoteModal(props) {
  const { id, setTrigger, setShow,setConfirmationSnackbarOpen, setConfirmationSnackbarMessage}=props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const onSubmit = async (data) => {
    data = { ...data, patient_id: id, date: new Date() };
    const result = await axios
    .post("/nurse/addPatientDocNote", data)
    .then((response) => {
      setConfirmationSnackbarMessage("Doctor's Note succesfully added!");
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
      id="addnoteModal"
      role="dialog"
      aria-labelledby=""
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Note
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
              {/* <p className="formErrors">{errors.patientName?.message}</p>
                <div className="form-group">
                  <label htmlFor="exampleInputName1">
                    Name<sup>*</sup>
                  </label>
                  <input
                      type="text"
                      name="patientName"
                      className="form-control"
                      placeholder="Enter Patient Name"
                      {...register("patientName", {
                        required: "patient Name is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Alphabets are only allowed",
                        },
                      })}
                    />
                </div> */}
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
              <p className="formErrors">{errors.doctor_id?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Select doctor<sup>*</sup>
                </label>
                <div>
                  <select
                    id="select-new"
                    className="form-control"
                    name="doctor_id"
                    {...register("doctor_id", {
                      required: "Doctor is required",
                    })}
                  >
                    {doctorsList &&
                      doctorsList.map((doctor, idx) => {
                        return (
                          <option value={doctor._id} key={idx}>
                            {doctor.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-gradient-primary mr-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctorNoteModal;
