import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import axios from "axios";
axios.defaults.baseURL = "http://128.199.182.16:4000/";
axios.defaults.headers.common["Authorization"] = "Bearer "+localStorage.getItem("token");
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
