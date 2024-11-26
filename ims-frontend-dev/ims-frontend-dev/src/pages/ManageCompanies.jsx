import React from 'react'
import { useNavigate } from 'react-router-dom';

const ManageCompanies = () => {
    const navigate = useNavigate();
    const companies = [
        { id: 1, name: "name1", address: "bread", companyCode: 'company1', contact: "cupboar1", managerEmail: "manager1", managerPassword: "pass" },
        { id: 2, name: "name2", address: "bread2", companyCode: 'company2', contact: "cupboar2", managerEmail: "manager1", managerPassword: "pass" },
        { id: 3, name: "name3", address: "bread3", companyCode: 'company3', contact: "cupboar3", managerEmail: "manager1", managerPassword: "pass" },
    ];


    const handleClick = (company) => {
        // navigate(`/productInventory/${product}`);
        navigate('/company', { state: { company } });
    }
    const addcompany = () => {
        // navigate(`/productInventory/${product}`);
        navigate('/addCompany');
    }

    const handleUpdate =(updateProduct)=>{
        navigate(`/addCompany/${encodeURIComponent(JSON.stringify(updateProduct))}`, { state: { updateProduct } });
      }

    return (
        <div className = "container mt-2">
            <h2 className='container'>Company Lists</h2>
            <div className='m-5'>
                <table className="table table-hover table-bordered table-collapse">
                    <thead>
                        <tr key={"header"}>
                            {Object.keys(companies[0]).map((key) => (
                                <th>{key}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies?.map((item) => (
                            <tr key={item?.id}>
                                {/* {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))} */}
                                <td>{item?.id}</td>
                                <td  onClick={() => handleClick(item)}>{item?.name}</td>
                                <td>{item?.address}</td>
                                <td>{item?.companyCode}</td>
                                <td>{item?.contact}</td>
                                <td>{item?.managerEmail}</td>
                                <td>{item?.managerPassword}</td>
                                <td className='d-flex flex-row'>
                                    <button style={{ marginLeft: "10px" }} onClick={() => handleUpdate(item)} className='btn bg-secondary border-0 text-white '>Update</button>
                                    <button style={{ marginLeft: "10px" }} className='btn bg-danger border-0 text-white'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ float: "right" }}> <button className='bg-secondary text-white mt-3' onClick={addcompany}>Add company</button></div>
            </div>
        </div>
    )
}

export default ManageCompanies
