import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getWarehouse } from '../services/WarehouseService';
import { deleteLocation } from '../services/LocationService';
import { ToastContainer, toast } from "react-toastify";
import '../css/plpage.css';

const ViewWarehouse = () => {
    const { id } = useParams();
    const [total, setTotal] = useState(0);
    const location = useLocation();
    // const { warehouse } = location.state || {};
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocations();
    }, [])

    useEffect(() => {
        if (locations.length > 0) {
            const total = locations.reduce((acc, location) => acc + location.stock, 0);
            setTotal(total);
        }
    }, [locations])

    const getLocations = () => {
        getWarehouse(id).then((response) => {
            setLocations(response.data.locations);
        })
    }

    const handleClick = (locationId) => {
        navigate('/viewLocation', { state: { locationId } });
    }
    const addLocation = () => {
        navigate(`/addLocation`, { state: { id } });
    }

    const handleUpdate = (location) => {
        navigate(`/updateLocation/${encodeURIComponent(JSON.stringify(location))}`);
    }


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteLocation(id).then((response) => {
                getLocations();
                toast.success("Location deleted successfully!");
            })
        }
    };

    return (
        <div>
            <div className='offset-1'>
                <h2>Locations Lists</h2>
                <p>Warehouse Name: {" "}<span className='fw-bold'>warehouse1</span></p>
            </div>
            <ToastContainer />
            <div className='m-5' style={{ maxWidth: '170vh' }}>
                <table style={{ maxWidth: '170vh' }} className="table table-hover table-bordered ">
                    <thead>
                        <tr  >
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">#</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Row</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className='text-white' scope="col">Column</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Max Capacity</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Available</th>
                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Stock</th>

                            <th style={{ backgroundColor: "#3C3A7D" }} className=' text-white' scope="col">Action</th>
                            {/* <th style={{backgroundColor: "#3C3A7D"}} className=' text-white' scope="col">Stock</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {locations && locations.map((location, index) =>
                            <>
                                <tr key={index} >
                                    <td style={{ backgroundColor: "#3C3A7D", color: "white" }}>{location.id}</td>
                                    <td>{location?.row}</td>
                                    <td>{location?.col}</td>
                                    <td>{location?.maxCapacity}</td>
                                    <td>{location?.available}</td>
                                    <td>{location?.stock}</td>
                                    <td className='d-flex flex-row'> <button style={{ marginLeft: "10px", backgroundColor: "#b8f48d" }} onClick={() => handleClick(location.id)} className='btn shadow hover-over border-0 text-black '>Open</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(location)} className='btn bg-primary border-0 shadow hover-over text-white '>Edit</button>
                                        <button disabled={location?.stock >= 1} onClick={() => handleDelete(location.id)} style={{ marginLeft: "10px" }} className='btn shadow hover-over bg-danger border-0 text-white'>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
                <div className="d-flex flex-column text-end w-100"
                    style={{ width: "100%", marginTop: 0 }}
                >
                    <div className="mb-2" style={{ width: "100%" }}>
                        <button style={{ float: "right", maxWidth: "110px", marginLeft: "10px", width: "100%" }}  className="bg-secondary text-white mt-3"
                            onClick={addLocation}
                        >Add Location </button>
                        
                        {/* <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addLocation}>Add Location</button></div> */}
                    </div>
                    <p className="" style={{ backgroundColor: "#6AF86F", fontWeight: "bold" }}  >
                            Total: {total}
                        </p>
                </div>
            </div>
        </div>
    )
}

export default ViewWarehouse
