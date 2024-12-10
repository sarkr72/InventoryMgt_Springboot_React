import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWarehouse, listWarehousesByCompanyId } from "../services/WarehouseService";
import { ToastContainer, toast } from "react-toastify";
import "../css/plpage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ManageWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = () => {
    listWarehousesByCompanyId(localStorage.getItem("companyId")).then(
      (response) => {
        setWarehouses(response?.data);
      }
    );
  };
  const handleClick = (warehouse) => {
    // navigate("/viewWarehouse", { state: { warehouse } });
    navigate(`/viewWarehouse/${warehouse.id}`);
  };
  const addWarehouse = () => {
    navigate("/addWarehouse");
  };

  const handleUpdate = (warehouse) => {
    navigate(
      `/updateWarehouse/${encodeURIComponent(JSON.stringify(warehouse))}`
    );
  };

  //filter warehouses by name or other criterias
  const filteredWarehouse = warehouses.filter((warehouse) =>
    `${warehouse.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteWarehouse(id).then((response) => {
        getWarehouses();
        toast.success("Supplier deleted successfully!");
      })
    }
  };

  return (
    <div className="container">
      <h2 className="container mb-3">Warehouse Lists</h2>
      <div className="m-5">
        <ToastContainer />
        <Row>
          
          <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
          </div>
        </Row>
        <table className="table table-hover table-bordered">
          <thead>
            <tr key={"header"}>
              <th>#</th>
              <th>Warehouse Name</th>
              <th>Warehouse Address</th>
              <th>Max Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouse?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td
                  onClick={() => handleClick(item)}
                  style={{
                    backgroundColor: "#d0f1b9",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {item?.name}
                </td>
                <td>{item?.address}</td>
                <td>{item?.maxCapacity}</td>
                <td className="d-flex flex-row">
                  <button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#b8f48d",
                      color: "black",
                      fontWeight: 600,
                    }}
                    onClick={() => handleClick(item)}
                    className="btn border-0 hover-over shadow"
                  >
                    Open
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleUpdate(item)}
                    className="btn bg-primary hover-over shadow border-0 text-white "
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn bg-danger hover-over shadow border-0 text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ float: "right" }}>
          {" "}
          <button
            className="bg-secondary text-white mt-3"
            onClick={addWarehouse}
          >
            Add Warehouse
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWarehouses;
