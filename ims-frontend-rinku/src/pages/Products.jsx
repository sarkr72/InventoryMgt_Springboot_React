import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'
import { useEffect } from 'react';
import { deleteProduct, productsList, updateProduct } from '../services/ProductService';
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([]);

  const [data, setData] = useState(
    {
      name: "",
      category: "",
      restockLevel: "",
      unitPrice: ""
    }

  );

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    productsList().then((response) => {
      const data = response?.data;
      setProducts(data);
    }).catch(error => {
      toast.error(error.response.data);
    })
  }

  const onChange = (e) => {
    setShowFilters(true);
    setInput(e.target.value);
  }

  const handleClick = (e, product) => {
    if (e.target.name === "cancel") {
      setEditingRow(null);
    } else {
      navigate('/productInventory', { state: { product } });
    }
  }

  const addProduct = () => {
    navigate("/admin/addProduct");
  }

  const handleDelete = (item) => {
    if(window.confirm("Are you sure you want to delete this item?")){
    deleteProduct(item.id).then((response) => {
      toast.success("Item Deleted Successfully!");
      getProducts();
    })}
  }

  const handleUpdate = (e, index) => {
    if (e.target.name === "confirm") {
      updateProduct(editableData?.id, editableData).then((response) => {
        getProducts();
        toast.success("Item Updated Successfully!");
        setEditingRow(null);
        setEditableData(null)
      }).catch((error)=>{
        console.log(error);
      })

    } else {
      setEditingRow(index);
      setEditableData(products[index])
    }
    // navigate(`/admin/addProduct/${encodeURIComponent(JSON.stringify(updateProduct))}`, { state: { updateProduct } });
  }

  const handleInputChange = (index, name, value) => {
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <ToastContainer />
      <div className="input-group d-flex m-auto mt-2" style={{ maxWidth: '600px' }}>
        <input onChange={(e) => { onChange(e) }} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-init>search</button>
      </div>
      {/* out of scope */}
      {showFilters && input.trim().length > 1 && (
        <div className='d-flex m-auto mt-1 text-white ' style={{ backgroundColor: "darkblue", maxWidth: "450px" }}>
          <h6>Filters</h6>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
            <label className="form-check-label" for="inlineCheckbox1">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
            <label className="form-check-label" for="inlineCheckbox2">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled />
            <label className="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
          </div>
        </div>
      )}

      <div className='m-5'>
        <h4>Products</h4>
        <table className="table table-bordered">
          <thead>
            {/* <tr key={"header"}>
              {Object.keys(initState[0]).map((key) => (
                <th>{key}</th>
              ))}
            </tr> */}
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Product Name</th>
              <th scope="col">Restock Level</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={item.id} >
                {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                <td>{item.id}</td>
                <td>
                  {" "}
                  {editingRow === index ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        value={editableData?.category}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "category",
                            e.target.value
                          )
                        }
                        style={{ maxWidth: "130px" }}
                      />
                    </>
                  ) : (
                    item?.category
                  )}
                </td>
                <td style={{ backgroundColor: "#d0f1b9", fontWeight: 640 }}>
                  {" "}
                  {editingRow === index ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        value={editableData?.name}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        style={{ maxWidth: "130px" }}
                      />
                    </>
                  ) : (
                    item?.name
                  )}
                </td>
                <td>
                  {" "}
                  {editingRow === index ? (
                    <>
                      <input
                        type="number"
                        className="form-control"
                        value={editableData?.restockLevel}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "restockLevel",
                            e.target.value
                          )
                        }
                        style={{ maxWidth: "130px" }}
                      />
                    </>
                  ) : (
                    item?.restockLevel
                  )}
                </td>

                <td className='d-flex flex-row' >
                  <button name={editingRow === index ? "cancel" : "open"} style={{ fontWeight: 640, backgroundColor: editingRow === index ? "" : "#d0f1b9", color: editingRow === index ? "white" : "" }} onClick={(e) => handleClick(e, item)} className={` btn border-0 ${editingRow === index ? "bg-secondary" : ""}`}>{editingRow === index ? "Cancel" : "Open"}</button>
                  <button name={editingRow === index ? "confirm" : "edit"} style={{ marginLeft: "10px" }} onClick={(e) => handleUpdate(e, index)} className={`btn ${editingRow === index ? "bg-success" : "bg-primary"}  border-0 text-white`}>{editingRow === index ? "Confirm" : "Edit"}</button>
                  <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(item)} className='btn bg-danger border-0 text-white'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, float: "right" }} className="float-right">
          <button type="submit" onClick={addProduct} className="btn btn-secondary text-white w-10  mb-2">
            Add Product
          </button>
        </div>
      </div>
    </div>


  );
}

export default Products;