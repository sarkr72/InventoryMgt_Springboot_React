import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/admin/registerUser" element={<UserRegistration />}></Route>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/admin/addProduct" element={<AddProduct />}></Route>
          <Route path="/admin/addProduct/:updateProduct" element={<AddProduct />}></Route>
          <Route path="/admin/manageAccounts" element={<ManageAccount />}></Route>
          <Route path="/profile" element={<ViewProfile />}></Route>
          <Route path="/productInventory" element={<ProductInventory />}></Route>
          <Route path="/manageWarehouses"element={<ManageWarehouses />}></Route>
          <Route path="/viewWarehouse" element={<ViewWarehouse />}></Route>
          <Route  path="/updateWarehouse/:warehouse"element={<AddWarehouse />}></Route>
          <Route path="/viewLocation" element={<ViewLocation />}></Route>
          <Route path="/addWarehouse" element={<AddWarehouse />}></Route>
          <Route path="/addLocation" element={<AddLocation />}></Route>
          <Route path="/updateLocation/:location"element={<AddLocation />} ></Route>
          <Route path="/addCompany" element={<AddCompany />}></Route>
          <Route path="/addCompany/:updateCompany" element={<AddCompany />}></Route>
          <Route path="/manageCompanies" element={<ManageCompanies />}></Route>
          <Route path="/manageSuppliers" element={<ManageSuppliers />}></Route>
          <Route path="/addSupplier" element={<AddSupplier />}></Route>
          <Route path="/updateSupplier/:updateSupplier" element={<AddSupplier />}></Route>
          <Route path="/addStock/:location" element={<AddProduct />}></Route>
          <Route path="/updateProductAtCurrentLocation/:updateProductAtCurrentLocation" element={<AddProduct />}></Route>
          <Route path="/admin/purchaseOrder" element={<ViewPurchaseOrder />}></Route>
          <Route path="/admin/createPurchaseOrder" element={<CreatePurchaseOrder />} ></Route>
          <Route path="/products" element={<Products />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
