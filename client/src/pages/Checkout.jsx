import { useContext,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Checkout(){

  const {
    cartItems,
    clearCart
  } = useContext(CartContext);


  const navigate = useNavigate();


  const [payment,setPayment]=useState("");


  const [address,setAddress]=useState({
    name:"",
    phone:"",
    address:"",
    city:"",
    pincode:""
  });



  const total = cartItems.reduce(
    (sum,item)=>sum+(item.price*(item.quantity||1)),
    0
  );



  const handleChange=(e)=>{

    setAddress({
      ...address,
      [e.target.name]:e.target.value
    });

  };



  const placeOrder=()=>{


    if(
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode ||
      !payment
    ){

      alert("Please complete all details");

      return;

    }



    const newOrder={

      id:"ZS"+Date.now(),

      date:new Date().toLocaleDateString(),

      items:cartItems,

      total:total,

      address:address,

      payment:payment,

      status:"Order Placed"

    };



    const existingOrders=
      JSON.parse(localStorage.getItem("orders")) || [];



    localStorage.setItem(

      "orders",

      JSON.stringify([
        ...existingOrders,
        newOrder
      ])

    );



    clearCart();


    alert("Order placed successfully");


    navigate("/order-success");


  };




  return(

    <>

      <Navbar/>


      <div className="
        bg-[#020617]
        min-h-screen
        p-5
        sm:p-8
      ">


        <div className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
        ">



          <div className="
            lg:col-span-2
            bg-[#111827]
            border
            border-cyan-400/20
            rounded-xl
            p-6
          ">



            <h1 className="
              text-3xl
              font-bold
              text-cyan-400
              mb-6
            ">
              Delivery Address
            </h1>



            <div className="grid gap-4">


              <input
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
                className="
                  bg-gray-900
                  text-white
                  p-3
                  rounded-lg
                  border
                  border-gray-700
                "
              />



              <input
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="
                  bg-gray-900
                  text-white
                  p-3
                  rounded-lg
                  border
                  border-gray-700
                "
              />



              <textarea
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleChange}
                className="
                  bg-gray-900
                  text-white
                  p-3
                  rounded-lg
                  border
                  border-gray-700
                "
              />



              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="
                  bg-gray-900
                  text-white
                  p-3
                  rounded-lg
                  border
                  border-gray-700
                "
              />



              <input
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="
                  bg-gray-900
                  text-white
                  p-3
                  rounded-lg
                  border
                  border-gray-700
                "
              />


            </div>




            <h2 className="
              text-2xl
              text-cyan-400
              font-bold
              mt-8
              mb-4
            ">
              Payment Method
            </h2>



            <div className="
              flex
              flex-col
              gap-3
              text-white
            ">



              <label>

                <input
                  type="radio"
                  value="Cash on Delivery"
                  checked={payment==="Cash on Delivery"}
                  onChange={(e)=>setPayment(e.target.value)}
                />

                <span className="ml-3">
                  Cash on Delivery
                </span>

              </label>




              <label>

                <input
                  type="radio"
                  value="UPI"
                  checked={payment==="UPI"}
                  onChange={(e)=>setPayment(e.target.value)}
                />

                <span className="ml-3">
                  UPI
                </span>

              </label>




              <label>

                <input
                  type="radio"
                  value="Card"
                  checked={payment==="Card"}
                  onChange={(e)=>setPayment(e.target.value)}
                />

                <span className="ml-3">
                  Debit / Credit Card
                </span>

              </label>



            </div>



          </div>





          <div className="
            bg-[#111827]
            border
            border-cyan-400/20
            rounded-xl
            p-6
            h-fit
          ">



            <h2 className="
              text-2xl
              font-bold
              text-cyan-400
              mb-5
            ">
              Order Summary
            </h2>




            {
              cartItems.map((item,index)=>(

                <div
                  key={`${item.id}-${index}`}
                  className="
                    flex
                    justify-between
                    text-gray-300
                    mb-3
                  "
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




            <div className="
              border-t
              border-gray-700
              my-5
            "></div>




            <div className="
              flex
              justify-between
              text-xl
              font-bold
            ">


              <span className="text-white">
                Total
              </span>


              <span className="text-cyan-400">
                ₹{total}
              </span>


            </div>




            <button

              onClick={placeOrder}

              className="
                w-full
                mt-6
                bg-gradient-to-r
                from-cyan-400
                to-purple-600
                text-black
                font-bold
                py-3
                rounded-lg
                hover:scale-105
                transition
              "

            >

              Place Order

            </button>




            <Link

              to="/cart"

              className="
                block
                text-center
                mt-4
                text-cyan-400
              "

            >

              Back to Cart

            </Link>



          </div>



        </div>


      </div>


    </>

  );

}


export default Checkout;