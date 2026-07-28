import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";

function MyOrders(){

  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    const savedOrders=
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders.reverse());
  },[]);

  return(
    <>
      <Navbar/>

      <div className="bg-[#020617] min-h-screen p-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-cyan-400 mb-8">
            My Orders
          </h1>

          {
            orders.length===0?(
              <div className="text-center mt-20">

                <h2 className="text-2xl text-gray-400">
                  No orders found
                </h2>

                <p className="text-gray-500 mt-3">
                  Your placed orders will appear here
                </p>

              </div>
            ):(
              <div className="space-y-6">

                {
                  orders.map(order=>(

                    <div
                      key={order.id}
                      className="bg-[#111827] border border-cyan-400/20 rounded-xl p-6 shadow-lg"
                    >

                      <div className="flex flex-col sm:flex-row justify-between gap-4">

                        <div>

                          <h2 className="text-xl font-bold text-cyan-400">
                            Order ID: {order.id}
                          </h2>

                          <p className="text-gray-400 mt-2">
                            Date: {order.date}
                          </p>

                          <p className="text-green-400 mt-2">
                            Status: {order.status}
                          </p>

                        </div>


                        <div className="text-right">

                          <p className="text-gray-400">
                            Payment
                          </p>

                          <p className="text-white font-semibold">
                            {order.payment}
                          </p>

                          <p className="text-cyan-400 text-xl font-bold mt-3">
                            ₹{order.total}
                          </p>

                        </div>

                      </div>


                      <div className="border-t border-gray-700 my-5"></div>


                      <h3 className="text-white font-bold mb-4">
                        Products
                      </h3>


                      <div className="space-y-3">

                        {
                          order.items.map(item=>(

                            <div
                              key={item.id}
                              className="flex items-center justify-between bg-gray-900 p-3 rounded-lg"
                            >

                              <div className="flex items-center gap-3">

                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-14 h-14 rounded-lg object-cover"
                                />

                                <div>

                                  <p className="text-white font-semibold">
                                    {item.name}
                                  </p>

                                  <p className="text-gray-400">
                                    Quantity: {item.quantity||1}
                                  </p>

                                </div>

                              </div>


                              <p className="text-cyan-400 font-bold">
                                ₹{item.price*(item.quantity||1)}
                              </p>

                            </div>

                          ))
                        }

                      </div>


                      <div className="mt-5 bg-gray-900 rounded-lg p-4">

                        <h3 className="text-purple-400 font-bold">
                          Delivery Address
                        </h3>

                        <p className="text-gray-300 mt-2">
                          {order.address.name}
                        </p>

                        <p className="text-gray-400">
                          {order.address.address}, {order.address.city}
                        </p>

                        <p className="text-gray-400">
                          Phone: {order.address.phone}
                        </p>

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

export default MyOrders;