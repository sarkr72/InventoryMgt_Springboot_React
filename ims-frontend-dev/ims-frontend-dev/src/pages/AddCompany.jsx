import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddCompany = () => {
    const [data, setData] = useState({
        name: "",
        address: "",
        contact: "",
        supplier: "",
        companyCode: "",
        managerEmail: "",
        managerPassword: "",
        confirmPassword: "",
    });
    const { updateCompany } = useParams();
    const navigate = useNavigate();
    const [updateCompany2, setUpdateCompany] = useState(null);

    useEffect(() => {
        if (updateCompany) {
            try {
                const decoded = JSON.parse(decodeURIComponent(updateCompany));
                setUpdateCompany(decoded);
                getUpdate(decoded);
            } catch (error) {
                console.log(error);
            }
        }
    }, [updateCompany])


    const getUpdate = (company) => {
        if (company) {
            data.name = company?.name;
            data.address = company?.address;
            data.contact = company?.contact;
            data.supplier = company?.supplier;
            data.companyCode = company?.companyCode;
            data.managerEmail = company?.managerEmail;
            data.managerPassword = company?.managerPassword;
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
                    {updateCompany &&
                        <h5 className='text-white mb-5'> Update Company</h5>
                    }
                    {!updateCompany &&
                        <h5 className='text-white mb-5'> Add Company</h5>
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
                        <input
                            type="text"
                            className="form-control"
                            name="companyCode"
                            placeholder="Company Code"
                            value={data.companyCode}
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

                    <div style={{ marginTop: 10 }}>
                        <input
                            type="email"
                            className="form-control"
                            name="managerEmail"
                            placeholder="Manager Email"
                            value={data.managerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <input
                            type="password"
                            className="form-control"
                            name="managerPassword"
                            placeholder="Manager Password"
                            value={data.managerPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {!updateCompany &&
                        <>
                            <div style={{ marginTop: 10 }}>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && data?.confirmPassword && (
                                <div>
                                    <label className='mt-1 rounded-1 p-1 fw-bold text-danger bg-white'>{error}</label>
                                </div>
                            )}
                            <div style={{ marginTop: 10 }}>
                                <label className='text-white'>Supplier:</label>

                                <select style={{ marginLeft: 10 }} name="suppliers" id="suppliers">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>

                            </div>
                        </>
                    }
                    <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            {updateCompany != null ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCompany
