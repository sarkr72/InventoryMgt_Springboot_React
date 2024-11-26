import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewLocation = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "name1", mfg: "2024-11-10", exp: "2024-11-10", supplier: "cupboar1", UnitPrice: 654.54, Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Inventory: 851 },
    { id: 2, name: "name2", mfg: "brea1", exp: 55, supplier: "cupboar2", Quantity: 200, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Inventory: 8451 },
    { id: 3, name: "name3", mfg: "bread2", exp: 10, supplier: "cupboard3", Quantity: 600, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Inventory: 1465 },
  ]);
  const navigate = useNavigate();
  const locations = useLocation();
  const { location } = locations.state || null;
  const [editingRow, setEditingRow] = useState(null);
  const [editableData, setEditableData] = useState([...products]);

  const addProduct = () => {
    navigate(`/addStock/${encodeURIComponent(JSON.stringify(location))}`);
  }

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
    setEditableData(updatedData);
  };

  const handleSave = async (index) => {
    const updatedProduct = editableData[index];
    try {
      // const response = await axios.put(
      //   `http://localhost:5000/api/products/${updatedProduct.id}`,
      //   updatedProduct
      // );

      const updatedProducts = [...products];
      // updatedProducts[index] = response.data;
      updatedProducts[index] = updatedProduct;
      setProducts(updatedProducts);

      setEditingRow(null);
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }
  };

  return (
    <div>
      <div className='m-5'>
        <div className='d-flex flex-row align-items-center '>
          <p style={{ maxHeight: "40px", fontWeight: 700, fontSize: 20 }}>Products at: </p>
          <p style={{ maxHeight: "40px", marginLeft: "10px", marginTop: "4px", fontWeight: 500 }}>Row: {location?.Row} Column: {location?.Column}</p>
        </div>
        <table className="table table-collapse table-hover table-bordered">
          <thead>
            {/* <tr key={"header"}>
              {Object.keys(editableData[0]).map((key) => (
                <th>{key}</th>
              ))}
              <th>Action</th>
            </tr> */}
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">MFG Date</th>
              <th scope="col">EXP Date</th>
              <th scope="col">Supllier</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">TotalPrice</th>
              <th scope="col">Batch/Lot</th>
              <th scope="col">PO</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editableData?.map((item, index) => (
              <tr key={item?.id} >
                {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                <td>{item?.id}</td>
                <td> {editingRow === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={item?.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                ) : (
                  item?.name
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="date"
                    className="form-control"
                    value={item?.mfg}
                    onChange={(e) =>
                      handleInputChange(index, "mfg", e.target.value)
                    }
                  />
                ) : (
                  item?.mfg
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="date"
                    className="form-control"
                    value={item?.exp}
                    onChange={(e) =>
                      handleInputChange(index, "exp", e.target.value)
                    }
                  />
                ) : (
                  item?.exp
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={item?.supplier}
                    onChange={(e) =>
                      handleInputChange(index, "supplier", e.target.value)
                    }
                  />
                ) : (
                  item?.supplier
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="number"
                    className="form-control"
                    value={item?.UnitPrice}
                    onChange={(e) =>
                      handleInputChange(index, "UnitPrice", e.target.value)
                    }
                  />
                ) : (
                  item?.UnitPrice
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="number"
                    className="form-control"
                    value={item?.Quantity}
                    onChange={(e) =>
                      handleInputChange(index, "Quantity", e.target.value)
                    }
                  />
                ) : (
                  item?.Quantity
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="number"
                    className="form-control"
                    value={item?.TotalPrice}
                    onChange={(e) =>
                      handleInputChange(index, "TotalPrice", e.target.value)
                    }
                  />
                ) : (
                  item?.TotalPrice
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={item?.batch}
                    onChange={(e) =>
                      handleInputChange(index, "batch", e.target.value)
                    }
                  />
                ) : (
                  item?.batch
                )}</td>
                <td> {editingRow === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={item?.PO}
                    onChange={(e) =>
                      handleInputChange(index, "PO", e.target.value)
                    }
                  />
                ) : (
                  item?.PO
                )}</td>
                <td className='d-flex flex-row'>
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
                  <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addProduct}>Add Product</button></div>
      </div>
    </div>
  )
}

export default ViewLocation
