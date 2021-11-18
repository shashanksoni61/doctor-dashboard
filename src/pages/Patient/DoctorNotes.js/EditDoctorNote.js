import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditDoctorNote(props) {
  const {
    id,
    setTrigger,
    trigger,
    doctorNotes,
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
        note: doctorNotes && doctorNotes.note,
    },
  });
  useEffect(() => {
    let defaults = {
        note: doctorNotes && doctorNotes.note,
    };
    reset(defaults);
  }, [doctorNotes, reset]);

  const onSubmit = async (data) => {
    data = { ...data, note_id: doctorNotes._id, date: new Date() };
    const result = await axios
      .post("/doctor/updateDoctorNote", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Note succesfully updated!");
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
      id="editdoctornoteModal"
      role="dialog"
      aria-labelledby=""
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Note
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
              <div className="form-group">
                <p className="formErrors">{errors.note?.message}</p>
                <label htmlFor="exampleTextarea1">
                  Edit Note<sup>*</sup>
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDoctorNote;
