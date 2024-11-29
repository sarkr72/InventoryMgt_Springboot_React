
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'

function NavScrollExample() {
  const [showFilters, setShowFilters] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const initState = [
    { id: 1, warehouse: "wh3", name: "name1", category: "cat1", mfg: "2024-11-19", exp: "2024-11-19", supplier: "cupboar1", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "2023-0321", Invenytory: 851 },
    { id: 2, name: "name2", mfg: "brea1", exp: 55, supplier: "cupboar2", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 8451 },
    { id: 2, name: "name3", mfg: "bread2", exp: 10, supplier: "cupboard3", Quantity: 500, TotalPrice: 500.55, Location: "row1 col2", batch: "batch", PO: "po", Invenytory: 1465 },
  ];

  const onChange = (e) => {
    setShowFilters(true);
    setInput(e.target.value);
  }

  const handleClick = (product) => {
    // navigate(`/productInventory/${product}`);
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

      <div className="container d-flex flex-wrap justify-content-around mt-5 mb-5">
        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/manageAccount.png" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/admin/manageAccounts')} type="button" className="btn btn-primary">Manage Account</button>
          </div>
        </div>

        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/addProduct.png" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/admin/addProduct')} type="button" className="btn btn-primary">Add Product</button>
          </div>
        </div>

        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/addUser.jpg" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/admin/registerUser')} type="button" className="btn btn-primary">Register User</button>
          </div>
        </div>

        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/viewWarehouse.jpg" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/manageWarehouses')} type="button" className="btn btn-primary">View Warehouse</button>
          </div>
        </div>

        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/purchaseOrder.png" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/admin/purchaseOrder')} type="button" className="btn btn-primary">Create Purchase Order</button>
          </div>
        </div>

        <div className="card" style={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}>
          <img className="card-img-top" src="/assets/images/purchaseOrder.png" alt="Card image cap" />
          <div className="card-body">
            <button onClick={() => navigate('/products')} type="button" className="btn btn-primary">Products</button>
          </div>
        </div>

      </div>
    </div>

  );
}

export default NavScrollExample;