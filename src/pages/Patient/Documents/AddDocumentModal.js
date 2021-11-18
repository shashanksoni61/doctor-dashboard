import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function AddDocumentModal(props) {
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
    const d = new FormData();
    d.append("title", data.title);
    d.append("date", data.date);
    d.append("description", data.description);
    d.append("document", data.document[0]);
    d.append("patient_id", id);
    await axios
      .post("/nurse/addPatientDocument", d, {
        headers: {
          enctype: "multipart/form-data",
        },
      })
      .then((response) => {
        setConfirmationSnackbarMessage("Patient Document succesfully added!");
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
      id="addDocumentModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Document
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
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <p className="formErrors">{errors.title?.message}</p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Title<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  {...register("title", {
                    required: "* Title is required",
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
                  Select Date<sup>*</sup>
                </label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      autoComplete="off"
                      selected={field.value}
                      // onChange={(date) => setAddDate(date)}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      minDate={new Date()}
                      placeholderText="Select Date"
                      isClearable
                      {...field}
                    />
                  )}
                />
              </div>

              <p className="formErrors">{errors.description?.message}</p>

              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Description<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter Note"
                  {...register("description", {
                    required: "Note is required",
                  })}
                />
              </div>
              <div className="form-group">
                <label>File upload</label>
                <input
                  type="file"
                  name="document"
                  {...register("document", {
                    required: "* Document is required",
                  })}
                  className="file-upload-default"
                />
                <div className="input-group col-xs-12">
                  <input
                    type="text"
                    name="doc"
                    className="form-control file-upload-info"
                    disabled
                    placeholder="Upload Image/Video"
                  />
                  <span className="input-group-append">
                    <button
                      className="file-upload-browse btn btn-gradient-primary"
                      type="button"
                    >
                      Upload
                    </button>
                  </span>
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

export default AddDocumentModal;
