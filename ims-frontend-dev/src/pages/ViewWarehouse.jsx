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
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(warehouse){
            setLocations(warehouse?.locations);
        }
    }, [warehouse])  
 
    useEffect(()=>{
        if(locations.length > 0){
            const total =  locations.reduce((acc, location) => acc + location.stock, 0);
            setTotal(total);
        }
    }, [locations])

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
                                    <td className='d-flex flex-row'> <button style={{ marginLeft: "10px" }} onClick={() => handleClick(location)} className='btn bg-secondary border-0 text-white '>Open</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(location)} className='btn bg-primary border-0 text-white '>Edit</button>
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
