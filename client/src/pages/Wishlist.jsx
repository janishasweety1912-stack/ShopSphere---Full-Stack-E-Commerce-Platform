import { useContext } from "react";
import Navbar from "../components/Navbar";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

function Wishlist(){

  const {
    wishlist,
    removeFromWishlist
  }=useContext(WishlistContext);

  const {
    addToCart
  }=useContext(CartContext);


  return(
    <>
      <Navbar/>

      <div className="bg-[#020617] min-h-screen px-6 py-10">

        <div className="max-w-7xl mx-auto">


          <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
            My Wishlist
          </h1>


          {
            wishlist.length===0 ?

            (
              <div className="bg-[#111827] border border-cyan-400/20 rounded-2xl p-10 text-center">

                <h2 className="text-2xl text-white font-bold">
                  Your Wishlist is Empty
                </h2>

                <p className="text-gray-400 mt-3">
                  Save your favourite products and view them here.
                </p>


                <Link
                  to="/products"
                  className="inline-block mt-6 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-300 transition"
                >
                  Explore Products
                </Link>


              </div>
            )


            :

            (

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">


                {
                  wishlist.map(product=>(

                    <div
                      key={product.id}
                      className="bg-[#111827] rounded-xl overflow-hidden border border-cyan-400/20 shadow-lg"
                    >


                      <Link
                        to={`/products/${product.id}`}
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-52 object-cover"
                        />

                      </Link>


                      <div className="p-4">


                        <h2 className="text-white font-semibold line-clamp-2">
                          {product.name}
                        </h2>


                        <p className="text-cyan-400 font-bold mt-2">
                          ₹{product.price}
                        </p>


                        <p className="text-yellow-400 text-sm mt-1">
                          ⭐ {product.rating}
                        </p>


                        <div className="flex gap-3 mt-5">


                          <button
                            onClick={()=>{
                              addToCart(product);
                            }}
                            className="flex-1 bg-cyan-400 text-black py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-cyan-300 transition"
                          >

                            <ShoppingCart size={18}/>

                            Cart

                          </button>


                          <button
                            onClick={()=>{
                              removeFromWishlist(product.id);
                            }}
                            className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-400 transition"
                          >

                            <Trash2 size={18}/>

                          </button>


                        </div>


                      </div>


                    </div>

                  ))
                }


              </div>

            )
          }


        </div>

      </div>

    </>
  );
}

export default Wishlist;