import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteProductLocation,
  listProductLocations,
  updateProductLocation,
} from "../services/ProductLocations";
import { listWarehouses } from "../services/WarehouseService";
import { listLocations } from "../services/LocationService";
import { listSupplier } from "../services/SupplierService";
import { purchaseOrderList } from "../services/PurchaseOrderService";

const ProductInventory = () => {
  // const { product } = useParams();
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [pos, setPos] = useState([]);

  const [data, setData] = useState({
    name: "name1",
    category: "cate2",
    supplier: "",
    qty: "",
    reorderLevel: "500",
    unitPrice: "",
    totalValue: "",
    mfgDate: "",
    expDate: "",
    location: "",
    batch: "",
    po: "",
    warehouse: "",
    receivedDate: "",
  });

  useEffect(() => {
    getProductInventory();
    getWarehouses();
    getSuppliers();
    getPos();
  }, []);

  const getProductInventory = () => {
    listProductLocations()
      .then((response) => {
        const data = response?.data;
        setProducts(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getWarehouses = () => {
    listWarehouses()
      .then((response) => {
        const data = response?.data;
        setWarehouses(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getSuppliers = () => {
    listSupplier()
      .then((response) => {
        const data = response?.data;
        setSuppliers(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getPos = () => {
    purchaseOrderList()
      .then((response) => {
        const data = response?.data;
        setPos(data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const handleEdit = (index) => {
    setEditingRow(index);
    setEditableData(products[index]);
    loadLocations(products[index]?.location?.warehouse?.name);
  };

  const loadLocations = (value) => {
    const warehouse = warehouses.find((w) => w.name === value);
    const locs = warehouse ? warehouse.locations : [];
    setLocations(locs);
  };

  const handleInputChange = (index, field, value) => {
    if (field === "warehouse") {
      loadLocations(value);
    }
    // const updatedData = [...editableData];
    // updatedData[field] = value;
    // setEditableData(updatedData);
    if (field === "supplier") {
      const selectedSupplier = JSON.parse(value);
      setEditableData((prevData) => ({
        ...prevData,
        supplier: {
          id: selectedSupplier?.item?.id,
          name: selectedSupplier?.item?.name,
        },
      }));
    } else if (field === "Location") {
      const selectedLocation = JSON.parse(value);
      setEditableData((prevData) => ({
        ...prevData,
        location: {
          id: selectedLocation?.id,
          row: selectedLocation?.row,
          col: selectedLocation.col,
        },
      }));
    } else if (field === "po") {
      const selectedPo = JSON.parse(value);
      setEditableData((prevData) => ({
        ...prevData,
        po: {
          id: selectedPo?.item?.id,
          po: selectedPo?.item?.po,
        },
      }));
    } else {
      setEditableData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSave = async (index) => {
    // const updatedProduct = editableData[index];
    console.log(editableData);
    try {
      updateProductLocation(editableData.id, editableData).then((response) => {
        const data = response?.data;
      });

      const updatedProducts = [...products];
      // updatedProducts[index] = response.data;
      updatedProducts[index] = editableData;
      setProducts(updatedProducts);

      setEditingRow(null);
      window.location.reload();
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }
  };

  const handleDelete = (index) => {
    deleteProductLocation(index)
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const getTotal = () => {
    setTotal(products.reduce((acc, product) => acc + product.Quantity, 0));
  };

  useEffect(() => {
    getTotal();
  }, []);

  const handleClick = () => {
    if (showAdd) {
      const hasNull = Object.values(data).some((value) => value.length < 1);
      if (hasNull) {
        console.log("nnn", data);
        toast.error("Please enter all fields!");
      } else {
        toast.success("Stock added successfully!");
        setShowAdd(!showAdd);
        Object.keys(data).forEach((key) => {
          data[key] = "";
        });
        data.name = "productName";
        data.category = "cat1";
        data.reorderLevel = 5000;
      }
    } else {
      setShowAdd(!showAdd);
    }
  };

  const handleClick2 = () => {
    setShowAdd(!showAdd);
    Object.keys(data).forEach((key) => {
      data[key] = "";
    });
    data.name = "productName";
    data.category = "cat1";
    data.reorderLevel = 5000;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="offset-1">
        <h2>Product Inventory</h2>
        <p>
          Product Name: <span className="fw-bold">{product.name}</span>
          {", "}Unit Price: <span className="fw-bold"> {product.name}</span>
        </p>
      </div>
      <ToastContainer />
      <div className="m-5">
        <div className="d-flex flex-column" style={{ maxWidth: "100%" }}>
          <div style={{ width: "100%" }} className="container-fluid">
            <div className="table-responsive" style={{ width: "100%" }}>
              <table className="table table-hover table-bordered table-responsive">
                <thead>
                  <tr>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      #
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Receiving Date
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      MFG Date
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className="text-white"
                      scope="col"
                    >
                      Exp Date
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Supplier
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Warehouse
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Location
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className="text-white"
                      scope="col"
                    >
                      Batch
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      PO
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Unit Price
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Total Price
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className="text-white"
                      scope="col"
                    >
                      Qty
                    </th>
                    <th
                      style={{ backgroundColor: "#3C3A7D" }}
                      className=" text-white"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <>
                        <tr key={index}>
                          <td
                            style={{
                              backgroundColor: "#3C3A7D",
                              color: "white",
                            }}
                          >
                            {product.id}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <>
                                {/* {console.log("sfsdf", editableData.receivedDate)} */}
                                <input
                                  type="date"
                                  className="form-control"
                                  value={editableData.receivedDate}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "receivedDate",
                                      e.target.value
                                    )
                                  }
                                  style={{ maxWidth: "130px" }}
                                />
                              </>
                            ) : (
                              product?.receivedDate
                            )}
                          </td>

                          <td style={{ maxWidth: "150px" }}>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="date"
                                className="form-control"
                                value={editableData?.mfgDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "mfgDate",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.mfgDate
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="date"
                                className="form-control"
                                value={editableData?.expDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "expDate",
                                    e.target.value
                                  )
                                }
                                style={{ maxWidth: "130px" }}
                              />
                            ) : (
                              product?.expDate
                            )}
                          </td>

                          <td style={{ maxWidth: "100px" }}>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px", maxWidth: "100px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "supplier",
                                    e.target.value
                                  )
                                }
                              >
                                <option
                                  value={JSON.stringify(product?.supplier)}
                                >
                                  {product?.supplier?.name}
                                </option>
                                {suppliers?.map((item, key) => (
                                  <option
                                    key={key}
                                    value={JSON.stringify({ item })}
                                  >
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.supplier?.name
                            )}
                          </td>
                          <td style={{ maxWidth: "60px" }}>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px", maxWidth: "80px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "warehouse",
                                    e.target.value
                                  )
                                }
                              >
                                {warehouses?.map((item, key) => (
                                  <option key={key} value={item?.name}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.location?.warehouse?.name
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px" }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "Location",
                                    e.target.value
                                  )
                                }
                              >
                                <option
                                  value={JSON.stringify(product?.location)}
                                >
                                  Row: {product?.location?.row} Col:{" "}
                                  {product?.location?.col}
                                </option>
                                {locations?.map((item, key) => (
                                  <option
                                    key={key}
                                    value={JSON.stringify({
                                      id: item.id,
                                      row: item.row,
                                      col: item.col,
                                    })}
                                  >
                                    Row:{item?.row} Col: {item?.col}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              `Row:  ${product?.location?.row}  Col:  ${product?.location?.col}`
                            )}
                          </td>

                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="text"
                                className="form-control"
                                value={editableData?.batchNumber}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "batchNumber",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.batchNumber
                            )}
                          </td>
                          <td>
                            {" "}
                            {editingRow === index ? (
                              <select
                                style={{ marginTop: "7px" }}
                                onClick={(e) =>
                                  handleInputChange(index, "po", e.target.value)
                                }
                              >
                                <option value={JSON.stringify(product?.po)}>
                                  {product?.po?.po}
                                </option>
                                {pos?.map((item, key) => (
                                  <option
                                    key={key}
                                    value={JSON.stringify({ item })}
                                  >
                                    {item?.po}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              product?.po?.po
                            )}
                          </td>
                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="number"
                                className="form-control"
                                value={editableData?.unitPrice}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "unitPrice",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.unitPrice
                            )}
                          </td>
                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="number"
                                className="form-control"
                                value={editableData?.totalprice}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "totalprice",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.totalprice
                            )}
                          </td>
                          <td>
                            {" "}
                            {editingRow === index ? (
                              <input
                                type="number"
                                className="form-control"
                                value={editableData?.quantity}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              product?.quantity
                            )}
                          </td>

                          <td className="d-flex flex-row">
                            {editingRow === index ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSave(index)}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleEdit(index)}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              style={{ marginLeft: "10px" }}
                              className="btn bg-danger border-0 text-white"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            {showAdd && (
              <>
                <div className="d-flex flex-row">
                  <input
                    type="text"
                    className="form-control"
                    name="mfgDate"
                    placeholder="MFG Date"
                    value={data?.mfgDate}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="expDate"
                    placeholder="EXP Date"
                    value={data?.expDate}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="supplier"
                    placeholder="Supplier"
                    value={data?.supplier}
                    onChange={handleChange}
                    required
                  />
                  <select
                    style={{ marginTop: "7px" }}
                    onChange={handleChange}
                    name="warehouse"
                  >
                    <option>Select Warehouse: </option>
                    {warehouses?.map((item, key) => (
                      <option key={key} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                  <select
                    style={{ marginTop: "7px" }}
                    onChange={handleChange}
                    name="location"
                  >
                    <option>Select Location: </option>
                    {locations?.map((item, key) => (
                      <>
                        {console.log("hello")}
                        <option
                          key={key}
                          value={`Row: ${item.Row} Col: ${item.Column}`}
                        >
                          Row:{item.Row} Col: {item?.Column}
                        </option>
                      </>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    name="batch"
                    placeholder="Batch/Lot"
                    value={data?.batch}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="po"
                    placeholder="PO"
                    value={data?.po}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    className="form-control"
                    name="unitPrice"
                    placeholder="Unit Price"
                    value={data?.unitPrice}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    className="form-control"
                    name="totalValue"
                    placeholder="Total Price"
                    value={data?.totalValue}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    className="form-control"
                    name="qty"
                    placeholder="Quantity"
                    value={data?.qty}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div
              className="d-flex flex-column text-end w-100"
              style={{ width: "100%", marginTop: 0 }}
            >
              <div className="mb-2" style={{ width: "100%" }}>
                <button
                  style={{
                    float: "right",
                    maxWidth: "90px",
                    marginLeft: "10px",
                    width: "100%",
                  }}
                  className="bg-secondary text-white mt-3"
                  onClick={handleClick}
                >
                  {" "}
                  {showAdd === true ? "Confirm" : "Add Stock"}
                </button>
                {showAdd && (
                  <button
                    style={{ float: "right", maxWidth: "90px" }}
                    className="bg-secondary text-white mt-3"
                    onClick={handleClick2}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                )}
              </div>
              <p
                className=""
                style={{ backgroundColor: "#6AF86F", fontWeight: "bold" }}
              >
                Total: {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInventory;
