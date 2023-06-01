import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import HeaderMenuDrawer from "./Components/Common/HeaderMenuDrawer/HeaderMenuDrawer";
import ProductTable from "./Components/Products/ProductTable";
import UserTable from "./Components/Users/UserTable";
import ProductDialog from "./Components/Products/ProductDialog";
import BrandTable from "./Components/Brand/BrandTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderMenuDrawer></HeaderMenuDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductTable />} />
          <Route path="/user" element={<UserTable />} />
          <Route path="/brand" element={<BrandTable />} />
          <Route path="/productdialog" element={<ProductDialog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
