import React, { useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";

function EditAppointmentModal(props) {
  const {
    appointment,
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
    reset,
  } = useForm({
    defaultValues: {
      doctor_id: appointment && appointment.doctor_id,
      appointment_date: appointment && new Date(appointment.appointment_date),
      patient_id: appointment && appointment.patient_id,
    },
  });

  const doctorsList = useSelector((state) => state.doctorsList.doctors);
  const patientsList = useSelector((state) => state.patientsList.patients);

  const StartTime = () => {
    const date = appointment && new Date(appointment.appointment_date);
    date.setHours(parseInt(appointment.start_time.substring(0, 2)));
    date.setMinutes(parseInt(appointment.start_time.substring(3)));
    return date;
  };

  const EndTime = () => {
    const date = appointment && new Date(appointment.appointment_date);
    date.setHours(parseInt(appointment.end_time.substring(0, 2)));
    date.setMinutes(parseInt(appointment.end_time.substring(3)));
    return date;
  };

  useEffect(() => {
    let defaults = {
      doctor_id: appointment && appointment.doctor_id,
      appointment_date: appointment && new Date(appointment.appointment_date),
      patient_id:
        window.location.pathname === "/dashboard" ||
        window.location.pathname === "/Dashboard" ||
        window.location.pathname === "/"
          ? appointment && appointment.patient_id._id
          : appointment && appointment.patient_id,
      start_time: appointment && StartTime(),
      end_time: appointment && EndTime(),
      status: appointment && appointment.status,
    };
    reset(defaults);
  }, [appointment, reset]);

  const onSubmitAppointment = async (data) => {
    let st = data.start_time.getHours();
    let et = data.end_time.getHours();
    if (st < 10) st = "0" + st;
    if (et < 10) et = "0" + et;
    data = {
      ...data,
      start_time: st + ":" + data.start_time.getMinutes(),
      end_time: et + ":" + data.end_time.getMinutes(),
      _id: appointment._id,
    };
    await axios
      .post("/nurse/updatePatientAppointment", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Appointment Updated succesfully!");
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Update!");
        setConfirmationSnackbarOpen(true);
      });
  };

  return (
    <div
      className="modal fade"
      id="editAppointmentModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Edit Appointment
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
              <p className="formErrors">{errors2.appointment_date?.message}</p>
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
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Select Appointment Date"
                      isClearable
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between flex-md-row flex-column">
                <p className="formErrors">{errors2.start_time?.message}</p>

                <div className="form-group w-100">
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
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="form-group w-100">
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
  );
}

export default EditAppointmentModal;
