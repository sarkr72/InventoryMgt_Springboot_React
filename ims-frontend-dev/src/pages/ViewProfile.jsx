import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './ViewProfile.css';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Figure from 'react-bootstrap/Figure';
import {useState, useEffect} from "react";

function ChangePassword(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter current password" />
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ViewProfile = () => {
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompanyName] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    // useEffect(() =>{
            
    // });

    return (
        <div id="container" className="container-fluid d-flex flext-column justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${"assets/images/registrationImage.jpeg"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <h3 className="titlePage">Your Profile</h3>

            <div className="BasicInfo" >
                <h4>Basic Info</h4>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enoch" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Last Name </Form.Label>
                            <Form.Control type="text" placeholder="Awofeso" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Amazon Warehouse" disabled="true" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Position </Form.Label>
                            <Form.Control type="text" placeholder="Specialist" disabled="true" />
                        </Form.Group>
                    </Row>
                </Form>
            </div>

            <div className="AddInfo">
                <div className="Contact">
                    <h4>Contact</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="6468134462" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="ea@gmail.com" />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control placeholder="Employee/Manager" disabled="true" />
                    </Form.Group>
                </div>

                <div className="Address">
                    <h4>Address</h4>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Row>
                </div>
            </div>


            <Button className="submitButton" variant="primary" type="submit">Edit Profile</Button>
            <Button variant="danger" onClick={() => setModalShow(true)}>
                Change Password
            </Button>

            <ChangePassword
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )

};

export default ViewProfile;

































