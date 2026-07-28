import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart(){

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);


  const total = cartItems.reduce(
    (sum,item)=>sum + (item.price * (item.quantity || 1)),
    0
  );


  const totalItems = cartItems.reduce(
    (sum,item)=>sum + (item.quantity || 1),
    0
  );


  return(

    <div className="bg-[#020617] min-h-screen px-4 sm:px-6 py-10">

      <div className="max-w-6xl mx-auto">


        <h1 className="text-3xl font-bold mb-8 text-cyan-400">
          Shopping Cart
        </h1>


        {
          cartItems.length === 0 ? (

            <div className="text-center py-20">

              <p className="text-gray-400 text-xl">
                Your cart is empty
              </p>


              <Link
                to="/"
                className="inline-block mt-6 bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


              <div className="lg:col-span-2">


                {
                  cartItems.map((item,index)=>(


                    <div
                      key={`${item.id}-${index}`}
                      className="bg-[#111827] border border-cyan-400/20 rounded-xl p-4 mb-5 shadow-lg"
                    >


                      <div className="flex gap-4">


                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                        />


                        <div>


                          <h2 className="text-white font-bold text-lg">
                            {item.name}
                          </h2>


                          <p className="text-cyan-400 font-semibold">
                            ₹{item.price}
                          </p>


                          {
                            item.selectedSize && (

                              <p className="text-gray-400 text-sm mt-2">
                                Size: {item.selectedSize}
                              </p>

                            )
                          }


                          {
                            item.selectedColor && (

                              <p className="text-gray-400 text-sm">
                                Color: {item.selectedColor}
                              </p>

                            )
                          }


                          <p className="text-purple-400 mt-2">
                            Subtotal: ₹{item.price * (item.quantity || 1)}
                          </p>


                        </div>


                      </div>



                      <div className="flex items-center justify-between mt-5">


                        <div className="flex items-center gap-3">


                          <button
                            onClick={()=>decreaseQuantity(item.id)}
                            className="bg-gray-800 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded"
                          >
                            -
                          </button>


                          <span className="text-white font-bold">
                            {item.quantity || 1}
                          </span>


                          <button
                            onClick={()=>increaseQuantity(item.id)}
                            className="bg-gray-800 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded"
                          >
                            +
                          </button>


                        </div>



                        <button
                          onClick={()=>removeFromCart(item.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                        >
                          Remove
                        </button>


                      </div>


                    </div>


                  ))
                }


              </div>




              <div className="bg-[#111827] border border-cyan-400/20 rounded-xl p-6 h-fit">


                <h2 className="text-2xl font-bold text-cyan-400 mb-5">
                  Order Summary
                </h2>



                <div className="flex justify-between text-gray-300 mb-3">

                  <span>
                    Total Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>



                <div className="flex justify-between text-gray-300 mb-3">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{total}
                  </span>

                </div>



                <div className="border-t border-gray-700 my-5"></div>



                <div className="flex justify-between text-xl font-bold">


                  <span className="text-white">
                    Total
                  </span>


                  <span className="text-cyan-400">
                    ₹{total}
                  </span>


                </div>



                <Link
                  to="/checkout"
                  className="block text-center mt-6 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold py-3 rounded-lg hover:scale-105 transition"
                >
                  Proceed to Checkout
                </Link>



                <Link
                  to="/"
                  className="block text-center mt-4 text-cyan-400"
                >
                  Continue Shopping
                </Link>



              </div>


            </div>


          )
        }


      </div>


    </div>

  );

}


export default Cart;