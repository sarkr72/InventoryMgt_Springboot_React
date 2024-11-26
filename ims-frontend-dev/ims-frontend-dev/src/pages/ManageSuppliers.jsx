import React from 'react'
import { useNavigate } from 'react-router-dom';

const ManageSuppliers = () => {
    const navigate = useNavigate();
    const suppliers = [
        { id: 1, name: "name1", address: "bread", contact: "contact1" },
        { id: 2, name: "name2", address: "bread2", contact: "contact2" },
        { id: 3, name: "name3", address: "bread3", contact: "contact3" },
    ];


    const addSupplier = () => {
        // navigate(`/productInventory/${product}`);
        navigate('/addSupplier');
    }

    const handleUpdate =(updateSupplier)=>{
        navigate(`/updateSupplier/${encodeURIComponent(JSON.stringify(updateSupplier))}`);
      }

    return (
        <div className="container" >
            <h2 className="container">Supplier Lists</h2>
            <div className="container mt-5">
                
                <table className="table table-hover table-bordered table-collapse">
                    <thead>
                        <tr key={"header"}>
                            {Object.keys(suppliers[0]).map((key) => (
                                <th>{key}</th>
                            ))}
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
                                <td className='d-flex flex-row'>
                                    <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(item)} className='btn bg-secondary border-0 text-white '>Update</button>
                                    <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addSupplier}>Add supplier</button></div>
            </div>
        </div>
    )
}

export default ManageSuppliers
