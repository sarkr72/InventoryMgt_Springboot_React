import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWarehouse, listWarehousesByCompanyId } from "../services/WarehouseService";

const ManageWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);

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
    navigate("/viewWarehouse", { state: { warehouse } });
  };
  const addWarehouse = () => {
    navigate("/addWarehouse");
  };

  const handleUpdate = (warehouse) => {
    navigate(
      `/updateWarehouse/${encodeURIComponent(JSON.stringify(warehouse))}`
    );
  };

  const handleDelete = (id) => {
    deleteWarehouse(id).then((response)=>{
      getWarehouses();
    })
  };

  return (
    <div className="container">
      <h2 className="container mb-3">Warehouse Lists</h2>
      <div className="m-5">
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
            {warehouses?.map((item) => (
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
                      backgroundColor: "#d0f1b9",
                      color: "black",
                      fontWeight: 600,
                    }}
                    onClick={() => handleClick(item)}
                    className="btn border-0 "
                  >
                    Open
                  </button>
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
