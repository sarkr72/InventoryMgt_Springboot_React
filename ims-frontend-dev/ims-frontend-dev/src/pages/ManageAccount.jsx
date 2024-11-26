import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState} from "react";
import {useEffect} from "react";

import { listEmployees } from "../services/EmployeeService";

const ManageAccount = () => {
    const [Employee, setEmployee] = useState([{
        id: null, 
        firstName: "",
        lastName:"",
        email:"",
        password:"",
        phone:"",
        role:"",
        company:""
    }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
   
    useEffect(() => {
        listEmployees().then((response) => {
            const data = response.data;
            setEmployee(data);
            setLoading(false);
        }).catch((err) => {
            setError("Failed to fetch employee", err);
            setLoading(false);
        });
    }, []);

    /**
     * Searches for specific employee
     */
    const filteredEmployees = Employee.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div> <h1>Loading...</h1></div>
    if (error) return <div>{error}</div>

    return (
        <div className="container" style={{ backgroundImage: `url(${"assets/images/registrationImage.jpeg"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Row>
                <h2 as={Col} style={{ marginBottom: 50 }}>Current Employees</h2>
                <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
                </div>
            </Row>

            <div className="container">
                <div className="d-flex flex-wrap justify-content-around mb-3">
                    {filteredEmployees.map((employee) => (
                        <Card key={employee.id} style={{ width: "15rem", height: "30rem", marginBottom:"2rem" }}>
                            <Card.Img variant="top" src="/assets/images/userIcon.jpg" />
                            <Card.Body>
                                <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                                <Card.Text>
                                    <p>Email: {employee.email}</p>
                                    <p>Phone: {employee.phone}</p>
                                    <p>Position: {employee.role}</p>
                                </Card.Text>
                                <DropdownButton id="dropdown-basic-button" title="Action">
                                    <Dropdown.Item href="#/action-1">View Details</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Promote Status</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Revoke Access</Dropdown.Item>
                                </DropdownButton>
                            </Card.Body>
                        </Card>

                    ))}

                    <Card style={{ width: '15rem', height: '30rem' }}>
                        <Card.Img variant="top" src="/assets/images/userIcon.jpg" width="180" height="250" />
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button variant="primary" xs={6} />
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '15rem', height: '30rem' }}>
                        <Card.Img variant="top" src="/assets/images/userIcon.jpg" width="180" height="250" />
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button variant="primary" xs={6} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )

};

export default ManageAccount;

































