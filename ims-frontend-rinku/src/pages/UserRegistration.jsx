import React, { useState, useEffect } from "react";
// import img1 from '../../public/assets/images/registrationImage'
import { isUserLoggedIn, registerAPICall } from "../services/AuthService";
import { listCompanies } from "../services/CompanyService";
import { createEmployee } from "../services/EmployeeService";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UserRegistration = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: (isUserLoggedIn && (localStorage.getItem("role") === "ROLE_ADMIN" ? "ROLE_MANAGER" : localStorage.getItem("role") === "ROLE_MANAGER" ? "ROLE_EMPLOYEE" : "")),
    company: { id: (isUserLoggedIn && localStorage.getItem("role") === "ROLE_ADMIN" ? "" : parseInt(localStorage.getItem("companyId")))  }
  });
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    listCompanies().then((response) => {
      setCompanies(response?.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!error){
      console.log(data)
      registerAPICall(data).then((response)=>{
          navigate("/admin/manageAccounts")
      }).catch((error)=>{
        toast.error(error.response.data);
      })
    }
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (value !== data?.password) {
        setError("Passwords do not match!");
      } else {
        setError("");
      }
    }else if (name === "company") {
      setData((prevData) => ({
        ...prevData,
        [name]: { id: parseInt(value) },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  }

  return (
    <div style={{ margin: 0, backgroundImage: "url(/assets/images/registrationImage.jpeg)", backgroundSize: 'cover' }}>
      <div
        style={{ minHeight: "80vh" }}
        className="container mt-md-20 d-flex flex-column justify-content-center align-items-center"
      >
        {/* <div className=" d-flex justify-content-center " > */}
        <h3 className="text-black bg-white rounded-2 p-2 shadow-lg mb-5">User Registeration</h3>
        {/* </div> */}

        <div className={"row  border rounded-3 h-auto p-3 bg-white shadow "}>
          <div className="col-md-4 rounded-4 col-lg-3 m-md-auto m-sm-auto ">
            <div className="mb-3">
              <img src="/assets/images/logo2.png" alt='' style={{ width: '120px', height: '125px' }} />
            </div>
            <h5>Inventory Management System</h5>

            <p style={{ marginTop: '-10px' }}>
              Register a new user!
            </p>
          </div>

          <div className="col-md-6 col-lg-5">
            <form onSubmit={handleSubmit} className="input-group">

              {localStorage.getItem("role") === "ROLE_ADMIN" && (
                <>
                  <div className="input-group" >
                    <select style={{ height: "35px", width: "100%" }} onClick={handleChange} name="company">
                      <option>Select Company</option>
                      {companies?.map((item, key) => (
                        <>
                          {item?.name !== localStorage.getItem("companyName") && (
                            <>
                              <option key={key} value={item?.id}>
                                {item?.name}
                              </option>
                            </>
                          )}
                        </>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && confirmPassword && (
                <div>
                  <label className='mt-1 rounded-1 p-1 fw-bold text-danger bg-white'>{error}</label>
                </div>
              )}
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              {/* <div style={{ marginBottom: "10px" }}>
                  <input
                    type="file"
                    className="form-control"
                    name="profilePicture"
                    onChange={handleChange}
                  />
                  {selectedImage && (
                    <div style={{ marginTop: "10px" }}>
                      <Image
                        src={selectedImage}
                        alt="Selected Image"
                        height={80}
                        width={80}
                      />
                    </div>
                  )}
                </div> */}



              <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default UserRegistration
