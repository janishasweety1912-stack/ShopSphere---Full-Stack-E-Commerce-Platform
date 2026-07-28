import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Heart, Package, Menu, X } from "lucide-react";
import { useContext,useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Navbar(){

  const {wishlist}=useContext(WishlistContext);
  const {cart}=useContext(CartContext);
  const [menuOpen,setMenuOpen]=useState(false);

  const closeMenu=()=>{
    setMenuOpen(false);
  };

  return(
    <nav className="bg-[#020617] border-b border-cyan-400/20 sticky top-0 z-50">

      <div className="w-full px-3 sm:px-8 py-4 flex items-center justify-between gap-4">

        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition whitespace-nowrap"
        >
          ShopSphere
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-gray-300">

          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-cyan-400 transition">
            Products
          </Link>

          <Link to="/categories" className="hover:text-cyan-400 transition">
            Categories
          </Link>

          <Link to="/about" className="hover:text-cyan-400 transition">
            About
          </Link>

          <Link
            to="/my-orders"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <Package size={18}/>
            Orders
          </Link>

        </div>

        <div className="hidden md:flex items-center bg-[#111827] border border-purple-500/30 rounded-xl px-3 py-2 w-64 xl:w-72">

          <Search
            size={18}
            className="text-cyan-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none px-2 w-full text-white placeholder-gray-500 text-sm"
          />

        </div>

        <div className="flex items-center gap-4">

          <Link
            to="/wishlist"
            className="relative text-white hover:text-red-400 transition"
          >

            <Heart
              size={25}
              className="hover:fill-red-500 transition"
            />

            {
              wishlist.length>0&&(
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )
            }

          </Link>

          <Link
            to="/cart"
            className="relative text-white hover:text-cyan-400 transition"
          >

            <ShoppingCart size={25}/>

            {
              cart.length>0&&(
                <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )
            }

          </Link>

          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >

            <User size={18}/>
            Login

          </Link>

          <button
            onClick={()=>setMenuOpen(true)}
            className="lg:hidden text-cyan-400"
          >
            <Menu size={28}/>
          </button>

        </div>

      </div>

      {
        menuOpen&&(
          <>

            <div
              onClick={closeMenu}
              className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            />

            <div className="fixed top-0 right-0 h-full w-72 bg-[#020617] border-l border-cyan-400 z-50 p-6 shadow-2xl lg:hidden">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-xl font-bold text-cyan-400">
                  ShopSphere
                </h2>

                <button
                  onClick={closeMenu}
                  className="text-white hover:text-cyan-400 transition"
                >
                  <X size={28}/>
                </button>

              </div>

              <div className="flex flex-col gap-6 text-white text-lg font-medium">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  onClick={closeMenu}
                  className="hover:text-cyan-400 transition"
                >
                  Products
                </Link>

                <Link
                  to="/categories"
                  onClick={closeMenu}
                  className="hover:text-cyan-400 transition"
                >
                  Categories
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="hover:text-cyan-400 transition"
                >
                  About
                </Link>

                <Link
                  to="/my-orders"
                  onClick={closeMenu}
                  className="flex items-center gap-2 hover:text-cyan-400 transition"
                >
                  <Package size={20}/>
                  My Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={closeMenu}
                  className="flex items-center gap-2 hover:text-red-400 transition"
                >
                  <Heart size={20}/>
                  Wishlist
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="text-cyan-400 font-semibold"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-purple-400 font-semibold"
                >
                  Login
                </Link>

              </div>

            </div>

          </>
        )
      }

    </nav>
  );
}

export default Navbar;