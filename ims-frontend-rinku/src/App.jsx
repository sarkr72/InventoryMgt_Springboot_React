import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import UserRegistration from "./pages/UserRegistration";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import ManageAccount from "./pages/ManageAccount";
import ViewProfile from "./pages/ViewProfile";
import ProductInventory from "./pages/ProductInventory";
import ManageWarehouses from "./pages/ManageWarehouses";
import ViewLocation from "./pages/ViewLocation";
import AddWarehouse from "./pages/AddWarehouse";
import ViewWarehouse from "./pages/ViewWarehouse";
import AddLocation from "./pages/AddLocation";
import AddCompany from "./pages/AddCompany";
import ManageCompanies from "./pages/ManageCompanies";
import ManageSuppliers from "./pages/ManageSuppliers";
import AddSupplier from "./pages/AddSupplier";
import ViewPurchaseOrder from "./pages/ViewPurchaseOrder";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import Products from "./pages/Products";
import { isUserLoggedIn } from "./services/AuthService";
import { getRoles } from "./services/EmployeeService";
import { useEffect, useState } from "react";

function App() {

  const AuthenticatedRoute = ({ children, allowedRoles }) => {
    const isAuth = isUserLoggedIn();
    const roles = localStorage.getItem("role");
    console.log(roles)
    const hasRequiredRole = allowedRoles ? allowedRoles.includes(roles) : true;
    console.log(hasRequiredRole)
    if (isAuth && hasRequiredRole) {
      return children;
    }
    return <Navigate to="/" />;
  };

// const InactivityWrapper = () => {
//     useInacti(); 
//     return null;
//   };

  return (
    <>
      <BrowserRouter>
      {/* <InactivityWrapper /> */}
        <Header />
        <Routes>
          <Route path="/" element={<LogIn />}></Route>

          <Route path="/admin/registerUser" element={<AuthenticatedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}><UserRegistration /></AuthenticatedRoute>}></Route>

          <Route path="/homepage" element={<AuthenticatedRoute> <HomePage /></AuthenticatedRoute>}></Route>
          {/* Product */}
          <Route path="/admin/addProduct" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/admin/addProduct/:updateProduct" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/productInventory" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ProductInventory /></AuthenticatedRoute>}></Route>
          <Route path="/addStock/:location" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/updateProductAtCurrentLocation/:updateProductAtCurrentLocation" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/products" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><Products /></AuthenticatedRoute>} ></Route>

          <Route path="/admin/manageAccounts" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><ManageAccount /></AuthenticatedRoute>}></Route>

          <Route path="/profile" element={<AuthenticatedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ViewProfile /></AuthenticatedRoute>}></Route>
          {/* warehouse */}
          <Route path="/addWarehouse" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddWarehouse /></AuthenticatedRoute>}></Route>
          <Route path="/manageWarehouses"element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ManageWarehouses /></AuthenticatedRoute>}></Route>
          <Route path="/viewWarehouse/:id" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ViewWarehouse /></AuthenticatedRoute>}></Route>
          <Route  path="/updateWarehouse/:warehouse"element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER']}><AddWarehouse /></AuthenticatedRoute>}></Route>
          {/* location */}
          <Route path="/viewLocation" element={<AuthenticatedRoute allowedRoles={['ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ViewLocation /></AuthenticatedRoute>}></Route>
          <Route path="/addLocation" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddLocation /></AuthenticatedRoute>}></Route>
          <Route path="/updateLocation/:location"element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddLocation /></AuthenticatedRoute>} ></Route>
          {/* company */}
          <Route path="/addCompany" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_ADMIN']}><AddCompany /></AuthenticatedRoute>}></Route>
          <Route path="/addCompany/:updateCompany" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_ADMIN']}><AddCompany /></AuthenticatedRoute>}></Route>
          <Route path="/manageCompanies" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_ADMIN']}><ManageCompanies /></AuthenticatedRoute>}></Route>
          {/* supplier */}
          <Route path="/manageSuppliers" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><ManageSuppliers /></AuthenticatedRoute>}></Route>
          <Route path="/addSupplier" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddSupplier /></AuthenticatedRoute>}></Route>
          <Route path="/updateSupplier/:updateSupplier" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><AddSupplier /></AuthenticatedRoute>}></Route>
          {/* purchase order */}
          <Route path="/admin/purchaseOrder" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER', 'ROLE_EMPLOYEE']}><ViewPurchaseOrder /></AuthenticatedRoute>}></Route>
          <Route path="/admin/createPurchaseOrder" element={<AuthenticatedRoute allowedRoles={[ 'ROLE_MANAGER']}><CreatePurchaseOrder /></AuthenticatedRoute>} ></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
