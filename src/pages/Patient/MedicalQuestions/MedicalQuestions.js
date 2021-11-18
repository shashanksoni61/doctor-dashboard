import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientTabSkeleton from "../../../skeletons/PatientTabSkeleton";
import "../style.css";
import { Controller, useForm } from "react-hook-form";

function MedicalQuestions(props) {
  const {
    patient_id,
    setTrigger,
    setConfirmationSnackbarOpen,
    setConfirmationSnackbarMessage,
  } = props;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function fetchData() {
    setLoading(false);
    try {
      const res = await axios.post(`/nurse/patientMedicalQues/${patient_id}`);
      setQuestions(res.data.data.patientMedicalQues);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  const onSubmit = async (data) => {
    data = { ...data, patient_id: patient_id };
    const result = await axios
      .post("/nurse/addPatientMedQues", data)
      .then((response) => {
        setConfirmationSnackbarMessage(
          "Patient Medical Answer added succesfully!"
        );
        setConfirmationSnackbarOpen(true);
        setTrigger(true);
        fetchData();
      })
      .catch((err) => {
        setConfirmationSnackbarMessage("Failed to Save!");
        setConfirmationSnackbarOpen(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, [patient_id]);
  return (
    <>
      {questions ? (
        <div className="col-md-7">
          <div className="panel ">
            <div className="panel-heading ">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <h3 className="panel-title">Medical Questions</h3>
                </div>
              </div>
            </div>

            <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
              <div
                className="accordion madical-ques p-3 "
                id="accordionExample"
              >
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Did you experience any excessive bleeding?
                        <div className="for-plus">
                          <i
                            className="mdi mdi-plus"
                            style={{ display: "none" }}
                          />
                          <i className="mdi mdi-minus" />
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <p className="formErrors">
                      {
                        errors.did_you_experience_any_excessive_bleeding
                          ?.message
                      }
                    </p>
                    <div className="card-body">
                      {questions[0] &&
                      questions[0].did_you_experience_any_excessive_bleeding ? (
                        questions[0].did_you_experience_any_excessive_bleeding.toUpperCase()
                      ) : (
                        <div>
                          <div className="d-inline-block">
                            <input
                              type="radio"
                              name="did_you_experience_any_excessive_bleeding"
                              id="yes"
                              value="Yes"
                              {...register(
                                "did_you_experience_any_excessive_bleeding",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="yes" className="radiolabel">
                              Yes
                            </label>
                          </div>
                          <div className="d-inline-block radiodiv">
                            <input
                              type="radio"
                              name="did_you_experience_any_excessive_bleeding"
                              id="no"
                              value="No"
                              {...register(
                                "did_you_experience_any_excessive_bleeding",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="no" className="radiolabel">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Did your blood pressure so low that affects other vital
                        organ?
                        <div className="for-plus">
                          <i
                            className="mdi mdi-plus"
                            style={{ display: "none" }}
                          />
                          <i className="mdi mdi-minus" />
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <p className="formErrors">
                      {
                        errors
                          .did_your_blood_pressure_so_low_that_affects_other_vital_organ
                          ?.message
                      }
                    </p>
                    <div className="card-body">
                      {questions[0] &&
                      questions[0]
                        .did_your_blood_pressure_so_low_that_affects_other_vital_organ ? (
                        questions[0].did_your_blood_pressure_so_low_that_affects_other_vital_organ.toUpperCase()
                      ) : (
                        <div>
                          <div className="d-inline-block">
                            <input
                              type="radio"
                              name="did_your_blood_pressure_so_low_that_affects_other_vital_organ"
                              id="yes1"
                              value="Yes"
                              {...register(
                                "did_your_blood_pressure_so_low_that_affects_other_vital_organ",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="yes1" className="radiolabel">
                              Yes
                            </label>
                          </div>
                          <div className="d-inline-block radiodiv">
                            <input
                              type="radio"
                              name="did_your_blood_pressure_so_low_that_affects_other_vital_organ"
                              id="no1"
                              value="No"
                              {...register(
                                "did_your_blood_pressure_so_low_that_affects_other_vital_organ",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="no1" className="radiolabel">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Did you suffer from any infection?
                        <div className="for-plus">
                          <i
                            className="mdi mdi-plus"
                            style={{ display: "none" }}
                          />
                          <i className="mdi mdi-minus" />
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <p className="formErrors">
                      {errors.did_you_suffer_from_any_infection?.message}
                    </p>
                    <div className="card-body">
                      {questions[0] &&
                      questions[0].did_you_suffer_from_any_infection ? (
                        questions[0].did_you_suffer_from_any_infection.toUpperCase()
                      ) : (
                        <div>
                          <div className="d-inline-block">
                            <input
                              type="radio"
                              name="did_you_suffer_from_any_infection"
                              id="yes2"
                              value="Yes"
                              {...register(
                                "did_you_suffer_from_any_infection",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="yes2" className="radiolabel">
                              Yes
                            </label>
                          </div>
                          <div className="d-inline-block radiodiv">
                            <input
                              type="radio"
                              name="did_you_suffer_from_any_infection"
                              id="no2"
                              value="No"
                              {...register(
                                "did_you_suffer_from_any_infection",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="no2" className="radiolabel">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingFour">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Are you taking Anticoagulant Drug?
                        <div className="for-plus">
                          <i
                            className="mdi mdi-plus"
                            style={{ display: "none" }}
                          />
                          <i className="mdi mdi-minus" />
                        </div>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    aria-labelledby="headingFour"
                    data-parent="#accordionExample"
                  >
                    <p className="formErrors">
                      {errors.are_you_takin_Anticoagulant_Drug?.message}
                    </p>
                    <div className="card-body">
                      {questions[0] &&
                      questions[0].are_you_taking_Anticoagulant_Drug ? (
                        questions[0].are_you_taking_Anticoagulant_Drug.toUpperCase()
                      ) : (
                        <div>
                          <div className="d-inline-block">
                            <input
                              type="radio"
                              name="are_you_taking_Anticoagulant_Drug"
                              id="yes3"
                              value="Yes"
                              {...register(
                                "are_you_taking_Anticoagulant_Drug",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="yes3" className="radiolabel">
                              Yes
                            </label>
                          </div>
                          <div className="d-inline-block radiodiv">
                            <input
                              type="radio"
                              name="are_you_taking_Anticoagulant_Drug"
                              id="no3"
                              value="No"
                              {...register(
                                "are_you_taking_Anticoagulant_Drug",
                                {
                                  required: "It is required",
                                }
                              )}
                            />
                            <label htmlFor="no3" className="radiolabel">
                              No
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {!questions[0] && (
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="col-md-7">
          <div className="table-responsive p-3">
            <PatientTabSkeleton />
          </div>
        </div>
      )}
    </>
  );
}

export default MedicalQuestions;
