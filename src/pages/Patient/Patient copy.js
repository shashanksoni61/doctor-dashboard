import React,{useState,useEffect} from "react";
import axios from 'axios';
const Patient = () => {
  const [patientInfo,setPatientInfo]=useState([]);
  async function fetchData() {
    try {
      const res = await axios.post("/nurse/patientDetails/6103f172ef6ebe0359c9e411");
      setPatientInfo(res.data.data)
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section className="dashboard">
        <div className=" container-fluid p-0">
          <div className="row" data-plugin="matchHeight" data-by-row="true">
            <div className="col-xl-12 col-lg-12">
              <div className="mb-3 d-flex w-100 align-items-center auto-fill-patient">
                <input
                  type="text"
                  name
                  className="form-control"
                  placeholder="Enter Patient Name"
                  defaultValue="John Doe"
                />
                <div className="col-md-3 rounded text-center">
                  <a href className="btn btn-gradient-primary">
                    Search
                  </a>
                </div>
              </div>
              {/* Widget User list */}
              <div className="card mb-3 patient-box" id="widgetUserList">
                <div className="card-header cover overlay">
                  <img
                    className="cover-image h-200"
                    src="assets/images/other/dashboard-header.jpg"
                    alt="..."
                  />
                  <div className="overlay-panel vertical-align overlay-background">
                    <div className="row w-100 align-items-center">
                      <div className="col-md-3">
                        <div className="vertical-align-middle patient-details">
                          <a
                            className="avatar avatar-100 float-left mr-20"
                            href="/"
                          >
                            <img src="assets/images/other/5.jpg" alt="" />
                          </a>
                          <div className="float-left user-info-box">
                            <div className="font-size-20">{patientInfo.personalDetails&&patientInfo.personalDetails.name}</div>
                            <p className="mb-0 text-nowrap">
                              <span className="text-break">
                                <a href className="__cf_email__">
                                {patientInfo.personalDetails&&patientInfo.personalDetails.mobile}
                                </a>
                              </span>
                            </p>
                            <div className="text-nowrap font-size-18">
                              <a href="/" className="white mr-10">
                                <i className="icon mdi mdi-pencil-box" />
                              </a>
                              <a href="/" className="white mr-10">
                                <i className="icon mdi mdi-eye" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <div class="other-details-patient">
                          <ul>
                            <li>
                              <p>Gender</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.gender}</h5>
                            </li>
                            <li>
                              <p>Age</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.age}</h5>
                            </li>
                            <li>
                              <p>Address</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.address}</h5>
                            </li>
                            <li>
                              <p>Email</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.email}</h5>
                            </li>
                            <li>
                              <p>Birthday</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.birthday.substring(0,10)}</h5>
                            </li>
                            <li>
                              <p>Occupation</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.occupation}</h5>
                            </li>
                            <li>
                              <p>Mobile</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.mobile}</h5>
                            </li>
                            <li>
                              <p>Tel Number</p>
                              <h5>{patientInfo.personalDetails&&patientInfo.personalDetails.tel_no}</h5>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-btn">
                    <a
                      href
                      className="btn btn-gradient-primary mr-2 white-color"
                      data-toggle="modal"
                      data-target="#addproModal"
                    >
                      Contact Tracing
                    </a>
                  </div>
                </div>
              </div>
              <div className="tabs-list-patient doctor-tab">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#patienttab1"
                      role="tab"
                      aria-controls="patienttab1"
                      aria-selected="true"
                    >
                      Health Details
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab2"
                      role="tab"
                      aria-controls="patienttab2"
                      aria-selected="false"
                    >
                      Doctor's Notes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab2"
                      role="tab"
                      aria-controls="patienttab2"
                      aria-selected="false"
                    >
                      Nurse's Notes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab3"
                      role="tab"
                      aria-controls="patienttab3"
                      aria-selected="false"
                    >
                      Document
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab4"
                      role="tab"
                      aria-controls="patienttab4"
                      aria-selected="false"
                    >
                      Visit logs
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab5"
                      role="tab"
                      aria-controls="patienttab5"
                      aria-selected="false"
                    >
                      Payment
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab6"
                      role="tab"
                      aria-controls="patienttab6"
                      aria-selected="false"
                    >
                      Prescription
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#patienttab7"
                      role="tab"
                      aria-controls="patienttab7"
                      aria-selected="false"
                    >
                      Laboratory
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="patienttab1"
                  role="tabpanel"
                >
                  <div>
                    <div className="row mt-4">
                      <div className="col-md-7">
                        <div className="panel ">
                          <div className="panel-heading ">
                            <div className="row align-items-center">
                              <div className="col-md-12">
                                <h3 className="panel-title">
                                  Medical Questions
                                </h3>
                              </div>
                            </div>
                          </div>
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
                                <div className="card-body">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
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
                                    Did your blood pressure so low that affects
                                    other vital organ?
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
                                <div className="card-body">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
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
                                <div className="card-body">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
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
                                <div className="card-body">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="panel">
                          <div className="panel-heading ">
                            <div className="row align-items-center">
                              <div className="col-md-12">
                                <h3 className="panel-title">Medications</h3>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive p-3">
                            <table className="table table-striped madication-table">
                              <thead>
                                <tr>
                                  <th scope="col">S. No.</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Interval</th>
                                  <th scope="col">Doses</th>
                                  <th scope="col">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Albuteol HFA</td>
                                  <td>2 puffs</td>
                                  <td>3 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>Crocin</td>
                                  <td>250 mg</td>
                                  <td>2 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td>Paracetamol</td>
                                  <td>200 mg</td>
                                  <td>1 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                                <tr>
                                  <th scope="row">4</th>
                                  <td>Albuteol HFA</td>
                                  <td>2 puffs</td>
                                  <td>1 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                                <tr>
                                  <th scope="row">5</th>
                                  <td>Albuteol HFA</td>
                                  <td>2 puffs</td>
                                  <td>1 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                                <tr>
                                  <th scope="row">6</th>
                                  <td>Albuteol HFA</td>
                                  <td>2 puffs</td>
                                  <td>1 Daily</td>
                                  <td>17/10/1997</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab2" role="tabpanel">
                  <div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="panel ">
                          <div className="row">
                            <div className="col-md-10 m-auto">
                              <div className="p-5">
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn-raised btn btn-danger btn-floating "
                                    data-toggle="modal"
                                    data-target="#addnoteModal"
                                  >
                                    <i
                                      className="icon mdi mdi-plus"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                <h3 className="text-center mb-3 mt-3">
                                  May 2021
                                </h3>
                                <ul className="timeline mt-5">
                                  <li>
                                    <div className="timeline-badge info">
                                      <i className="mdi mdi-check" />
                                    </div>
                                    <div className="timeline-panel">
                                      <p className="time-box">
                                        <small className="text-muted">
                                          <i className="mdi mdi-av-timer" /> 11
                                          hours ago
                                        </small>
                                      </p>
                                      <div className="timeline-body">
                                        <p className="mb-3">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit,sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore
                                        </p>
                                      </div>
                                      <p className="notes-edit">
                                        <a href>
                                          Edit <i className="mdi mdi-pencil" />
                                        </a>{" "}
                                        |{" "}
                                        <a href>
                                          Delete{" "}
                                          <i className="mdi mdi-delete" />
                                        </a>{" "}
                                        &nbsp;{" "}
                                        <span>
                                          Noted By{" "}
                                          <i className="mdi mdi-file-document-box" />
                                          : Dr John Doe
                                        </span>
                                      </p>
                                    </div>
                                  </li>
                                  <li className="timeline-inverted">
                                    <div className="timeline-badge info">
                                      <i className="mdi mdi-check" />
                                    </div>
                                    <div className="timeline-panel">
                                      <p className="time-box">
                                        <small className="text-muted">
                                          <i className="mdi mdi-av-timer" /> 11
                                          hours ago
                                        </small>
                                      </p>
                                      <div className="timeline-body">
                                        <p className="mb-3">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit,sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore
                                        </p>
                                      </div>
                                      <p className="notes-edit">
                                        <a href>
                                          Edit <i className="mdi mdi-pencil" />
                                        </a>{" "}
                                        |{" "}
                                        <a href>
                                          Delete{" "}
                                          <i className="mdi mdi-delete" />
                                        </a>{" "}
                                        &nbsp;{" "}
                                        <span>
                                          Noted By{" "}
                                          <i className="mdi mdi-file-document-box" />
                                          : Dr John Doe
                                        </span>
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                                <h3 className="text-center mb-3 mt-3">
                                  April 2021
                                </h3>
                                <ul className="timeline mt-5">
                                  <li>
                                    <div className="timeline-badge info">
                                      <i className="mdi mdi-check" />
                                    </div>
                                    <div className="timeline-panel">
                                      <p className="time-box">
                                        <small className="text-muted">
                                          <i className="mdi mdi-av-timer" /> 03
                                        </small>
                                      </p>
                                      <div className="timeline-body">
                                        <p className="mb-3">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit,sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore
                                        </p>
                                      </div>
                                      <p className="notes-edit">
                                        <a href>
                                          Edit <i className="mdi mdi-pencil" />
                                        </a>{" "}
                                        |{" "}
                                        <a href>
                                          Delete{" "}
                                          <i className="mdi mdi-delete" />
                                        </a>{" "}
                                        &nbsp;{" "}
                                        <span>
                                          Noted By{" "}
                                          <i className="mdi mdi-file-document-box" />
                                          : Dr John Doe
                                        </span>
                                      </p>
                                    </div>
                                  </li>
                                  <li className="timeline-inverted">
                                    <div className="timeline-badge info">
                                      <i className="mdi mdi-check" />
                                    </div>
                                    <div className="timeline-panel">
                                      <p className="time-box">
                                        <small className="text-muted">
                                          <i className="mdi mdi-av-timer" /> 04
                                        </small>
                                      </p>
                                      <div className="timeline-body">
                                        <p className="mb-3">
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit,sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore
                                        </p>
                                      </div>
                                      <p className="notes-edit">
                                        <a href>
                                          Edit <i className="mdi mdi-pencil" />
                                        </a>{" "}
                                        |{" "}
                                        <a href>
                                          Delete{" "}
                                          <i className="mdi mdi-delete" />
                                        </a>{" "}
                                        &nbsp;{" "}
                                        <span>
                                          Noted By{" "}
                                          <i className="mdi mdi-file-document-box" />
                                          : Dr John Doe
                                        </span>
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="addnoteModal"
                    role="dialog"
                    aria-labelledby=""
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add Note
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
                          <form className="forms-sample">
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Name<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputName1"
                                placeholder="Enter  Name"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleTextarea1">
                                Add Note<sup>*</sup>
                              </label>
                              <textarea
                                className="form-control"
                                id="exampleTextarea2"
                                rows={4}
                                placeholder="Add Note"
                                defaultValue={""}
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-gradient-primary mr-2"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab3" role="tabpanel">
                  <div className="row mt-4">
                    <div className="col-xxl-12 col-lg-12">
                      <div className="panel" id="projects-status">
                        <div className="panel-heading appointment-schedule">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <h3 className="panel-title">Documents</h3>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <td>ID</td>
                                <td>Date</td>
                                <td>Descriprion</td>
                                <td>Uploaded Document</td>
                                <td className="text-left">Action</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>#619</td>
                                <td>14 Nov 2019</td>
                                <td>Dental Filling</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/other/artist-img.jpg"
                                      alt="artist-img"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="edit-icon">
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-pencil" />
                                    </a>
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-eye" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>#619</td>
                                <td>14 Nov 2019</td>
                                <td>Dental Filling</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/icons/documents-folder.png"
                                      alt="document-folder"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="edit-icon">
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-pencil" />
                                    </a>
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-eye" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>#619</td>
                                <td>14 Nov 2019</td>
                                <td>Dental Filling</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/icons/documents-folder.png"
                                      alt="documents-folder"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="edit-icon">
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-pencil" />
                                    </a>
                                    <a href="/" className="white mr-10">
                                      <i className="icon mdi mdi-eye" />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab4" role="tabpanel">
                  <div className="row mt-4">
                    <div className="col-xxl-12 col-lg-12">
                      <div className="panel" id="projects-status">
                        <div className="panel-heading appointment-schedule">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <h3 className="panel-title">Visit Log</h3>
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Visitor's Name</th>
                                <th>Reason For Visit</th>
                                <th>Time In</th>
                                <th>Time Out</th>
                                <th>Sign/Initial</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>Routin Checkup</td>
                                <td>4:00 PM</td>
                                <td>5:00 PM</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/other/sign.png"
                                      alt="sign"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>Routin Checkup</td>
                                <td>4:00 PM</td>
                                <td>5:00 PM</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/other/sign.png"
                                      alt="sign"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>Routin Checkup</td>
                                <td>4:00 PM</td>
                                <td>5:00 PM</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/other/sign.png"
                                      alt="sign"
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>Routin Checkup</td>
                                <td>4:00 PM</td>
                                <td>5:00 PM</td>
                                <td>
                                  <div className="img-vid-box">
                                    <img
                                      src="assets/images/other/sign.png"
                                      alt="sign"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab5" role="tabpanel">
                  <div className="row mt-4">
                    <div className="col-xxl-12 col-lg-12">
                      <div className="panel" id="projects-status">
                        <div className="panel-heading appointment-schedule pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <h3 className="panel-title pb-0">Payment List</h3>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-raised btn btn-danger btn-floating "
                            data-toggle="modal"
                            data-target="#paymentModal"
                          >
                            <i
                              className="icon mdi mdi-plus"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <hr />
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th width="15%">S.No</th>
                                <th width="15%">ID</th>
                                <th width="15%">Date</th>
                                <th width="20%">Madical Service</th>
                                <th width="20%">Medication</th>
                                <th width="15%">Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>XYZ</td>
                                <td>$ 45.00</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>XYZ</td>
                                <td>$ 45.00</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>XYZ</td>
                                <td>$ 45.00</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>XYZ</td>
                                <td>XYZ</td>
                                <td>$ 45.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

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
                          <form className="forms-sample">
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">Date</label>
                              <input
                                type="text"
                                className="form-control"
                                id="datepicker7"
                                placeholder="Date"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Madical Service
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Madical Service"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleTextarea1">
                                Madication
                              </label>
                              <textarea
                                className="form-control"
                                id="exampleTextarea1"
                                rows={4}
                                placeholder="Add Note"
                                defaultValue={""}
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-8">
                                <div className="form-group text-left">
                                  <label htmlFor="exampleTextarea1">
                                    <b>Doctor Comm.</b>
                                  </label>
                                  <br />
                                  <label htmlFor="exampleTextarea1">
                                    <b>Bawe Comm.</b>
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group text-right">
                                  <label htmlFor="exampleTextarea1">
                                    <b>Tax:</b> - $3.00
                                  </label>
                                  <br />
                                  <label htmlFor="exampleTextarea1">
                                    <b>Discount:</b> - $1.00
                                  </label>
                                  <br />
                                  <label htmlFor="exampleTextarea1">
                                    <b>Total:</b> - $1.00
                                  </label>
                                </div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-gradient-primary mr-2"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab6" role="tabpanel">
                  <div className="row mt-4">
                    <div className="col-xxl-12 col-lg-12">
                      <div className="panel" id="projects-status">
                        <div className="panel-heading appointment-schedule pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <h3 className="panel-title pb-0">
                                Prescription List
                              </h3>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-raised btn btn-danger btn-floating "
                            data-toggle="modal"
                            data-target="#prescriptionModal"
                          >
                            <i
                              className="icon mdi mdi-plus"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <hr />
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th width="15%">S.No</th>
                                <th width="15%">Patient</th>
                                <th width="15%">Date</th>
                                <th width="20%">Name</th>
                                <th width="20%">Doses</th>
                                <th width="15%">Interval</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>Albuteol HFA</td>
                                <td>250 mg</td>
                                <td>2 Daily</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>Albuteol HFA</td>
                                <td>250 mg</td>
                                <td>2 Daily</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>Albuteol HFA</td>
                                <td>250 mg</td>
                                <td>2 Daily</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>#45685</td>
                                <td>14 Nov 2019</td>
                                <td>Albuteol HFA</td>
                                <td>250 mg</td>
                                <td>2 Daily</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="prescriptionModal"
                    role="dialog"
                    aria-labelledby=""
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Prescription list
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
                          <div className="form-group">
                            <label htmlFor="exampleInputName1">
                              Name
                              <sup>*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              required
                            />
                          </div>
                          <form className="forms-sample">
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Date
                                <sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="datepicker8"
                                placeholder="Date"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Patient
                                <sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Patient"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Doses
                                <sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Doses"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Interval
                                <sup>*</sup>
                              </label>
                              <div>
                                <select
                                  className="form-control"
                                  id="select-new3"
                                  required
                                >
                                  <option>2 Daily</option>
                                  <option>3 Daily</option>
                                  <option>In Morning</option>
                                  <option>In Evening</option>
                                </select>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-gradient-primary mr-2"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="patienttab7" role="tabpanel">
                  <div className="row mt-4">
                    <div className="col-xxl-12 col-lg-12">
                      <div className="panel" id="projects-status">
                        <div className="panel-heading appointment-schedule pb-0">
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              <h3 className="panel-title pb-0">
                                Patient Laboratory Report
                              </h3>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-raised btn btn-danger btn-floating "
                            data-toggle="modal"
                            data-target="#addlabModal"
                          >
                            <i
                              className="icon mdi mdi-plus"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <hr />
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th width="15%">S.No</th>
                                <th width="15%">Name</th>
                                <th width="20%">Description</th>
                                <th width="15%">Address</th>
                                <th width="20%">E-mail</th>
                                <th width="15%">Mobile Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>Blood Test</td>
                                <td>
                                  <span className="badge badge-danger">
                                    Incomplete
                                  </span>
                                </td>
                                <td>14 Nov 2019 10:15 AM</td>
                                <td>
                                  <span className="badge-warning">Due</span>
                                </td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>Blood Test</td>
                                <td>
                                  <span className="badge badge-info">
                                    Complete
                                  </span>
                                </td>
                                <td>14 Nov 2019 10:15 AM</td>
                                <td>
                                  <span className="badge badge-primary">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>Blood Test</td>
                                <td>
                                  <span className="badge badge-danger">
                                    Incomplete
                                  </span>
                                </td>
                                <td>14 Nov 2019 10:15 AM</td>
                                <td>
                                  <span className="badge-warning">Due</span>
                                </td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>#45685</td>
                                <td>Blood Test</td>
                                <td>
                                  <span className="badge badge-info">
                                    Complete
                                  </span>
                                </td>
                                <td>14 Nov 2019 10:15 AM</td>
                                <td>
                                  <span className="badge badge-primary">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="addlabModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add Laboratory Report
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
                          <form className="forms-sample">
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Name<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Description<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Address<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                E-mail<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputName1">
                                Contact Number<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Contact Number"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-gradient-primary mr-2"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addproModal"
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
                <form className="forms-sample">
                  <div className="form-group">
                    <label>
                      Have you suffering from any of COVID 19 Symptoms?{" "}
                    </label>
                    <br></br>
                    <label htmlFor="exampleInputName1">
                      Patient Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Patient Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Fever</label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new2"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Cough</label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new10"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Shortness of breadth
                    </label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new4"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Diarhea</label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new5"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Sour throat</label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new6"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Fatigue</label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new7"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Have you been exposed to anyone with COVID 19 or someone
                      who has symptoms for the last 14 days?
                    </label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new8"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">
                      Have you been out of the country for the last 6 months?
                    </label>
                    <div>
                      <select
                        className="form-control"
                        id="select-new9"
                        required
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gradient-primary mr-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Patient;
