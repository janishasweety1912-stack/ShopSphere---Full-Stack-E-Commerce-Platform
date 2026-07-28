import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

function OrderSuccess(){

  const {orderDetails}=useContext(CartContext);

  const orderId="ZS"+Math.floor(100000+Math.random()*900000);

  if(!orderDetails){
    return(
      <>
        <Navbar/>
        <div className="bg-[#020617] min-h-screen flex items-center justify-center text-white">
          No order found
        </div>
      </>
    );
  }

  const {items}=orderDetails;

  const total=orderDetails.total;

  return(
    <>
      <Navbar/>

      <div className="bg-[#020617] min-h-screen flex items-center justify-center p-5">

        <div className="max-w-xl w-full bg-[#111827] border border-cyan-400/20 rounded-2xl p-8 text-center shadow-lg">

          <div className="text-6xl mb-5">
            🎉
          </div>

          <h1 className="text-3xl font-bold text-cyan-400">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-400 mt-4">
            Thank you for shopping with ShopSphere
          </p>

          <div className="mt-6 text-left bg-gray-900 rounded-xl p-5">

            <p className="text-gray-300">
              Order ID:
              <span className="text-purple-400 ml-2">
                {orderId}
              </span>
            </p>

            <p className="text-gray-300 mt-3">
              Total Amount:
              <span className="text-cyan-400 ml-2 font-bold">
                ₹{total}
              </span>
            </p>

          </div>

          <h2 className="text-xl font-bold text-white mt-6 mb-4">
            Order Items
          </h2>

          <div className="text-left">

            {
              items.map(item=>(
                <div
                  key={item.id}
                  className="flex justify-between text-gray-300 mb-3"
                >

                  <span>
                    {item.name} × {item.quantity||1}
                  </span>

                  <span>
                    ₹{item.price*(item.quantity||1)}
                  </span>

                </div>
              ))
            }

          </div>

          <Link
            to="/"
            className="block mt-8 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold py-3 rounded-lg hover:scale-105 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </>
  );
}

export default OrderSuccess;