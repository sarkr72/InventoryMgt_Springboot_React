import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddSupplier = () => {
    const [data, setData] = useState({
        name: "",
        address: "",
        contact: "",
    });
    const { updateSupplier } = useParams();
    const navigate = useNavigate();
    const [updateCompany2, setUpdateSupplier] = useState(null);

    useEffect(() => {
        if (updateSupplier) {
            try {
                const decoded = JSON.parse(decodeURIComponent(updateSupplier));
                setUpdateSupplier(decoded);
                getUpdate(decoded);
            } catch (error) {
                console.log(error);
            }
        }
    }, [updateSupplier])


    const getUpdate = (company) => {
        if (company) {
            data.name = company?.name;
            data.address = company?.address;
            data.contact = company?.contact;
        }
    }

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "confirmPassword") {
            if (value !== data?.managerPassword) {
                setError("Passwords do not match!");
            } else {
                setError("");
            }
        }
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error) {

        }
    }

    return (
        <div>
            <div className="shadow-lg mb-5 mt-5 d-flex flex-column justify-content-center col-lg-3 col-md-5 m-auto bg-dark p-4 border rounded-3">
                <div className='m-auto'>
                    {updateSupplier &&
                        <h5 className='text-white mb-5'> Update Supplier</h5>
                    }
                    {!updateSupplier &&
                        <h5 className='text-white mb-5'> Add Supplier</h5>
                    }
                </div>
                <form onSubmit={handleSubmit} >
                    <div >
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Company Name"
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <textarea
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Address"
                            value={data.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <textarea
                            type="text"
                            className="form-control"
                            name="contact"
                            placeholder="Contact"
                            value={data.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            {updateSupplier != null ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSupplier
