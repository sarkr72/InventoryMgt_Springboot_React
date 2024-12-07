import React from "react";
import { productsList } from "../services/ProductService.js";
import { useState, useEffect } from "react";
import { createPurchaseOrder } from "../services/PurchaseOrderService.js";
import { getEmployee } from "../services/EmployeeService.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CreatePurchaseOrder = (props) => {
  const [data, setData] = useState({
    date: "",
    quantity: 0,
    totalAmount: 0,
    unitPrice: 0,
    po: "",
    productNames: [""],
    employee: "",
    supplier: "",
    company: "",
  });

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

  const [productCart, setProductCart] = useState([
    {
      name: "",
      restockLevel: 0,
      category: "",
      unitPrice: 0,
    },
  ]);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    fullName: "",
  });
  const [count, setCount] = useState(0);

  const [total, setTotal] = useState(0.0);
  const [price, setPrice] = useState(0.0);

  const handleProductChange = (e) => {
    let product = e.target.value;

    setProduct(product);
  };

  const handleQtyChange = (e) => {
    let x = e.target.value;

    x = parseInt(x);

    if (isNaN(x) || x < 0) {
      setCount(0);
    } else {
      setCount(x);
    }
  };

  const handleAddProduct = () => {
    setProductCart((prevData) => [...prevData, product]);
  };

  const handlePurchase = () => {
    createPurchaseOrder(data)
      .then((response) => {
        console.log(response.data);
        props.onHide();
        props.getOrders();
        setData({
          date: "",
          quantity: 0,
          totalAmount: 0,
          unitPrice: 0,
          po: "",
          productNames: [""],
          employee: "",
          supplier: "",
          company: "",
        });

        setCount(0);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    var x = parseFloat(price);
    setTotal((c) => c * x);
  }, [count]);

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

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Create purchase order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="createPO">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="po"
                value={data.po}
                onChange={handleChange}
              />
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
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="d-flex flex-row mt-2">
                <div className="p-2">
                  <Form.Label>Quantity:</Form.Label>{" "}
                </div>
                <div className="p-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      count <= 0 ? setCount(0) : setCount((c) => c - 1);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                </div>

                <div className="p-2">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: 60 }}
                    id="qty"
                    name="quantity"
                    value={count}
                    onChange={handleQtyChange}
                  />
                </div>
                <div className="p-2">
                  {" "}
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setCount((c) => c + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </Form.Group>
            <div className="d-flex flex-column mt-2">
              <div className="p-2">
                <Form.Group>
                  <Form.Label>Total:</Form.Label>
                </Form.Group>
              </div>
            </div>
            */}
            <Form.Group>
              <Form.Label>Add Product: </Form.Label>
              <select onChange={handleProductChange}>
                <option>choose a product</option>
                {products.map((product) => (
                  <option name="productName" value={product}>
                    {product.name}
                  </option>
                ))}
              </select>
              <Button variant="secondary" onClick={handleAddProduct}>
                Add{" "}
              </Button>
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
              </tr>
            </thead>
            <tbody>
              {productCart.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td></td>
                </tr>
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
