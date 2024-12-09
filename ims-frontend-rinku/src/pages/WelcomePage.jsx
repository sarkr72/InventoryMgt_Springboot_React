
import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import '../css/WelcomePage.css';
import { isUserLoggedIn } from '../services/AuthService';

const WelcomePage = () => {
    return (
        <div>
            <Container fluid className="hero-section text-center text-white">
                <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Col md={8} style={{marginTop: "10px", marginBottom: "10px"}} className='bg-dark p-5 border border-light rounded-4 shadow-lg text-center'>
                        <img
                            src="assets/images/logo.png" 
                            alt="Inventory Management System Logo"
                            className="mb-4 rounded-3"
                            style={{ maxWidth: '200px', height: 'auto' }}
                        />
                        <h1 className="display-4 text-white">Welcome to our Inventory Management System</h1>
                        <p className="lead text-white">
                            Streamline your inventory processes and make informed decisions with our powerful tools.
                        </p>
                        <Button variant="primary" size="lg" href={`${isUserLoggedIn() ? "/homepage" : "/login"}`}>
                        {isUserLoggedIn() ? "Go to Homepage" : "Log In"}
                    </Button>
                </Col>
            </Row>
        </Container>
        </div >
    );
};

export default WelcomePage;