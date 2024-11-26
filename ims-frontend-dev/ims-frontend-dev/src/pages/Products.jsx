import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'
import { useEffect } from 'react';
import { productsList } from '../services/ProductService';

const Products =()=> {
  const [showFilters, setShowFilters] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

//   const initState = [
//     { id: 1, warehouse: "wh3", name: "name1", category: "cat1", mfg: "2024-11-19", exp: "2024-11-19", supplier: "cupboar1", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "2023-0321", Invenytory: 851 },
//     { id: 2, name: "name2", mfg: "brea1", exp: 55, supplier: "cupboar2", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 8451 },
//     { id: 2, name: "name3", mfg: "bread2", exp: 10, supplier: "cupboard3", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 1465 },
//   ];

  useEffect(()=>{
   getProducts();
  }, [])

  const getProducts =()=>{
    productsList().then((response) =>{
      const data = response?.data;
      setProducts(data);
  }).catch(error =>{
      toast.error(error.response.data);
  })
  }

  const onChange = (e) => {
    setShowFilters(true);
    setInput(e.target.value);
  }

  const handleClick = (product) => {
    navigate('/productInventory', { state: { product } });
  }

  const addProduct = () => {
    navigate("/admin/addProduct");
  }

  const handleUpdate = (updateProduct) => {
    navigate(`/admin/addProduct/${encodeURIComponent(JSON.stringify(updateProduct))}`, { state: { updateProduct } });
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      
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
            {products?.map((item) => (
              <tr key={item.id} >
                {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td style={{ backgroundColor: "#d0f1b9", fontWeight: 640, cursor: 'pointer' }} onClick={() => handleClick(item)}>{item.name}</td>
                <td>{item?.restockLevel}</td>

                <td><button style={{ backgroundColor: "#d0f1b9", fontWeight: 640 }} onClick={() => handleClick(item)} className='btn border-0 text-black '>Open</button>
                  <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(item)} className='btn bg-secondary border-0 text-white '>Update</button>
                  <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, float: "right" }} className="float-right">
          <button type="submit" onClick={addProduct} className="btn btn-primary w-10  mb-2">
            Add Product
          </button>
        </div>
      </div>
    </div>


  );
}

export default Products;