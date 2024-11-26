import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddWarehouse = () => {
    const { warehouse } = useParams();
    const navigate = useNavigate();
    const [warehouse2, setWarehouse] = useState(null);

    useEffect(() => {
        if (warehouse) {
            try {
                const decoded = JSON.parse(decodeURIComponent(warehouse));
                setWarehouse(decoded);
                getUpdate(decoded);
            } catch (error) {
                console.log(error);
            }
        }
    }, [warehouse])


    const getUpdate = (warehouse) => {
        if (warehouse) {
            data.name = warehouse?.name;
            data.address = warehouse?.address;
            data.company = warehouse?.company;
            data.maxCapacity = warehouse?.maxCapacity;
        }
    }

    const [data, setData] = useState({
        name: "",
        address: "",
        company: "",
        maxCapacity: 0,
    });
    const [error, setError] = useState("");

    const handleSubmit = () => {

    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    return (
        <div>
            <div className="d-flex">
                {warehouse &&
                    <h4 className=" m-auto mt-3" >Update Warehouse</h4>
                }
                {!warehouse &&
                    <h4 className=" m-auto mt-3" >Add Warehouse</h4>
                }

            </div>
            <div
                style={{ minHeight: "45vh", maxWidth: "600px" }}
                className="mw-60 container bg-dark rounded-3 shadow-lg mt-5 mt-md-20 d-flex flex-column justify-content-center align-items-center"
            >

                <div className="col-md-6 col-lg-5 right-box">
                    <form onSubmit={handleSubmit} className="input-group">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter warehouse name"
                                value={data?.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group" style={{ marginTop: 10 }}>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="Enter warehouse address"
                                value={data?.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group" style={{ marginTop: 10 }}>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                placeholder="Enter company name"
                                value={data?.company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group" style={{ marginTop: 10 }}>
                            <input
                                type="number"
                                className="form-control"
                                name="maxCapacity"
                                placeholder="Enter capacity"
                                value={data?.maxCapacity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginTop: 10 }} className="input-group d-flex flex-column align-items-center">
                            <button type="submit" className="btn btn-primary w-100 mb-2">
                                {warehouse != null ? "Update Warehouse" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddWarehouse
