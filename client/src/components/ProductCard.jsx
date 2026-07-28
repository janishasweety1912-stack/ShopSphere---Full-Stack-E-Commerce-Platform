import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Heart } from "lucide-react";
function ProductCard({product}){
  const {addToCart}=useContext(CartContext);
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }=useContext(WishlistContext);
  const productId=product.id || product._id;
  const liked=isInWishlist(productId);
  const handleWishlist=()=>{
    if(liked){
      removeFromWishlist(productId);
    }
    else{
      addToWishlist(product);
    }
  };
  return(
    <div className="w-full h-full bg-[#111827] rounded-xl overflow-hidden border border-cyan-400/20 hover:border-cyan-400 transition shadow-lg flex flex-col relative">
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 bg-[#020617] p-2 rounded-full hover:scale-110 transition"
      >
        <Heart
          size={22}
          className={
            liked
            ?"fill-red-500 text-red-500"
            :"text-gray-300"
          }
        />
      </button>
      {
        product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-bold">
            {product.tag}
          </span>
        )
      }
      <Link
        to={`/products/${productId}`}
        className="flex-1"
      >
        <div className="w-full h-40 sm:h-52 md:h-56 overflow-hidden bg-gray-900">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e)=>{
              e.target.src="https://via.placeholder.com/300x300?text=No+Image";
            }}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-purple-400 text-xs font-semibold">
            {product.brand}
          </p>
          <h3 className="text-gray-200 font-semibold text-sm sm:text-base line-clamp-2 mt-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-cyan-400 font-bold">
              ₹{product.price}
            </p>
            {
              product.discount && (
                <span className="text-green-400 text-xs font-semibold">
                  {product.discount}% OFF
                </span>
              )
            }
          </div>
          {
            product.rating && (
              <p className="text-yellow-400 text-sm mt-2">
                ⭐ {product.rating}
              </p>
            )
          }
        </div>
      </Link>
      <button
        onClick={()=>addToCart(product)}
        className="w-full bg-cyan-400 text-black font-bold py-2 hover:bg-cyan-300 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;