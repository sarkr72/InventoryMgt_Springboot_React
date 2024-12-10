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
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { listEmployees } from "../services/EmployeeService";
import { updateEmployee } from "../services/EmployeeService";
import { getCompany } from "../services/CompanyService";
import { AppContext } from "../components/AppProvider";
import { deleteEmployee } from "../services/EmployeeService";
import { getEmployee } from "../services/EmployeeService";


function EmployeeInfo(props) {
    const reload = () => {
        props.onHide;
        window.location.reload();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1>About {props.firstname}</h1>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h5>ID: {props.id}</h5>
                <h5>First Name: {props.firstname}</h5>
                <h5>Last Name: {props.lastname}</h5>
                <h5>Email Address: {props.email}</h5>
                <h5>Phone Number: {props.phone}</h5>
                <h5>Role: {props.role}</h5>
                <h5>Company: {props.company}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={reload}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ManageAccount = () => {
    const { role } = React.useContext(AppContext);
    const [Employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

useEffect(() => {
    if (role === 'ROLE_MANAGER') {
        getCompany(localStorage.getItem("companyId")).then((response) => {
            const data = response.data;
            setEmployee(data?.employees);
            setLoading(false);
        }).catch((err) => {
            setError("Failed to fetch employee", err);
            setLoading(false);
        });
    }else if(role === "ROLE_ADMIN"){
        listEmployees().then((response) =>{
            const allEmployees = response.data.filter(employee => employee?.roles?.some(role => role.name === "ROLE_MANAGER"))
            setEmployee(allEmployees);
            setLoading(false);
        })
    }})


    const revokeEmployee = (employee) => {
        if (window.confirm("Are you sure you want to revoke access for this employee")) {
            console.log(employee.id);
            deleteEmployee(employee.id).then((response) => {
                toast.success("Employee revoked");
                getEmployees();
            }).catch((err)=>{
                toast.error("Failed to revoke access for employee");
            })
        }
        
    }

    const promoteToAdmin = (employee) => {
        //Can only update Employees
        if (employee.roles[0].name === 'ROLE_EMPLOYEE') {
            const newEmployee = {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                password: employee.password,
                phone: employee.phone,
                roles: [
                    {
                        id: employee.roles[0].id,
                        name: 'ROLE_MANAGER'
                    }
                ],
                companyId: {
                    id: localStorage.getItem("companyId")
                }
            }
            // console.log(newEmployee)
            console.log(employee.id)
            updateEmployee(employee.id, newEmployee).then((response) => {
                toast.success("Employee promoted");
                console.log(newEmployee)
                getEmployees();
            })
        }
        else{
            toast.error("Cannot promote Managers")
        }
    }
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
                <ToastContainer />
                <Row>
                    <h2 as={Col} style={{ marginBottom: 50 }}>Current Employees</h2>
                    <div as={Col} className="container d-flex mb-5" style={{ maxWidth: '600px' }}>
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init >search</button>
                    </div>
                </Row>


                <div className="container">
                    <div className="d-flex flex-wrap justify-content-around mb-3">
                        {filteredEmployees?.map((employee) => (
                            <Card key={employee.id} style={{ width: "15rem", height: "25rem", marginBottom: "2rem" }}>
                                <Card.Img variant="top" src="/assets/images/userIcon.jpg" />
                                <Card.Body>
                                    <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                                    <Card.Text>
                                        <p>Role: {employee.roles[0].name}</p>
                                    </Card.Text>
                                    <DropdownButton id="dropdown-basic-button" title="Action">
                                        <Dropdown.Item onClick={() => setShowModal(true)}>View Details</Dropdown.Item>
                                        {/* {console.log(employee)} */}
                                        <EmployeeInfo
                                            firstname={employee.firstName}
                                            lastname={employee.lastName}
                                            id={employee.id}
                                            email={employee.email}
                                            phone={employee.phone}
                                            role={employee.roles[0].name}
                                            company={localStorage.getItem("companyName")}
                                            show={showModal}
                                            onHide={() => setShowModal(false)}
                                        />
                                        <Dropdown.Item onClick={() => promoteToAdmin(employee)}>Promote Status</Dropdown.Item>
                                        <Dropdown.Item onClick={() => revokeEmployee(employee)}>Revoke Access</Dropdown.Item>
                                    </DropdownButton>
                                </Card.Body>
                            </Card>

                        ))}

                        <Card style={{ width: '15rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/assets/images/userIcon.jpg" width="180" height="250" />
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '15rem', height: '25rem' }}>
                            <Card.Img variant="top" src="/assets/images/userIcon.jpg" width="180" height="250" />
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
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