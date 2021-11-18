import axios from "axios";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import "./style.css";

function ContactTracing(props) {
  const {
    patient_id,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;
  const [trigger, setTrigger] = useState(false);
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const fetchData = async () => {
    try {
      const res = await axios.post(`/nurse/contactTracing/${patient_id}`);
      setData(res.data.data.contactTracingData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [patient_id, trigger]);

  const onSubmit = async (data) => {
    data = { ...data, patient_id: patient_id };
    const result = await axios
      .post("/nurse/addPatientContactTracing", data)
      .then((response) => {
        setConfirmationSnackbarMessage("Contact Tracing added succesfully!");
        setConfirmationSnackbarOpen(true);
        setTrigger(!trigger);
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Save!");
        setConfirmationSnackbarOpen(true);
      });
  };

  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  return (
    <div
      className="modal fade"
      id="addContactTracingModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Contact Tracing
            </h5>
            <button
              type="button"
              className="close"
              z
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
              <p className="formErrors">
                {errors.have_you_any_have_covid_19_symptoms?.message}
              </p>
              <div className="form-group">
                <label>
                  Have you suffering from any of COVID 19 Symptoms?{" "}
                </label>
                <br></br>
                {data && data.have_you_any_have_covid_19_symptoms ? (
                  capitalizeFirstLetter(
                    data.have_you_any_have_covid_19_symptoms
                  )
                ) : (
                  <div>
                    <div className="d-inline-block">
                      <input
                        type="radio"
                        name="have_you_any_have_covid_19_symptoms"
                        id="yes"
                        {...register("have_you_any_have_covid_19_symptoms", {
                          required: "Question Answer is required",
                        })}
                      />
                      <label htmlFor="yes" className="radiolabel">
                        Yes
                      </label>
                    </div>
                    <div className="d-inline-block radiodiv">
                      <input
                        type="radio"
                        name="have_you_any_have_covid_19_symptoms"
                        id="no"
                        {...register("have_you_any_have_covid_19_symptoms", {
                          required: "Answer is required",
                        })}
                      />
                      <label htmlFor="no" className="radiolabel">
                        No
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="row">
                <p className="formErrors">{errors.fever?.message}</p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Fever</label>
                  {data && data.fever ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.fever)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="fever"
                          id="yes1"
                          {...register("fever", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes1" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="fever"
                          id="no1"
                          {...register("fever", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no1" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <p className="formErrors">{errors.cough?.message}</p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Cough</label>
                  {data && data.cough ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.cough)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="cough"
                          id="yes2"
                          {...register("cough", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes2" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="cough"
                          id="no2"
                          {...register("cough", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no2" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <p className="formErrors">
                  {errors.shortness_of_breath?.message}
                </p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Shortness of breath</label>
                  {data && data.shortness_of_breath ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.shortness_of_breath)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="shortness_of_breath"
                          id="yes3"
                          {...register("shortness_of_breath", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes3" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="shortness_of_breath"
                          id="no3"
                          {...register("shortness_of_breath", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no3" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <p className="formErrors">{errors.diarrhea?.message}</p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Diarrhea</label>
                  {data && data.diarrhea ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.diarrhea)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="diarrhea"
                          id="yes4"
                          {...register("diarrhea", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes4" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="diarrhea"
                          id="no4"
                          {...register("diarrhea", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no4" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <p className="formErrors">{errors.sore_throat?.message}</p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Sour throat</label>
                  {data && data.sore_throat ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.sore_throat)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="sore_throat"
                          id="yes5"
                          {...register("sore_throat", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes5" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="sore_throat"
                          id="no5"
                          {...register("sore_throat", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no5" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <p className="formErrors">{errors.fatigue?.message}</p>
                <div className="form-group col-md-6 col-12">
                  <label htmlFor="exampleInputName1">Fatigue</label>
                  {data && data.fatigue ? (
                    <div>
                      <p>{capitalizeFirstLetter(data.fatigue)}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="d-inline-block">
                        <input
                          type="radio"
                          name="fatigue"
                          id="yes6"
                          {...register("fatigue", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="yes6" className="radiolabel">
                          Yes
                        </label>
                      </div>
                      <div className="d-inline-block radiodiv">
                        <input
                          type="radio"
                          name="fatigue"
                          id="no6"
                          {...register("fatigue", {
                            required: "Answer is required",
                          })}
                        />
                        <label htmlFor="no6" className="radiolabel">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="formErrors">
                {errors.have_you_been_exposed_to_anyone?.message}
              </p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Have you been exposed to anyone with COVID 19 or someone who
                  has symptoms for the last 14 days?
                </label>
                {data && data.have_you_been_exposed_to_anyone ? (
                  <div>
                    <p>
                      {capitalizeFirstLetter(
                        data.have_you_been_exposed_to_anyone
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="d-inline-block">
                      <input
                        type="radio"
                        name="have_you_been_exposed_to_anyone"
                        id="yes7"
                        {...register("have_you_been_exposed_to_anyone", {
                          required: "Answer is required",
                        })}
                      />
                      <label htmlFor="yes7" className="radiolabel">
                        Yes
                      </label>
                    </div>
                    <div className="d-inline-block radiodiv">
                      <input
                        type="radio"
                        name="have_you_been_exposed_to_anyone"
                        id="no7"
                        {...register("have_you_been_exposed_to_anyone", {
                          required: "Answer is required",
                        })}
                      />
                      <label htmlFor="no7" className="radiolabel">
                        No
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <p className="formErrors">
                {
                  errors.have_you_been_out_of_the_country_for_the_last_6_months
                    ?.message
                }
              </p>
              <div className="form-group">
                <label htmlFor="exampleInputName1">
                  Have you been out of the country for the last 6 months?
                </label>
                {data &&
                data.have_you_been_out_of_the_country_for_the_last_6_months ? (
                  <div>
                    <p>
                      {capitalizeFirstLetter(
                        data.have_you_been_out_of_the_country_for_the_last_6_months
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="d-inline-block">
                      <input
                        type="radio"
                        name="have_you_been_out_of_the_country_for_the_last_6_months"
                        id="yes8"
                        {...register(
                          "have_you_been_out_of_the_country_for_the_last_6_months",
                          {
                            required: "Answer is required",
                          }
                        )}
                      />
                      <label htmlFor="yes8" className="radiolabel">
                        Yes
                      </label>
                    </div>
                    <div className="d-inline-block radiodiv">
                      <input
                        type="radio"
                        name="have_you_been_out_of_the_country_for_the_last_6_months"
                        id="no8"
                        {...register(
                          "have_you_been_out_of_the_country_for_the_last_6_months",
                          {
                            required: "Answer is required",
                          }
                        )}
                      />
                      <label htmlFor="no8" className="radiolabel">
                        No
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {!data && (
                <button type="submit" className="btn btn-gradient-primary mr-2">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactTracing;
