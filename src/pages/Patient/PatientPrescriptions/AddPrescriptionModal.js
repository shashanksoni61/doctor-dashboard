import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
function AddPrescriptionModal(props) {
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
  const [startDate, setStartDate] = useState(new Date());
  const onSubmit = async (data) => {
    data = { ...data, patient_id: id };
    const result = await axios
      .post("/nurse/addPatientPrescription", data)
      .then((response) => {
        setConfirmationSnackbarMessage(
          "Patient Prescription succesfully added!"
        );
        setConfirmationSnackbarOpen(true);
        setStartDate(true);
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
      id="prescriptionModal"
      role="dialog"
      aria-labelledby=""
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Prescription list
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
                  name="patientName"
                  className="form-control"
                  placeholder="Enter  Name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Alphabets are only allowed",
                    },
                  })}
                />
              </div>

              <p className="formErrors">{errors.date?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleTextarea1">
                  Date<sup>*</sup>
                </label>
                <Controller
                  control={control}
                  name="date"
                  placeholderText="Select Date"
                  render={({ field }) => (
                    <DatePicker
                      autoComplete="off"
                      selected={field.value}
                      onChange={(date) => setStartDate(date)}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="select Date"
                      isClearable
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="formErrors">{errors.dose?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Dose<sup>*</sup>
                </label>
                <input
                  type="number"
                  name="dose"
                  className="form-control"
                  placeholder="Enter Number of Dose"
                  {...register("dose", {
                    required: "Dose  is required",
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Interval
                  <sup>*</sup>
                </label>
                <div>
                  <select
                    className="form-control"
                    name="interval"
                    // id="select-new3"
                    {...register("interval", {
                      required: "interval  is required",
                    })}
                  >
                    <option>2 Daily</option>
                    <option>3 Daily</option>
                    <option>In Morning</option>
                    <option>In Evening</option>
                  </select>
                </div>
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

export default AddPrescriptionModal;
