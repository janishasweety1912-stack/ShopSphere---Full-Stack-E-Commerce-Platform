import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductListing from "./pages/ProductListing";

import Fashion from "./pages/categories/Fashion";
import Footwear from "./pages/categories/Footwear";
import Accessories from "./pages/categories/Accessories";
import Mobiles from "./pages/categories/Mobiles";
import Electronics from "./pages/categories/Electronics";
import Beauty from "./pages/categories/Beauty";
import HomeAppliances from "./pages/categories/HomeAppliances";
import Toys from "./pages/categories/Toys";
import SportsFitness from "./pages/categories/SportsFitness";
import Furniture from "./pages/categories/Furniture";
import Books from "./pages/categories/Books";
import Wishlist from "./pages/Wishlist";
import WishlistProvider from "./context/WishlistContext";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import AdminUsers from "./admin/AdminUsers";

import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";

function App(){
  const {toast}=useContext(CartContext);
  return(
    <BrowserRouter>
      {toast && <Toast message={toast}/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<OrderSuccess/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/fashion" element={<Fashion/>}/>
        <Route path="/footwear" element={<Footwear/>}/>
        <Route path="/accessories" element={<Accessories/>}/>
        <Route path="/mobiles" element={<Mobiles/>}/>
        <Route path="/electronics" element={<Electronics/>}/>
        <Route path="/beauty" element={<Beauty/>}/>
        <Route path="/home-appliances" element={<HomeAppliances/>}/>
        <Route path="/toys" element={<Toys/>}/>
        <Route path="/sports-fitness" element={<SportsFitness/>}/>
        <Route path="/furniture" element={<Furniture/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/products/:category/:subCategory" element={<ProductListing/>}/>
        <Route path="/occasion/:occasion" element={<ProductListing/>}/>

        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/refund-policy" element={<RefundPolicy/>}/>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
        </Route>

        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/add-product" element={<AddProduct/>}/>
        <Route path="/admin/edit-product/:id" element={<EditProduct/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin/users" element={<AdminUsers/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;