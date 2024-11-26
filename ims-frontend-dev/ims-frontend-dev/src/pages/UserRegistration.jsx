import React, { useState } from "react";
// import img1 from '../../public/assets/images/registrationImage'


const UserRegistration = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user",
    company: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {

  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "confirmPassword") {
      if (value !== data?.password) {
        setError("Passwords do not match!");
      } else {
        setError("");
      }
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div  style={{margin: 0, backgroundImage: "url(/assets/images/registrationImage.jpeg)", backgroundSize: 'cover' }}>
        <div
          style={{ minHeight: "80vh" }}
          className="container mt-5 mt-md-20 d-flex flex-column justify-content-center align-items-center"
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
                Please signup to get started.
              </p>
            </div>

            <div className="col-md-6 col-lg-5">
              <form onSubmit={handleSubmit} className="input-group">
                <div className="input-group">
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
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && data?.confirmPassword && (
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
                <div className="input-group" style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    placeholder="Company"
                    value={data.company}
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
