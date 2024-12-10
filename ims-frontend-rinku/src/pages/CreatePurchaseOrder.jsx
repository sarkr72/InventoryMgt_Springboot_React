import React from "react";
import { productsList, productsListByCompany } from "../services/ProductService.js";
import { useState, useEffect } from "react";
import { createPurchaseOrder } from "../services/PurchaseOrderService.js";
import { getEmployee } from "../services/EmployeeService.js";
import { listSupplier } from "../services/SupplierService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Quantity from "../components/Quantity";
import { listSuppliersById } from "../services/CompanyService.js";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const CreatePurchaseOrder = (props) => {
  const [errors, setErrors] = useState({
    po: "",
    supplier: "",
    productNames: "",
    date: "",
  });
const [readyToSend, setReadyToSend] = useState(false);

  const [productError, setProductError] = useState(false);

  const [data, setData] = useState({
    date: "",
    totalAmount: 0,
    po: "",
    productNames: [],
    employee: "",
    supplier: "",
    company: "",
    quantity: 0 
  });

  const [suppliers, setSuppliers] = useState([
    {
      name: "",
      address: "",
      contact: "",
    },
  ]);

  const [savedProducts, setSavedProducts] = useState([
    {
      name: "",
      restockLevel: 0,
      category: "",
      unitPrice: 0,
    },
  ]);
 
  const [products, setProducts] = useState([]);

  const [productCart, setProductCart] = useState([null]);

  const handleProductChange = (index, field, value) => {

    if(field === "productObject"){
      console.log("called")
      const p = JSON.parse(value);
       setProducts((prevData) => [
      ...prevData,
      {
      name : p?.name,
      restockLevel: p?.restockLevel,
      category: p?.category,
      company: {id: p?.company?.id},
      unitPrice: 0,
      quantity: 0,
      totalPrice: parseFloat((0).toFixed(2))
    }]);
    }else{
        setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          [field]: field === 'unitPrice' || field === 'quantity' ? parseFloat(value) : value,
          totalPrice: field === 'unitPrice' || field === 'quantity'
            ? parseFloat((updatedProducts[index].unitPrice * updatedProducts[index].quantity).toFixed(2))
            : updatedProducts[index].totalPrice
        };
    return updatedProducts;
  });
}};


  // const handleAddProduct = () => {
  //   if (product.name === "") {
  //     setProductError(true);
  //   } else {
  //     setProductError(false);
  //     setProductCart((prevData) => [...prevData, product]);
  //     setData((prevData) => ({
  //       ...prevData,
  //       productNames: [...prevData?.productNames, (product?.name + ":" + product?.quantity + ":" + product?.unitPrice)],
  //     }));
  //   }
  // };

  useEffect(() => {
  if (readyToSend) {
    sendDataToBackend(data);
    setReadyToSend(false); 
  }
}, [data, readyToSend]);

  const handlePurchase = async (e) => {
    e.preventDefault();

    try {
      // await validationSchema.validate(data, { abortEarly: false });
      setData((prev)=> ({
        ...prev,
        company: localStorage.getItem('companyName')
      }));
      const updatedProductNames = [];
      let totalQuantity = data?.quantity || 0;
      let totalAmount = data?.totalAmount || 0;

      products?.forEach((p) => {
        updatedProductNames.push(`${p?.name}:${p?.unitPrice}:${p?.quantity}:${p?.totalPrice}`);
        totalQuantity += p?.quantity;
        totalAmount += p?.totalPrice;
      });

      setData((prev) => ({
        ...prev,
        productNames: [...prev?.productNames, ...updatedProductNames],
        quantity: totalQuantity,
        totalAmount: totalAmount,
      }));
      console.log(data) 
      // createPurchaseOrder(data)
      //   .then((response) => {
      //     props.onHide();
      //     props.getorders();

      //     setProductCart([null]);
      //   })
      //   .catch((err) => {
      //     alert(err);
      //   });
 
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    productsListByCompany(localStorage.getItem("companyId"))
      .then((response) => {
        setSavedProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    listSuppliersById(localStorage.getItem("companyId"))
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCartDelete = (index, name) => {
    // const updatedCart = productCart.filter((_, i) => i !== index);
    // setProductCart(updatedCart);

    // const location = data.productNames.indexOf(name);
    // const updatedNames = data.productNames.filter((_, i) => i !== location);
    // setData((prevData) => ({ ...prevData, productNames: updatedNames }));
  };

  return (
    <>
      <ToastContainer />
      <Modal {...props} size="lg">
        <Form id="createPO" onSubmit={handlePurchase}>
          <Modal.Header closeButton>
            <Modal.Title>Create purchase order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>PO:</Form.Label>
              <Form.Control
                type="text"
                name="po"
                value={data?.po}
                onChange={handleChange}
                placeholder="Enter PO name"
              />
              {errors.po && <div style={{ color: "red" }}> {errors.po}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Supplier:</Form.Label>
              <select
                onChange={handleChange}
                name="supplier"
                className="form-select"
              >
                <option>Choose a supplier</option>
                {suppliers.map((supplier, index) => (
                  <option key={index} value={supplier?.name}>
                    {supplier?.name}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <div style={{ color: "red" }}> {errors?.supplier}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={data?.date}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            {errors.date && <div style={{ color: "red" }}> {errors.date}</div>}
            <Form.Group>
              <div className="d-flex flex-row mt-2">
                <div className="p-2">
                  <Form.Label>Add Product: </Form.Label>
                </div>
                <div className="p-2">
                  <select
                    onChange={(e) => handleProductChange( "", 'productObject', e.target.value)}
                    className="form-select"
                  >
                    <option value="">choose a product</option>
                    {savedProducts.map((product, index) => (
                      <option key={index} name="productObject" value={JSON.stringify( product )}>
                        {product?.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="p-2">
                  <Button variant="secondary" onClick={handleAddProduct}>
                    Add{" "}
                  </Button>
                </div> */}
              </div>
              {productError && (
                <div style={{ color: "red" }}>Must choose a valid product</div>
              )}
            </Form.Group>

            <table
              className="table table-hover table-bordered table-striped table-dark"
              style={{ maxWidth: "170vh" }}
              id="productTable"
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
                {products?.map((p, index) => (
                    <>
                      {p !== null && (
                        <>
                          <tr key={index}>
                            <td>{p?.name}</td>
                            <td style={{width: "100px"}}><input className="rounded-1" style={{width: "75px"}} type="number" name="unitPrice" value={p?.unitPrice} onChange={(e) => handleProductChange(index, 'unitPrice', e.target.value)} /></td>
                            <td style={{height: "20px"}}>
                             <div className="d-flex" >
                              <button className="btn btn-secondary p-0" onClick={(e) => handleProductChange(index, 'dec', e.target.value)}  style={{width: "25px", height: "25px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"   style={{ display: 'block', padding: 0, margin: 0, width: "100%", height: "100%" }} className="bi bi-dash p-0" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                              </button>
                              <input type="text" className="form-control" style={{height: 30, width: 70, marginLeft: "5px", marginRight: "5px" }} id="qty" name="quantity" value={p?.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}/>
                             <button className="btn btn-secondary p-0 " onClick={(e) => handleProductChange(index, 'inc', e.target.value)} style={{width: "25px", height: "25px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" name="inc" style={{ display: 'block', padding: 0, margin: 0, width: "100%", height: "100%" }} className="bi bi-plus p-0" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3.5H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V9H4a.5.5 0 0 1 0-1h3.5V4.5a.5.5 0 0 1 .5-.5z" />
                                </svg>
                             </button>
                              </div>
                            </td>
                            <td>{p?.totalPrice}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-danger"
                                style={{ marginLeft: "15px" }}
                                onClick={() =>
                                  handleCartDelete(index, p?.name)
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
            {errors.productNames && (
              <div style={{ color: "red" }}> {errors.productNames}</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Purchase
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePurchaseOrder;
