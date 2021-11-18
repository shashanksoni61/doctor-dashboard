import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
function AddAppointmentModal(props) {
  const {
    setTrigger,
    trigger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm({
    mode: "onTouched",
  });

  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const patientsList = useSelector((state) => state.patientsList.patients);
  const onSubmitAppointment = async (data) => {
    let st = data.start_time.getHours();
    let et = data.end_time.getHours();
    if (st < 10) st = "0" + st;
    if (et < 10) et = "0" + et;
    data = {
      ...data,
      start_time: st + ":" + data.start_time.getMinutes(),
      end_time: et + ":" + data.end_time.getMinutes(),
    };

    await axios
      .post("/nurse/addPatientAppointment", data)
      .then((response) => {
        setConfirmationSnackbarMessage(
          "Patient Appointment succesfully added!"
        );
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Save!");
        setConfirmationSnackbarOpen(true);
      });
  };
  const minTime = new Date();
  minTime.setHours(8);
  minTime.setMinutes(0);

  const maxTime = new Date();
  maxTime.setHours(17);
  maxTime.setMinutes(0);

  return (
    <>
      <div
        className="modal fade"
        id="addAppointmentModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Add Appointment
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
              <form
                className="forms-sample"
                onSubmit={handleSubmit2(onSubmitAppointment)}
              >
                <p className="formErrors">{errors2.doctor_id?.message}</p>

                <div className="form-group">
                  <label htmlFor="exampleInputName4">
                    Select Doctor<sup>*</sup>
                  </label>

                  <select
                    className="form-control"
                    name="doctor_id"
                    id="select-new2"
                    {...register2("doctor_id", {
                      required: "Doctor is required",
                    })}
                  >
                    {doctorsList.map((doctor, idx) => {
                      return (
                        <option key={idx} value={doctor._id}>
                          {doctor.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p className="formErrors">{errors2.patient_id?.message}</p>

                <div className="form-group">
                  <label htmlFor="exampleInputName4">
                    Select Patient<sup>*</sup>
                  </label>

                  <select
                    className="form-control"
                    name="patient_id"
                    id="select-new2"
                    {...register2("patient_id", {
                      required: "Patient is required",
                    })}
                  >
                    {patientsList.map((patient, idx) => {
                      return (
                        <option key={idx} value={patient._id}>
                          {patient.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p className="formErrors">{errors2.status?.message}</p>

                <div className="form-group">
                  <label htmlFor="status">
                    Set Status<sup>*</sup>
                  </label>

                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    {...register2("status", {
                      required: "Status is required",
                    })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Arrived">Arrived</option>
                    <option value="OTW">OTW</option>
                    <option value="Waiting">Waiting</option>
                    <option value="set">Set</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </div>
                <p className="formErrors">
                  {errors2.appointment_date?.message}
                </p>
                <div className="form-group">
                  <label htmlFor="exampleTextarea1">
                    Select Date<sup>*</sup>
                  </label>
                  <Controller
                    control={control2}
                    name="appointment_date"
                    render={({ field }) => (
                      <DatePicker
                        autoComplete="off"
                        selected={field.value}
                        showMonthDropdown
                        minDate={new Date()}
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Select Appointment Date"
                        isClearable
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="formErrors">{errors2.start_time?.message}</p>

                  <div className="form-group">
                    <label htmlFor="exampleInputName4">
                      Start Time<sup>*</sup>
                    </label>
                    <Controller
                      control={control2}
                      name="start_time"
                      render={({ field }) => (
                        <DatePicker
                          autoComplete="off"
                          selected={field.value}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={20}
                          timeCaption="Time"
                          placeholderText="Select Start Time"
                          timeFormat="hh:mm aa"
                          dateFormat="hh:mm aa"
                          minTime={minTime}
                          maxTime={maxTime}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName4">
                      End Time<sup>*</sup>
                    </label>
                    <Controller
                      control={control2}
                      name="end_time"
                      render={({ field }) => (
                        <DatePicker
                          autoComplete="off"
                          selected={field.value}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={20}
                          timeCaption="Time"
                          placeholderText="Select End Time"
                          timeFormat="hh:mm aa"
                          dateFormat="hh:mm aa"
                          minTime={minTime}
                          maxTime={maxTime}
                          {...field}
                        />
                      )}
                    />
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
    </>
  );
}

export default AddAppointmentModal;
