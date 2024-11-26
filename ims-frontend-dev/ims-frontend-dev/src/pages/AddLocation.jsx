import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import img1 from '../../public/assets/images/registrationImage'


const AddLocation = () => {
  const [data, setData] = useState({
    row: "",
    column: "",
    isEmpty: false,
    warehouse: "",
    maxCapacity: "",
    productName: "",
    mfgDate: "user",
    expDate: "",
    supplier: "",
    qty: 0,
    totalPrice: 0,
    batch: "",
    po: ""
  });
  const { location } = useParams();
  const navigate = useNavigate();
  const [location2, setUpdateLocation] = useState(null);

  useEffect(() => {
      if (location) {
          try {
              const decoded = JSON.parse(decodeURIComponent(location));
              setUpdateLocation(decoded);
              getUpdate(decoded);
          } catch (error) {
              console.log(error);
          }
      }
  }, [location])

  const getUpdate = (location) => {
    if (location) {
        data.row = location?.Row;
        data.column = location?.Column;
        data.maxCapacity = location?.MaxCapacity;
        data.warehouse = location?.Warehouse;
    }
}

  const [error, setError] = useState("");

  const handleSubmit = () => {

  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
          <h3 className="text-black bg-white rounded-2 p-2 shadow-lg mb-5"> {location != null ? "Update Location" : "Add Location"}</h3>
          <div className={"row  border rounded-3 h-auto p-3 bg-white shadow "}>
            {/* <div className="col-md-4 rounded-4 col-lg-3 m-md-auto m-sm-auto ">
              <div className="mb-3">
                <img src="/assets/images/logo2.png" alt='' style={{ width: '120px', height: '125px' }} />
              </div>
              <h5>Inventory Management System</h5>

              <p style={{ marginTop: '-10px' }}>
                Please signup to get started.
              </p>
            </div> */}

            <div className="" style={{maxWidth: "450px"}}>
              <form onSubmit={handleSubmit} className="input-group">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    name="row"
                    placeholder="Row"
                    value={data?.row}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group" style={{ marginTop: 10 }}>
                  <input
                    type="number"
                    className="form-control"
                    name="column"
                    placeholder="Column"
                    value={data?.column}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group" style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="warehouse"
                    placeholder="Warehouse"
                    value={data?.warehouse}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group" style={{ marginTop: 10 }}>
                  <input
                    type="number"
                    className="form-control"
                    name="maxCapacity"
                    placeholder="Max capacity"
                    value={data?.maxCapacity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                  <button type="submit" className="btn btn-primary w-100 mb-2">
                    {location != null ? "Update": "Submit"}
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

export default AddLocation
