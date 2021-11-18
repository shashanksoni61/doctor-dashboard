import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
function EditPatientForm(props) {
  const {
    patient,
    setTrigger,
    trigger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: patient && patient.name,
      doctor_id: patient && patient.doctor_id,
      gender: patient && patient.gender,
      email: patient && patient.email,
      age: patient && patient.age,
      mobile: patient && patient.mobile,
      address: patient && patient.address,
      occupation: patient && patient.occupation,
      tel_no: patient && patient.tel_no,
    },
  });
  useEffect(() => {
    let defaults = {
      name: patient && patient.name,
      doctor_id: patient && patient.doctor_id,
      gender: patient && patient.gender,
      email: patient && patient.email,
      age: patient && patient.age,
      mobile: patient && patient.mobile,
      address: patient && patient.address,
      occupation: patient && patient.occupation,
      tel_no: patient && patient.tel_no,
      birthday: patient && new Date(patient.birthday),
    };
    reset(defaults);
  }, [patient, reset]);
  const [startDate, setStartDate] = useState(new Date());
  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const onSubmit = async (data) => {
    data = { ...data, patient_id: patient._id };
    const result = await axios
      .post("/nurse/updatePatient", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Patient updated succesfully!");
        setConfirmationSnackbarOpen(true);
        setStartDate(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to update!");
        setConfirmationSnackbarOpen(true);
      });
  };

  return (
    <div
      className="modal fade"
      id="editPatientModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Patient
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
              <div className="row">
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.name?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Patient Name
                      <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Patient Name"
                      {...register("name", {
                        required: "patient Name is required",
                        pattern: {
                          value: /^[a-zA-Z ]*$/,
                          message: "Alphabets are only allowed",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
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
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.gender?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Select Gender<sup>*</sup>
                    </label>
                    <div>
                      <select
                        className="form-control"
                        name="gender"
                        id="select-new1"
                        {...register("gender", {
                          required: "gender is required",
                        })}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.birthday?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleTextarea1">
                      Birthday<sup>*</sup>
                    </label>
                    <Controller
                      control={control}
                      name="birthday"
                      placeholderText="Select DOB"
                      {...register("birthday", {
                        required: "Birthday is required",
                      })}
                      render={({ field }) => (
                        <DatePicker
                          autoComplete="off"
                          selected={field.value}
                          onChange={(date) => setStartDate(date)}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="select DOB"
                          isClearable
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.email?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      E-mail<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter E-mail"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.age?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Age<sup>*</sup>
                    </label>
                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      placeholder="Enter Age"
                      {...register("age", {
                        required: "Age  is required",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.mobile?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Mobile Number<sup>*</sup>
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      {...register("mobile", {
                        required: "Mobile Number is required",
                        pattern: {
                          value: /^[0-9\b]+$/,
                          message: "exact 10 numbers required",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.address?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Address<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter Address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.occupation?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Occupation<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      className="form-control"
                      placeholder="Enter Occupation"
                      {...register("occupation", {
                        required: "occupation is required",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <p className="formErrors">{errors.tel_no?.message}</p>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Phone Number</label>
                    <input
                      type="number"
                      name="tel_no"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      {...register("tel_no", {
                        required: "Phone Number is required",
                      })}
                    />
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPatientForm;
