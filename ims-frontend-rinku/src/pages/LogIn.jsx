import React from "react";
import { useState } from "react";
import { getEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswoed] = useState("");
  const [employee, setEmployee] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    await loginAPICall(email, password)
      .then((response) => {
        const token = "Basic " + window.btoa(email + ":" + password);
        storeToken(token);
        saveLoggedInUser(email);

      getEmployee(email).then((response) => {
        const data = response.data;
        setEmployee(data);
        localStorage.clear();
        localStorage.setItem("companyName", data?.company?.name);
        localStorage.setItem("companyId", data?.companyId);
        localStorage.setItem("currentEmployeeEmail", data?.email);
        // if (password.trim() === data.password) {
        //   navigate("/homepage");
        // }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
        navigate("/homepage");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPasswoed(value);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${"assets/images/inventory-management.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container-fluid d-flex justify-content-center align-items-center vh-100"
        style={{ width: 1000, height: 500 }}
      >
        <ToastContainer />
        <div
          className="card bg-light border-light shadow-lg"
          style={{ width: "40%", maxWidth: "600px" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Log In</h3>
            <form onSubmit={handleSubmit}>
              <div data-mdb-input-init className="form-floating mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Email Address"
                />
                <label className="form-label">Email address</label>
              </div>

              <div data-mdb-input-init className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label className="form-label">Password</label>
              </div>

              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example31"
                    />
                    <label className="form-check-label"> Remember me </label>
                  </div>
                </div>

                <div className="col">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-block mb-4"
                style={{ width: 355 }}
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
