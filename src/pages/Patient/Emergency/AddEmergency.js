import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function AddEmergency(props) {
  const {
    id,
    setTrigger,
    trigger,
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
    await axios
      .post("/nurse/addPatientEmerContact", data)
      .then((response) => {
        setConfirmationSnackbarMessage(
          "Patient Emergency Contact succesfully added!"
        );
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Save!");
        setConfirmationSnackbarOpen(true);
      });
  };
  return (
    <div
      className="modal fade"
      id="add-recordModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Emergency
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
                  placeholder="Name"
                  {...register("name", {
                    required: "* Name is required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Alphabets are only allowed",
                    },
                  })}
                />
              </div>

              <p className="formErrors">{errors.email?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleTextarea1">
                  Email Address<sup>*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  {...register("email", {
                    required: "* Email Address is required",
                  })}
                />
              </div>

              <p className="formErrors">{errors.tel_no?.message}</p>

              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Telephone Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="tel_no"
                  className="form-control"
                  placeholder="Telephone Number"
                  {...register("tel_no", {
                    required: "* Telephone Number is required",
                  })}
                />
              </div>
              <p className="formErrors">{errors.mobile?.message}</p>

              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Mobile Number<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder="Mobile Number"
                  {...register("mobile", {
                    required: "* Mobile Number is required",
                  })}
                />
              </div>
              <p className="formErrors">{errors.relationship?.message}</p>

              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Relationship<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="relationship"
                  className="form-control"
                  placeholder="Relationship"
                  {...register("relationship", {
                    required: "* Relationship is required",
                  })}
                />
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

export default AddEmergency;
