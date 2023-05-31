import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import HeaderMenuDrawer from "./Components/Common/HeaderMenuDrawer/HeaderMenuDrawer";
import ProductTable from "./Components/Products/ProductTable";
import UserTable from "./Components/Users/UserTable";
import ProductDialog from "./Components/Products/ProductDialog";

function App() {
  return (
    <>
      <HeaderMenuDrawer></HeaderMenuDrawer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductTable />} />
          <Route path="/productdialog" element={<ProductDialog />} />
          <Route path="user" element={<UserTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
