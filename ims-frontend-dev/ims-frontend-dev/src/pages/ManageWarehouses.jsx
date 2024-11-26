import React from 'react'
import { useNavigate } from 'react-router-dom';

const ManageWarehouses = () => {
  const navigate = useNavigate();
  const warehouses = [
    { id: 1, name: "wh1", address: "bread", company: 'company1', maxCapacity: 78758 },
    { id: 2, name: "wh2", address: "bread2", company: 'company2', maxCapacity: 34527 },
    { id: 3, name: "wh3", address: "bread3", company: 'company3', maxCapacity: 452 },
  ];


  const handleClick = (warehouse) => {
    navigate('/viewWarehouse', { state: { warehouse } });
  }
  const addWarehouse = () => {
    navigate('/addWarehouse');
  }

  const handleUpdate =(warehouse)=>{
    navigate(`/updateWarehouse/${encodeURIComponent(JSON.stringify(warehouse))}`);
  }



  return (
    <div className='container'>
      <h2 className="container mb-3">Warehouse Lists</h2>
      <div className='m-5'>
        <table className="table table-hover table-bordered">
          <thead>
            <tr key={"header"}>
              {Object.keys(warehouses[0]).map((key) => (
                <th>{key}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {warehouses?.map((item) => (
              <tr key={item?.id} >
                <td>{item?.id}</td>
                <td style={{backgroundColor: "#d0f1b9", fontWeight: 600}}>{item?.name}</td>
                <td>{item?.address}</td>
                <td>{item?.company}</td>
                <td>{item?.maxCapacity}</td>
                <td className='d-flex flex-row'>
                <button style={{ marginLeft: "10px" }} onClick={() => handleClick(item)} className='btn bg-secondary border-0 text-white '>Open</button>
                  <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(item)} className='btn bg-secondary border-0 text-white '>Update</button>
                  <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addWarehouse}>Add Warehouse</button></div>
      </div>
    </div>
  )
}

export default ManageWarehouses
