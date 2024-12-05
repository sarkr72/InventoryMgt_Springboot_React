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

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
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
          <Route path="/admin/registerUser" element={<AuthenticatedRoute><UserRegistration /></AuthenticatedRoute>}></Route>
          <Route path="/homepage" element={<AuthenticatedRoute><HomePage /></AuthenticatedRoute>}></Route>
          <Route path="/admin/addProduct" element={<AuthenticatedRoute><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/admin/addProduct/:updateProduct" element={<AuthenticatedRoute><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/admin/manageAccounts" element={<AuthenticatedRoute><ManageAccount /></AuthenticatedRoute>}></Route>
          <Route path="/profile" element={<AuthenticatedRoute><ViewProfile /></AuthenticatedRoute>}></Route>
          <Route path="/productInventory" element={<AuthenticatedRoute><ProductInventory /></AuthenticatedRoute>}></Route>
          <Route path="/manageWarehouses"element={<AuthenticatedRoute><ManageWarehouses /></AuthenticatedRoute>}></Route>
          <Route path="/viewWarehouse/:id" element={<AuthenticatedRoute><ViewWarehouse /></AuthenticatedRoute>}></Route>
          <Route  path="/updateWarehouse/:warehouse"element={<AuthenticatedRoute><AddWarehouse /></AuthenticatedRoute>}></Route>
          <Route path="/viewLocation" element={<AuthenticatedRoute><ViewLocation /></AuthenticatedRoute>}></Route>
          <Route path="/addWarehouse" element={<AuthenticatedRoute><AddWarehouse /></AuthenticatedRoute>}></Route>
          <Route path="/addLocation" element={<AuthenticatedRoute><AddLocation /></AuthenticatedRoute>}></Route>
          <Route path="/updateLocation/:location"element={<AuthenticatedRoute><AddLocation /></AuthenticatedRoute>} ></Route>
          <Route path="/addCompany" element={<AuthenticatedRoute><AddCompany /></AuthenticatedRoute>}></Route>
          <Route path="/addCompany/:updateCompany" element={<AuthenticatedRoute><AddCompany /></AuthenticatedRoute>}></Route>
          <Route path="/manageCompanies" element={<AuthenticatedRoute><ManageCompanies /></AuthenticatedRoute>}></Route>
          <Route path="/manageSuppliers" element={<AuthenticatedRoute><ManageSuppliers /></AuthenticatedRoute>}></Route>
          <Route path="/addSupplier" element={<AuthenticatedRoute><AddSupplier /></AuthenticatedRoute>}></Route>
          <Route path="/updateSupplier/:updateSupplier" element={<AuthenticatedRoute><AddSupplier /></AuthenticatedRoute>}></Route>
          <Route path="/addStock/:location" element={<AuthenticatedRoute><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/updateProductAtCurrentLocation/:updateProductAtCurrentLocation" element={<AuthenticatedRoute><AddProduct /></AuthenticatedRoute>}></Route>
          <Route path="/admin/purchaseOrder" element={<AuthenticatedRoute><ViewPurchaseOrder /></AuthenticatedRoute>}></Route>
          <Route path="/admin/createPurchaseOrder" element={<AuthenticatedRoute><CreatePurchaseOrder /></AuthenticatedRoute>} ></Route>
          <Route path="/products" element={<AuthenticatedRoute><Products /></AuthenticatedRoute>} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
