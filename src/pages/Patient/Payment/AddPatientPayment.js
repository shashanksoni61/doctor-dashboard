import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
function AddPatientPayment(props) {
  const {
    id,
    setTrigger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const servicesList = useSelector((state) => state.servicesList.services);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState([]);

  const onClick = (e) => {
    var servicing =
      servicesList &&
      servicesList.filter((service) => {
        return service._id == getValues("service_id");
      });
    setSelectedService(servicing[0]);
  };

  useEffect(() => {
    setSelectedService(servicesList[0]);
  }, [servicesList]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      patient_id: id,
      bawe_commision: selectedService.bawe_commission,
      doctor_commision: selectedService.dr_commission,
      cost: selectedService.price,
    };

    const result = await axios
      .post("/nurse/addPatientPayment", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Patient Payment succesfully added!");
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
      id="paymentModal"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Payment
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
              <p className="formErrors">{errors.service_id?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Select Service<sup>*</sup>
                </label>
                <div>
                  <select
                    id="select-new"
                    className="form-control"
                    name="service_id"
                    onClick={onClick}
                    onChange={([selected]) => {
                      return { value: selected };
                    }}
                    {...register("service_id", {
                      required: "Service is required",
                    })}
                  >
                    {servicesList &&
                      servicesList.map((service, idx) => {
                        return (
                          <option value={service._id} key={idx}>
                            {service.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <p className="formErrors">{errors.medication?.message}</p>
                <label htmlFor="exampleTextarea1">
                  Add Note<sup>*</sup>
                </label>
                <textarea
                  type="text"
                  name="medication"
                  rows={4}
                  className="form-control"
                  placeholder="Enter note"
                  {...register("medication", {
                    required: "Medication is required",
                  })}
                />
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="form-group text-left">
                    <label htmlFor="exampleTextarea1">
                      <b>
                        Doctor Comm. :-{" "}
                        {selectedService
                          ? selectedService.dr_commission
                          : "$0.00"}
                      </b>
                    </label>
                    <br />
                    <label htmlFor="exampleTextarea1">
                      <b>
                        Bawe Comm. :-{" "}
                        {selectedService
                          ? selectedService.bawe_commission
                          : "$0.00"}
                      </b>
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group text-right">
                    <label htmlFor="exampleTextarea1">
                      <b>Tax:</b> - $0.00
                    </label>
                    <br />
                    <label htmlFor="exampleTextarea1">
                      <b>Discount:</b> - $0.00
                    </label>
                    <br />
                    <label htmlFor="exampleTextarea1">
                      <b>Total:</b> - $
                      {selectedService ? selectedService.price : "$0.00"}
                    </label>
                  </div>
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

export default AddPatientPayment;
