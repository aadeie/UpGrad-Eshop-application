import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Products from "./components/products/Products";
import ProductDetails from "./components/productDetails/ProductDetails";
import CreateOrder from "./components/createOrder/CreateOrder";
import AddProduct from "./components/addProduct/AddProduct";
import ModifyProduct from "./components/modifyProduct/ModifyProduct";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/order" element={<CreateOrder />} />

        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/modify-product/:id" element={<ModifyProduct />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;