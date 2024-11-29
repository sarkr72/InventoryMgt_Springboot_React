import React from "react";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { Image } from "react-bootstrap/esm";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom/dist";
// import logo from '../assets/images/logo.png'
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const dispatch = useDispatch();

  const logoutHandler = () => {
    // dispatch(logout());
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="w-100"
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate("/homepage")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/images/logo2.png"
              alt=" "
              style={{ width: "30px", height: "30px" }}
            />{" "}
            IMS
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <SearchBox /> */}
            <Nav className="ml-auto">
              <LinkContainer to="/homepage">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {/* {userInfo ? ( */}
              <NavDropdown title="Name" id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              {/* ) : ( */}
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
              {/* )} */}

              {/* {userInfo && userInfo.isAdmin && ( */}
              <NavDropdown title="Admin" id="adminmenue">
                <LinkContainer to="/admin/registerUser">
                  <NavDropdown.Item>Register User</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/manageAccounts">
                  <NavDropdown.Item>Accounts</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/manageWarehouses">
                  <NavDropdown.Item>Warehouses</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/manageCompanies">
                  <NavDropdown.Item>Companies</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/manageSuppliers">
                  <NavDropdown.Item>Suppliers</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/purchaseOrder">
                  <NavDropdown.Item>Purchase Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
