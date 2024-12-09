import React from "react";
import { productsList } from "../services/ProductService.js";
import { useState, useEffect } from "react";
import { createPurchaseOrder } from "../services/PurchaseOrderService.js";
import { getEmployee } from "../services/EmployeeService.js";
import { listSupplier } from "../services/SupplierService.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Quantity from "../components/Quantity";

const CreatePurchaseOrder = (props) => {
  const currentEmployee = localStorage.getItem("currentEmployeeEmail");

  const [data, setData] = useState({
    date: "",
    quantity: 0,
    totalAmount: 0,
    po: "",
    productNames: [],
    employee: "",
    supplier: "",
    company: "",
  });

  const [suppliers, setSuppliers] = useState([
    {
      name: "",
      address: "",
      contact: "",
    },
  ]);

  const [products, setProducts] = useState([
    {
      name: "",
      restockLevel: 0,
      category: "",
      unitPrice: 0,
    },
  ]);

  const [product, setProduct] = useState({
    name: "",
    restockLevel: 0,
    category: "",
    unitPrice: 0,
  });

  const [productCart, setProductCart] = useState([null]);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    fullName: "",
  });

  const handleProductChange = (e) => {
    let product = e.target.value;
    const p = JSON.parse(product);
    setProduct(p);
  };

  const handleAddProduct = () => {
    setProductCart((prevData) => [...prevData, product]);
    setData((prevData) => ({
      ...prevData,
      productNames: [...prevData.productNames, product.product.name],
    }));
  };

  const handlePurchase = () => {
    getEmployee(currentEmployee)
      .then((response) => {
        setEmployee(response.data);
        setData((prevData) => ({
          ...prevData,
          employee: employee.fullName,
        }));
      })
      .catch((err) => console.log(err));

    createPurchaseOrder(data)
      .then((response) => {
        console.log(response.data);
        props.onHide();
        props.getOrders();

        setProductCart([null]);
      })
      .catch((err) => {
        alert(err);
      });

    setData((prevData) => ({
      ...prevData,
      date: "",
      quantity: 0,
      totalAmount: 0,
      po: "",
      productNames: [],
      supplier: "",
      company: "",
    }));
  };

  const handleChange = (e) => {
    recieveEmployee();
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    productsList()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getEmployee("example")
      .then((response) => {
        setEmployee(response.data);
        setData((prevData) => ({
          ...prevData,
          employee: employee.fullName,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const recieveEmployee = () => {
    getEmployee(currentEmployee)
      .then((response) => {
        setEmployee(response.data);

        setData((prevData) => ({
          ...prevData,
          employee: employee.fullName,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listSupplier()
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCartDelete = (index, name) => {
    const updatedCart = productCart.filter((_, i) => i !== index);
    setProductCart(updatedCart);

    const location = data.productNames.indexOf(name);
    const updatedNames = data.productNames.filter((_, i) => i !== location);
    setData((prevData) => ({ ...prevData, productNames: updatedNames }));
  };

  return (
    <>
      <Modal {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create purchase order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="createPO">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>PO:</Form.Label>
              <Form.Control
                type="text"
                name="po"
                value={data.po}
                onChange={handleChange}
                placeHolder="Enter PO name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Supplier:</Form.Label>
              <select
                onChange={handleChange}
                name="supplier"
                className="form-select"
              >
                <option>Choose a supplier</option>
                {suppliers.map((supplier) => (
                  <option value={supplier.name}>{supplier.name}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group>
              <div className="d-flex flex-row mt-2">
                <div className="p-2">
                  <Form.Label>Add Product: </Form.Label>
                </div>
                <div className="p-2">
                  <select
                    onChange={handleProductChange}
                    className="form-select"
                  >
                    <option>choose a product</option>
                    {products.map((product) => (
                      <option value={JSON.stringify({ product })}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-2">
                  <Button variant="secondary" onClick={handleAddProduct}>
                    Add{" "}
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>

          <table
            className="table table-hover table-bordered table-striped table-dark"
            style={{ maxWidth: "170vh" }}
          >
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productCart &&
                productCart.map((p, index) => (
                  <>
                    {p !== null && (
                      <>
                        <tr key={index}>
                          <td>{p?.product?.name}</td>
                          <td>${p?.product?.unitPrice.toFixed(2)}</td>
                          <Quantity unitPrice={p?.product?.unitPrice} />
                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ marginLeft: "15px" }}
                              onClick={() =>
                                handleCartDelete(index, p?.product?.name)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>{" "}
                      </>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePurchase}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePurchaseOrder;
