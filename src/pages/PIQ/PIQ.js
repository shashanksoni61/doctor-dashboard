import React, { useState } from "react";
import { useForm } from "react-hook-form";
const PIQ = () => {
  const [info, setInfo] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setInfo(data);

  };
  return (
    <div>
      <section className="dashboard">
        <div className=" container-fluid p-0">
          <div className="row" data-plugin="matchHeight" data-by-row="true">
            <div className="col-xxl-12 col-lg-12">
              {/* Panel Projects Status */}
              <div className="panel" id="projects-status">
                <div className="panel-heading appointment-schedule appointment-list pt-3">
                  <div className="row align-items-center m-0">
                    <div className="col-md-2">
                      <h3 className="panel-title pt-0 pb-0">PIQ</h3>
                    </div>
                  </div>
                  <hr />
                  {/* <pre>{JSON.stringify(info, undefined, 2)}</pre> */}
                  <div className="row">
                    <div className="col-md-10 m-auto">
                      <form
                        className="forms-sample"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <p className="formErrors">{errors.email?.message}</p>
                        <div className="form-group">
                          <label htmlFor="exampleInputName1">
                            Email Address<sup>*</sup>
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

                        <div className="form-group">
                          <p className="formErrors">{errors.msg?.message}</p>
                          <label htmlFor="exampleInputName1">
                            Message<sup>*</sup>
                          </label>
                          <textarea
                            className="form-control"
                            rows={6}
                            name="msg"
                            placeholder="Comment"
                            defaultValue={""}
                            {...register("msg", {
                              required: "Message is required",
                            })}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-gradient-primary mr-2"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PIQ;
