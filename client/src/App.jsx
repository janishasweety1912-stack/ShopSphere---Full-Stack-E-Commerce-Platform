import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "./context/CartContext";
import Toast from "./components/Toast";

// =====================================================
// USER PAGES
// =====================================================

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
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";

// =====================================================
// CATEGORY PAGES
// =====================================================

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

// =====================================================
// LEGAL PAGES
// =====================================================

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/AdminOrders";
import AdminAnalytics from "./admin/AdminAnalytics";

// =====================================================
// APP
// =====================================================

function App() {
  const { toast } = useContext(CartContext);

  return (
    <BrowserRouter>

      {/* GLOBAL TOAST */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      <Routes>

        {/* =================================================
            USER ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =================================================
            CATEGORY ROUTES
        ================================================= */}

        <Route
          path="/fashion"
          element={<Fashion />}
        />

        <Route
          path="/footwear"
          element={<Footwear />}
        />

        <Route
          path="/accessories"
          element={<Accessories />}
        />

        <Route
          path="/mobiles"
          element={<Mobiles />}
        />

        <Route
          path="/electronics"
          element={<Electronics />}
        />

        <Route
          path="/beauty"
          element={<Beauty />}
        />

        <Route
          path="/home-appliances"
          element={<HomeAppliances />}
        />

        <Route
          path="/toys"
          element={<Toys />}
        />

        <Route
          path="/sports-fitness"
          element={<SportsFitness />}
        />

        <Route
          path="/furniture"
          element={<Furniture />}
        />

        <Route
          path="/books"
          element={<Books />}
        />

        {/* =================================================
            PRODUCT LISTING
        ================================================= */}

        <Route
          path="/products/:category/:subCategory"
          element={<ProductListing />}
        />

        <Route
          path="/occasion/:occasion"
          element={<ProductListing />}
        />

        {/* =================================================
            LEGAL
        ================================================= */}

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/refund-policy"
          element={<RefundPolicy />}
        />

        {/* =================================================
            ADMIN LOGIN
        ================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =================================================
            ADMIN LAYOUT
        ================================================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* ADMIN DASHBOARD */}

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* ADMIN PRODUCTS */}

          <Route
            path="products"
            element={<AdminProducts />}
          />

          {/* ADD PRODUCT */}

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          {/* EDIT PRODUCT */}

          <Route
            path="edit-product/:id"
            element={<EditProduct />}
          />

          {/* ADMIN ORDERS */}

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          {/* ADMIN USERS */}

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;