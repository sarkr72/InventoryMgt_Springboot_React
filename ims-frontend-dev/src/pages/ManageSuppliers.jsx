import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSupplier, listSupplier } from "../services/SupplierService";
import { listSuppliersById } from "../services/CompanyService";
import { ToastContainer, toast } from "react-toastify";

const ManageSuppliers = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    listSuppliersById(localStorage.getItem("companyId")).then((response) => {
      setSuppliers(response?.data);
    });
  };

  const addSupplier = () => {
    navigate("/addSupplier");
  };

  const handleUpdate = (updateSupplier) => {
    navigate(
      `/updateSupplier/${encodeURIComponent(JSON.stringify(updateSupplier))}`
    );
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteSupplier(item?.id).then((response) => {
        getSuppliers();
        toast.success("Supplier deleted successfully!");
      });
    }
  };

  return (
    <div className="container">
      <h2 className="container">Supplier Lists</h2>
      <ToastContainer />
      <div className="container mt-5">
        <table className="table table-hover table-bordered table-collapse">
          <thead>
            <tr key={"header"}>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Supplier Address</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.address}</td>
                <td>{item?.contact}</td>
                <td className="d-flex flex-row">
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleUpdate(item)}
                    className="btn bg-primary border-0 text-white "
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn bg-danger border-0 text-white"
                    onClick={() => handleDelete(item)}
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
            onClick={addSupplier}
          >
            Add supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSuppliers;
