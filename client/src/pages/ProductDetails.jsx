import { useParams,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext,useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";

function ProductDetails(){

  const {id}=useParams();
  const navigate=useNavigate();

  const {addToCart}=useContext(CartContext);

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }=useContext(WishlistContext);

  const [selectedSize,setSelectedSize]=useState("");
  const [selectedColor,setSelectedColor]=useState("");
  const [quantity,setQuantity]=useState(1);

  const product=products.find(
    item=>item.id===Number(id)
  );

  if(!product){
    return(
      <>
        <Navbar/>
        <div className="bg-[#020617] min-h-screen text-white p-10">
          Product not found
        </div>
      </>
    );
  }

  const liked=isInWishlist(product.id);

  const discountPrice=Math.round(
    product.price-(product.price*product.discount/100)
  );

  const buyNow=()=>{
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    navigate("/checkout");
  };

  const handleWishlist=()=>{
    if(liked){
      removeFromWishlist(product.id);
    }
    else{
      addToWishlist(product);
    }
  };

  const relatedProducts=products.filter(item=>
    item.id!==product.id &&
    (
      item.category===product.category ||
      item.tags?.some(tag=>product.tags?.includes(tag))
    )
  ).slice(0,4);

  const handleTagClick=(tag)=>{
    navigate(`/products/${product.category}/${tag.toLowerCase().replaceAll(" ","-")}`);
  };

  return(
    <>
      <Navbar/>
      <div className="bg-[#020617] min-h-screen p-5 sm:p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="relative">
            {
              product.discount>0&&(
                <span className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
                  {product.discount}% OFF
                </span>
              )
            }
            <div className="bg-[#111827] rounded-2xl overflow-hidden border border-cyan-400/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[350px] sm:h-[500px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
          <div className="text-gray-200">
            <p className="text-purple-400 font-semibold text-lg">
              {product.brand}
            </p>
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold mt-3 text-cyan-400">
                {product.name}
              </h1>
              <button
                onClick={handleWishlist}
                className="bg-[#111827] border border-purple-500 p-3 rounded-full hover:scale-110 transition"
              >
                <Heart
                  size={28}
                  className={
                    liked
                    ?"fill-red-500 text-red-500"
                    :"text-gray-300"
                  }
                />
              </button>
            </div>
            <button
              onClick={handleWishlist}
              className="mt-4 text-purple-400 hover:text-cyan-400 transition font-semibold"
            >
              {
                liked
                ?"♥ Remove from Wishlist"
                :"♡ Add to Wishlist"
              }
            </button>
            <div className="flex items-center gap-3 flex-wrap mt-5">
              <span className="text-3xl font-bold text-white">
                ₹{discountPrice}
              </span>
              <span className="line-through text-gray-500 text-lg">
                ₹{product.price}
              </span>
              <span className="text-green-400 font-semibold">
                Save {product.discount}%
              </span>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold">
                ⭐ {product.rating}
              </span>
              {
                product.stock>0?
                <span className="text-green-400">
                  ● In Stock
                </span>:
                <span className="text-red-400">
                  ● Out of Stock
                </span>
              }
            </div>
            <p className="mt-5 text-gray-400 leading-relaxed">
              {product.description}
            </p>
            {
              product.tags&&(
                <div className="mt-6">
                  <h3 className="text-cyan-400 font-bold mb-3">
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {
                      product.tags.map(tag=>(
                        <button
                          key={tag}
                          onClick={()=>handleTagClick(tag)}
                          className="bg-purple-500/20 border border-purple-400 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-500 hover:text-white transition"
                        >
                          #{tag}
                        </button>
                      ))
                    }
                  </div>
                </div>
              )
            }
                        {
              product.sizes&&(
                <div className="mt-6">
                  <h3 className="font-bold mb-3">
                    Select Size
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {
                      product.sizes.map(size=>(
                        <button
                          key={size}
                          onClick={()=>setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedSize===size
                            ?"bg-cyan-400 text-black border-cyan-400"
                            :"border-gray-600 hover:border-cyan-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))
                    }
                  </div>
                </div>
              )
            }
            {
              product.colors&&(
                <div className="mt-6">
                  <h3 className="font-bold mb-3">
                    Select Color
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {
                      product.colors.map(color=>(
                        <button
                          key={color}
                          onClick={()=>setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedColor===color
                            ?"bg-purple-500 text-white border-purple-500"
                            :"border-gray-600 hover:border-purple-400"
                          }`}
                        >
                          {color}
                        </button>
                      ))
                    }
                  </div>
                </div>
              )
            }
            <div className="mt-6 flex items-center gap-5">
              <button
                onClick={()=>quantity>1&&setQuantity(quantity-1)}
                className="w-10 h-10 bg-purple-500 rounded-lg font-bold"
              >
                -
              </button>
              <span className="text-xl font-bold">
                {quantity}
              </span>
              <button
                onClick={()=>setQuantity(quantity+1)}
                className="w-10 h-10 bg-purple-500 rounded-lg font-bold"
              >
                +
              </button>
            </div>
            <div className="mt-6 bg-[#111827] border border-cyan-400/20 rounded-xl p-4">
              <h3 className="text-cyan-400 font-bold">
                🚚 Delivery Information
              </h3>
              <p className="text-gray-400 mt-2">
                Free delivery available
              </p>
              <p className="text-gray-400">
                Easy returns within 7 days
              </p>
            </div>
            <button
              disabled={product.stock===0}
              onClick={()=>addToCart({
                ...product,
                selectedSize,
                selectedColor,
                quantity
              })}
              className="mt-6 w-full bg-cyan-400 text-black py-3 rounded-xl font-bold hover:bg-cyan-300 transition"
            >
              Add to Cart
            </button>
            <button
              disabled={product.stock===0}
              onClick={buyNow}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-black py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-cyan-400 mb-8">
            You May Also Like
          </h2>
          {
            relatedProducts.length>0?(
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                  relatedProducts.map(item=>(
                    <ProductCard
                      key={item.id}
                      product={item}
                    />
                  ))
                }
              </div>
            ):
            (
              <p className="text-gray-400">
                No related products found.
              </p>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ProductDetails;