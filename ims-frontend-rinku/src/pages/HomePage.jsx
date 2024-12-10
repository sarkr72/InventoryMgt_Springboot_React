import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import '../css/homepage.css'
import { AppContext } from '../components/AppProvider';

function NavScrollExample() {
  const [showFilters, setShowFilters] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { role } = React.useContext(AppContext);

  const onChange = (e) => {
    setShowFilters(true);
    setInput(e.target.value);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)' }}>
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
        {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
          <>
          <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/addUser.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Register User</h5>
                <button onClick={() =>  navigate('/admin/registerUser')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Register User</button>
              </div>
            </div>
          
            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/manageAccount.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Accounts</h5>
                <button onClick={() =>  navigate('/admin/manageAccounts')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Accounts</button>
              </div>
            </div>

          </>
        )}

        {(role === "ROLE_ADMIN") && (
          <>
          <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/companies.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Companies</h5>
                <button onClick={() =>  navigate('/manageCompanies')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Companies</button>
              </div>
            </div>

          </>
        )}

        {(role === "ROLE_MANAGER" || role === "ROLE_EMPLOYEE") && (
          <>
       
           <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/viewWarehouse.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Warehouses</h5>
                <button onClick={() => navigate('/manageWarehouses')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}> warehouses</button>
              </div>
            </div>

          

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/addProduct.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Products</h5>
                <button onClick={() =>  navigate('/products')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Products</button>
              </div>
            </div>

            <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/viewWarehouse.jpg" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}>Suppliers</h5>
                <button onClick={() => navigate('/manageSuppliers')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>suppliers</button>
              </div>
            </div>

          <div className="card bg-dark text-white shadow-lg border-5" style={{ width: "18rem", height: "22rem", marginBottom: "2rem", borderRadius: "10px" }}>
              <img className="card-img-top rounded-top" style={{ height: "60%",  borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} src="/assets/images/purchaseOrder.png" alt="Add Product" />
              <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ padding: "1.5rem" }}>
                 <h5 className="card-title text-center mb-3" style={{ fontWeight: "bold"}}> Purchase Orders</h5>
                <button onClick={() => navigate('/admin/purchaseOrder')} type="button" className="btn btn-primary w-100" style={{ borderRadius: "25px", padding: "0.6rem 1rem", fontSize: "0.9rem", fontWeight: "500", textTransform: "uppercase" }}>Purchase Orders</button>
              </div>
            </div>
          </>
        )}



      </div>
    </div>

  );
}

export default NavScrollExample;