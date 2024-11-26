import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
  const [count, setCount] = useState(0);
  // const location = useLocation();
  // const { updateProduct } = location.state || {};
  const { updateProduct } = useParams();
  const {updateProductAtCurrentLocation} = useParams();
  const navigate = useNavigate();
  const [updateProduct2, setUpdateProduct] = useState(null);
  const { location } = useParams();
  const [currentLocation, setCurrentLocation] = useState(null);

  const [data, setData] = useState({
    name: "",
    category: "",
    supplier: "",
    qty: '',
    reorderLevel: '',
    unitPrice: '',
    totalValue: '',
    mfgDate: '',
    expDate: '',
    location: "",
    batch: "",
    po: "",
    warehouse: ""
  });

  const products = [
    { id: 1, warehouse: "wh3", name: "name1", category: "cat1", mfg: "2024-11-19", exp: "2024-11-19", supplier: "cupboar1", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "2023-0321", Invenytory: 851 },
    { id: 2, name: "name2", mfg: "brea1", exp: 55, supplier: "cupboar2", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 8451 },
    { id: 2, name: "name3", mfg: "bread2", exp: 10, supplier: "cupboard3", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 1465 },
  ];

  const warehouses = [{ id: 1, name: "wh1" }, { id: 2, name: "wh2" }];
  const locations = [{ id: 1, row: 1, col: 1, maxCapacity: 1000 }, { id: 2, row: 1, col: 2, maxCapacity: 22000 }];
  const suppliers = [{ id: 1, name: "supplier1", address: "address1", contact: "contact1" },
  { id: 2, name: "supplier2", address: "address2", contact: "contact2" }
  ]


  useEffect(() => {
    if (updateProduct) {
      try {
        const decoded = JSON.parse(decodeURIComponent(updateProduct));
        setUpdateProduct(decoded);
        getUpdate(decoded);
      } catch (error) {
        console.log(error);
      }
    } else if (location) {
      try {
        const decoded = JSON.parse(decodeURIComponent(location));
        setCurrentLocation(decoded);
        getUpdate(decoded);
        data.warehouse = location?.Warehouse;
      
      } catch (error) {
        console.log(error);
      }
    }else if (updateProductAtCurrentLocation) {
      try {
        const decoded = JSON.parse(decodeURIComponent(updateProductAtCurrentLocation));
        // setCurrentLocation(decoded);
        getUpdate(decoded);
      } catch (error) {
        console.log(error);
      } 
    }

  }, [updateProduct, location, updateProductAtCurrentLocation])

  const getUpdate = (product) => {
    if (product) {
      data.name = product?.name;
      data.category = product?.category;
      data.supplier = product?.supplier;
      data.qty = product?.Quantity;
      data.reorderLevel = product?.reorderLevel;
      data.unitPrice = product?.unitPrice;
      data.totalValue = product?.totalValue;
      data.mfgDate = product?.mfg;
      data.expDate = product?.exp;
      data.location = product?.location;
      data.batch = product?.batch;
      data.po = product?.PO;
    }
  }

  if (count < 0) {
    setCount(0);
  }

  const handleSubmit = () => {

  };
  const [error, setError] = useState("");

  const handleQtyChange = () => {
    let x = document.getElementById("qty").value;

    x = parseInt(x);

    if (isNaN(x)) {
      setCount(0);
    } else {
      setCount(x);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name == "currentProduct" && value != "Select Product") {
      // data.name = value; 
      const product = { name: "product1", reorder: 5000, category: "cate2" }
      // data.reorderLevel = product?.reorder;
      setData((prevData) => ({
        ...prevData,
        "name": value,
        "reorderLevel": product?.reorder,
        "category": product?.category
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
        style={{ minHeight: "90vh" }}
        className="container mt-5 mt-md-20 d-flex flex-column justify-content-center align-items-center"
      >
        {/* <div className=" d-flex justify-content-center " > */}
        {updateProduct &&
          <h3 className="text-black bg-white rounded-2 p-2 shadow-lg mb-2 mt-5">Update Product</h3>
        }
        {!updateProduct &&
          <h3 className="text-black bg-white rounded-2 p-2 shadow-lg mb-2 mt-5">Add Product</h3>
        }

        {/* </div> */}

        <div className={"d-flex flex-wrap flex-row row border rounded-3 h-auto p-3 bg-white shadow "}>
          <div className=" col-md-6 col-lg-6 text-end" >
            <div style={{ height: "20px", marginTop: "20px" }}>
              <label className=" mb-1">Location:</label>
            </div>
            <div style={{ height: "17px", marginTop: "20px" }}>
              <label className=" mb-1">Warehouse:</label>
            </div>
            <div style={{ height: "25px", marginTop: "28px" }}>
              <label className=" mb-1">Product Name:</label>
            </div>
            <div style={{ height: "25px", marginTop: "15px" }}>
              <label className=" mb-1">Product Category:</label>
            </div>
            {!updateProduct &&
              <div style={{ height: "25px", marginTop: "20px" }}>
                <label className=" mb-1">Supplier:</label>
              </div>
            }


            <div style={{ height: "30px", marginTop: "15px" }}>
              <label className=" mb-1">Reorder Level:</label>
            </div>
            {!updateProduct &&
              <>
                <div style={{ height: "25px", marginTop: "20px" }}>
                  <label className=" mb-1">Unit Price:</label>
                </div>
                <div style={{ height: "30px", marginTop: "20px" }}>
                  <label className=" mb-1">Total Value:</label>
                </div>
                <div style={{ height: "28px", marginTop: "20px" }}>
                  <label className=" mb-1">MFG Date:</label>
                </div>
                <div style={{ height: "20px", marginTop: "20px" }}>
                  <label className=" mb-1">EXP Date:</label>
                </div>

                <div style={{ height: "25px", marginTop: "23px" }}>
                  <label className=" mb-1">Quantity:</label>
                </div>
                <div style={{ height: "30px", marginTop: "23px" }}>
                  <label className=" mb-1">Batch/Lot:</label>
                </div>
                <div style={{ height: "25px", marginTop: "23px" }}>
                  <label className=" mb-1">PO:</label>
                </div>
              </>
            }
          </div>
          <div className="  col-md-6 col-lg-6">
            <form onSubmit={handleSubmit} className="input-group mt-3" style={{ width: "60%" }}>
              <div className="input-group" style={{ marginTop: "4px", fontWeight: location ? 700 : 500 }} >
                {!location &&
                  <select
                    name="location"
                    onChange={handleChange}
                  >
                    {!updateProduct &&
                      <option value="">Select Location</option>
                    }
                    {updateProduct &&
                      <option value="">{updateProduct2?.Location}</option>
                    }
                    {locations?.map((item, key) => (
                      <option key={key} value={item?.row}>
                        Row:{item.row} Col:  {item.col}
                      </option>
                    ))}
                  </select>
                }
                {location && (
                  <>
                    Row: {currentLocation?.Row} Col: {currentLocation?.Column}
                  </>
                )}
              </div>
              <div className="input-group" >
                {!location &&
                  <select
                    name="warehouse"
                    onChange={handleChange}
                    style={{ marginTop: 10 }}
                  >
                    {!updateProduct &&
                      <option value="">Select warehouse</option>
                    }
                    {updateProduct &&
                      <option value="">{updateProduct2?.warehouse}</option>
                    }
                    {warehouses?.map((item, key) => (
                      <option key={key} value={item?.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                }
                {location && (
                  <input
                  style={{ marginTop: 10 }}
                  type="text"
                  className="form-control"
                  placeholder="Enter product name"
                  value={currentLocation?.Warehouse}
                  onChange={handleChange}
                  disabled
                />
                )}
              </div>
              <div className="input-group" style={{ marginTop: 0 }}>
                {!location &&
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter product name"
                      value={data?.name}
                      onChange={handleChange}
                      required
                    />
                  </>}
                {location && (
                  <>
                    <select
                      name={location != null ? "currentProduct" : "name"}
                      onChange={handleChange}
                      style={{ marginTop: 15 }}
                    >
                      {!updateProduct &&
                        <option value="">Select Product</option>
                      }
                      {updateProduct &&
                        <option value="">{updateProduct2?.Location}</option>
                      }
                      {products?.map((item, key) => (
                        <option key={key} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

              </div>
              <div className="input-group" style={{ marginTop: 8 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder="Enter category"
                    value={data?.category}
                    onChange={handleChange}
                    required
                    disabled = {location !== null }
                  />
                
              </div>
              {!updateProduct &&
                <div className="input-group" style={{ marginTop: 10 }}>
                  <select
                    name="supplier"
                    onChange={handleChange}
                  // value={suppliers[0]?.name}
                  >
                    {!updateProduct2 &&
                      <option value="">Select supplier</option>
                    }
                    {updateProduct2 &&
                      <option value="">{updateProduct2?.supplier}</option>
                    }
                    {suppliers?.map((item, key) => (
                      <option key={key} value={item?.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              }
              <div className="input-group" style={{ marginTop: 10 }}>
                <input
                  type="number"
                  className="form-control"
                  name="reorderLevel"
                  placeholder="Reorder level"
                  value={data?.reorderLevel}
                  onChange={handleChange}
                  required
                  disabled={location !== null}
                />
              </div>
              {!updateProduct &&
                <>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="number"
                      className="form-control"
                      name="unitPrice"
                      placeholder="Enter unit price"
                      value={data?.unitPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="number"
                      className="form-control"
                      name="totalValue"
                      placeholder="Enter totalValue"
                      value={data?.totalValue}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="date"
                      className="form-control "
                      name="mfgDate"
                      placeholder="Enter MFG date"
                      value={data?.mfgDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="date"
                      className="form-control"
                      name="expDate"
                      placeholder="Enter EXP date"
                      value={data?.expDate}
                      onChange={handleChange}
                    />
                  </div>



                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="number"
                      className="form-control"
                      name="qty"
                      placeholder="Enter quantity"
                      value={data?.qty}
                      onChange={handleChange}
                      required
                    />

                  </div>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="text"
                      className="form-control"
                      name="batchc"
                      placeholder="Enter batch"
                      value={data?.batch}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group" style={{ marginTop: 10 }}>
                    <input
                      type="text"
                      className="form-control"
                      name="po"
                      placeholder="Enter PO"
                      value={data?.po}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>}

              <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                <button type="submit" className="btn btn-primary w-100 mb-2">
                  {updateProduct != null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       backgroundImage: `url(${"/assets/images/inventory-management.jpg"})`,
  //       backgroundRepeat: "no-repeat",
  //       backgroundSize: "cover",
  //       height: "80vh"
  //     }}
  //   >
  //     <div
  //       className=" container mt-5 mt-md-20 d-flex flex-column justify-content-center align-items-center"
  //       style={{ width: 2000, height: 500 }}
  //     >
  //       <div
  //         className=" row  border rounded-3 h-auto p-3 bg-white shadow-lg"
  //       >
  //         <div className="col-md-6 col-lg-5 right-box">
  //           <form onSubmit={handleSubmit} className="input-group">
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 name="firstName"
  //                 placeholder="Enter your first name"
  //                 value={data.firstName}
  //                 onChange={handleChange}
  //                 required
  //               />
  //             </div>
  //           </form>
  //         </div>
  //         {/* <div className="card-body">
  //           <h2>Add Product</h2>
  //           <form id="addProductForm">
  //             <div className="d-flex flex-column">
  //               <div className="p-2">
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   placeholder="Product Name"
  //                   style={{ width: 250 }}
  //                   id="pName"
  //                 />
  //               </div>
  //               <div className="p-2">
  //                 <select
  //                   className="form-select"
  //                   aria-label="Default select example"
  //                   style={{ width: 250 }}
  //                   id="category"
  //                 >
  //                   <option selected value="category">
  //                     Category
  //                   </option>
  //                   <option value="1">One</option>
  //                   <option value="2">Two</option>
  //                   <option value="3">Three</option>
  //                 </select>
  //               </div>

  //               <div className="p-2">
  //                 {" "}
  //                 <textarea
  //                   className="form-control"
  //                   placeholder="Product Description"
  //                   style={{ resize: "none", width: 500, height: 200 }}
  //                 />
  //               </div>
  //               <div className="d-flex flex-row">
  //                 <div className="p-2">
  //                   <label for="qty">Qty</label>
  //                 </div>
  //                 <div className="p-2">
  //                   {" "}
  //                   <button
  //                     className="btn btn-secondary"
  //                     type="button"
  //                     onClick={() => setCount(count - 1)}
  //                   >
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       width="16"
  //                       height="16"
  //                       fill="currentColor"
  //                       className="bi bi-dash"
  //                       viewBox="0 0 16 16"
  //                     >
  //                       <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
  //                     </svg>
  //                   </button>
  //                 </div>
  //                 <div className="p-2">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     style={{ width: 60 }}
  //                     id="qty"
  //                     value={count}
  //                     onChange={handleQtyChange}
  //                   />
  //                 </div>
  //                 <div className="p-2">
  //                   {" "}
  //                   <button
  //                     className="btn btn-secondary"
  //                     type="button"
  //                     onClick={() => setCount(count + 1)}
  //                   >
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       width="16"
  //                       height="16"
  //                       fill="currentColor"
  //                       className="bi bi-plus"
  //                       viewBox="0 0 16 16"
  //                     >
  //                       <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
  //                     </svg>
  //                   </button>
  //                 </div>

  //                 <div className="p-2 align-items-center">
  //                   <button
  //                     type="button"
  //                     data-mdb-button-init
  //                     data-mdb-ripple-init
  //                     className="btn btn-primary btn-block mb-4"
  //                     style={{ width: 100 }}
  //                     onClick={handleSubmit}
  //                   >
  //                     Submit
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </form>
  //         </div> */}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AddProduct;
