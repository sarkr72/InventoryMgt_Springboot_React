import React from "react";
import { useState, useEffect } from "react";
import CreatePurchaseOrder from "./CreatePurchaseOrder";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ViewPurchaseOrder = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setUpdateOpenModal] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "toilet",
      date: "2/23/2023",
      quantity: 5,
      totalPrice: 500,
      employee: "Daniel",
      supplier: "Amazon",
    },
    {
      id: 2,
      product: "ps5",
      date: "03/03/2024",
      quantity: 4,
      totalPrice: 1000,
      employee: "Bob",
      supplier: "Best buy",
    },
  ]);

  return (
    <div>
      <div className="offset-1">
        <h2>Purchase orders</h2>
      </div>
      <div className="m-5">
        <table
          className="table table-hover table-bordered table-striped table-dark"
          style={{ maxWidth: "170vh" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Date</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total price</th>
              <th scope="col">Order created by</th>
              <th scope="col">Product made by</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
                <td>{order.employee}</td>
                <td>{order.supplier}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setUpdateOpenModal(true)}
                    style={{ marginLeft: "15px" }}
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginLeft: "15px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ float: "right" }}>
        {" "}
        <button
          className="btn btn-dark"
          onClick={() => setOpenCreateModal(true)}
        >
          Create purchase order
        </button>
        <CreatePurchaseOrder
          show={openCreateModal}
          onHide={() => setOpenCreateModal(false)}
        />
      </div>
      <UpdatePurchaseOrder
        show={openUpdateModal}
        onHide={() => setUpdateOpenModal(false)}
      />
    </div>
  );
};

const UpdatePurchaseOrder = (props) => {
  const [count, setCount] = useState(0);

  const [total, setTotal] = useState(0.0);
  const [price, setPrice] = useState(0.0);

  if (count < 0) {
    setCount(0);
  }

  const handleQtyChange = () => {
    let x = document.getElementById("qty").value;

    x = parseInt(x);

    if (isNaN(x)) {
      setCount(0);
    } else {
      setCount(x);
    }
  };

  const handleOnChange = () => {
    var e = document.getElementById("products");
    var val = e.options[e.selectedIndex].value;
    if (val === "product" || isNaN(val)) {
      setPrice(0);
    } else {
      setPrice(val);
    }

    setCount(0);
  };

  const handlePurchase = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    var x = parseFloat(price);
    setTotal(x * count);
  }, [count]);

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Update purchase order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product:</Form.Label>
              <Form.Control type="text" placeholder="product" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" autoFocus />
            </Form.Group>
            <Form.Group
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
                    onClick={() => setCount(count - 1)}
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
                    onClick={() => setCount(count + 1)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewPurchaseOrder;
