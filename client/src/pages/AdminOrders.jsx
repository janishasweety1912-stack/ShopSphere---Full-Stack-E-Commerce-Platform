import { useEffect,useState } from "react";
import API from "../services/api";

function AdminOrders(){

  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);


  const fetchOrders=async()=>{

    try{

      const response=await API.get("/orders");

      setOrders(response.data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchOrders();

  },[]);



  const updateStatus=async(id,status)=>{

    try{

      await API.put(
        `/orders/${id}`,
        {
          status
        }
      );


      alert("Order status updated");


      fetchOrders();


    }catch(error){

      console.log(error);

    }

  };



  if(loading){

    return(
      <div className="text-white text-center mt-20">
        Loading Orders...
      </div>
    );

  }



  return(

    <div className="
      min-h-screen
      bg-[#020617]
      p-6
    ">


      <h1 className="
        text-3xl
        font-bold
        text-cyan-400
        mb-8
      ">
        Order Management
      </h1>



      <div className="grid gap-6">


      {
        orders.map((order)=>(

          <div
            key={order._id}
            className="
              bg-[#111827]
              border
              border-cyan-400/20
              rounded-xl
              p-6
            "
          >


            <div className="
              flex
              justify-between
              flex-wrap
              gap-3
            ">


              <div>

                <h2 className="text-white font-bold">

                  Order ID:
                  {" "}
                  {order._id}

                </h2>


                <p className="text-gray-400 mt-2">

                  Customer:
                  {" "}
                  {order.shippingAddress.name}

                </p>


                <p className="text-gray-400">

                  Phone:
                  {" "}
                  {order.shippingAddress.phone}

                </p>


              </div>



              <div>

                <p className="text-cyan-400 font-bold">

                  Total:
                  {" "}
                  ${order.totalAmount}

                </p>


                <p className="text-gray-400">

                  Payment:
                  {" "}
                  {order.paymentMethod}

                </p>


              </div>


            </div>



            <div className="mt-5">


              <h3 className="text-purple-400 font-bold mb-3">

                Products

              </h3>


              {
                order.products.map((item,index)=>(

                  <div
                    key={index}
                    className="
                      flex
                      justify-between
                      text-gray-300
                      mb-2
                    "
                  >

                    <span>

                      {item.name}
                      {" "}
                      ×
                      {" "}
                      {item.quantity}

                    </span>


                    <span>

                      ${item.price}

                    </span>


                  </div>

                ))
              }


            </div>




            <div className="mt-5 flex gap-3 items-center">


              <span className="text-white">

                Status:

              </span>



              <select

                value={order.status}

                onChange={(e)=>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }

                className="
                  bg-gray-900
                  text-white
                  border
                  border-cyan-400/30
                  rounded
                  p-2
                "

              >

                <option>
                  Order Placed
                </option>

                <option>
                  Confirmed
                </option>

                <option>
                  Shipped
                </option>

                <option>
                  Delivered
                </option>

                <option>
                  Cancelled
                </option>


              </select>


            </div>



          </div>


        ))
      }


      </div>


    </div>

  );

}


export default AdminOrders;