import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewWarehouse = () => {
    // const { product } = useParams();
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const { warehouse } = location.state || {};
    const navigate = useNavigate();

    const locations = [
        { id: 1, Row: 4, Column: 2, Warehouse: "wh1", MaxCapacity: 500, products: [{ product1: { name: 'name1' } }, { product2: { name: 'name2' } }], available: 851 },
        { id: 2, Row: 5, Column: 6, Warehouse: "wh2", MaxCapacity: 500, products: [{ product1: { name: 'name2' } }, { product2: { name: 'name4' } }], available: 654 },
        { id: 3, Row: 3, Column: 31, Warehouse: "wh3", MaxCapacity: 500, products: [{ product1: { name: 'name3' } }, { product2: { name: 'name6' } }], available: 841563 },
    ];

    const getTotal = () => {
        setTotal(locations.reduce((acc, product) => acc + product.Quantity, 0));
    }

    useEffect(() => {
        getTotal();
    }, []) 

    const handleClick = (location) => {
        navigate('/viewLocation', { state: { location } });
    }
    const addLocation = () => {
        navigate('/addLocation');
    }
    
    const handleUpdate =(location)=>{
        navigate(`/updateLocation/${encodeURIComponent(JSON.stringify(location))}`);
      }

    return (
        <div>
            <div className='offset-1'>
                <h2>Locations Lists</h2>
                <p>Warehouse Name: {" "}<span className='fw-bold'>warehouse1</span></p>
            </div>
            <div className='m-5'>
                <table style={{ maxWidth: '170vh' }} className="table table-hover table-bordered ">
                    <thead>
                        <tr  >
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">#</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Row</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className='text-white' scope="col">Column</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Warehouse</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Available</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Action</th>
                            {/* <th style={{backgroundColor: "#3C3A7D"}} className=' text-white' scope="col">Stock</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {locations && locations.map((location, index) =>
                            <>
                                <tr key={index} >
                                    <td style={{ backgroundColor: "#3C3A7D", color: "white" }}>{location.id}</td>
                                    <td>{location?.Row}</td>
                                    <td>{location?.Column}</td>
                                    <td>{location.Warehouse}</td>
                                    <td>{location?.available}</td>
                                    <td className='d-flex flex-row'> <button style={{ marginLeft: "10px" }} onClick={() => handleClick(location)} className='btn bg-secondary border-0 text-white '>Open</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(location)} className='btn bg-secondary border-0 text-white '>Update</button>
                                        <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
                <div style={{ maxWidth: '180vh' }} className='d-flex flex-row p-1'>
                    <div style={{ width: "90%", backgroundColor: '#6AF86F', color: '#6AF86F' }}>.</div>
                    <div style={{ float: "right", backgroundColor: '#6AF86F', fontWeight: "bold" }}>Total: {total}</div>
                </div>
                <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addLocation}>Add Location</button></div>
            </div>
        </div>
    )
}

export default ViewWarehouse
