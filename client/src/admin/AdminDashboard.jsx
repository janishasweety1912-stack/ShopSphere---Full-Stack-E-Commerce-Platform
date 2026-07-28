import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  TrendingUp,
  Clock,
  BarChart3
} from "lucide-react";

const stats=[
  {
    title:"Total Products",
    value:"120",
    icon:<Package size={24}/>,
    color:"from-cyan-400/20 to-cyan-400/5",
    iconColor:"text-cyan-400"
  },
  {
    title:"Total Orders",
    value:"85",
    icon:<ShoppingCart size={24}/>,
    color:"from-purple-500/20 to-purple-500/5",
    iconColor:"text-purple-400"
  },
  {
    title:"Total Customers",
    value:"340",
    icon:<Users size={24}/>,
    color:"from-emerald-400/20 to-emerald-400/5",
    iconColor:"text-emerald-400"
  },
  {
    title:"Revenue",
    value:"₹45,000",
    icon:<IndianRupee size={24}/>,
    color:"from-orange-400/20 to-orange-400/5",
    iconColor:"text-orange-400"
  }
];


const recentOrders=[
  {
    id:"#1024",
    customer:"Anisha",
    amount:"₹799",
    status:"Delivered"
  },
  {
    id:"#1025",
    customer:"Rahul",
    amount:"₹1499",
    status:"Pending"
  },
  {
    id:"#1026",
    customer:"Priya",
    amount:"₹2499",
    status:"Shipped"
  }
];


function AdminDashboard(){

  return(
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#020617]
      via-[#020617]
      to-purple-950/20
    ">


      <div className="
        flex
        justify-between
        items-start
        mb-8
      ">


        <div>

          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            Dashboard
          </h1>


          <p className="
            text-gray-400
            mt-2
          ">
            ShopSphere store performance overview
          </p>

        </div>



        <div className="
          hidden
          sm:flex
          items-center
          gap-2
          bg-gradient-to-r
          from-cyan-400/10
          to-purple-500/10
          border
          border-gray-800
          px-4
          py-2
          rounded-xl
          text-gray-300
          shadow-[0_10px_30px_rgba(168,85,247,0.12)]
        ">

          <TrendingUp
            size={18}
            className="text-cyan-400"
          />

          Growing Sales

        </div>


      </div>




      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">


        {
          stats.map((stat,index)=>(

            <div
              key={index}
              className="
                bg-[#111827]
                border
                border-gray-800
                rounded-2xl
                p-6
                shadow-[0_10px_30px_rgba(34,211,238,0.08)]
                hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)]
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >


              <div className={`
                w-12
                h-12
                rounded-xl
                bg-gradient-to-br
                ${stat.color}
                flex
                items-center
                justify-center
                ${stat.iconColor}
                mb-5
              `}>

                {stat.icon}

              </div>



              <p className="
                text-gray-400
                text-sm
                mb-2
              ">
                {stat.title}
              </p>


              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                {stat.value}
              </h2>


            </div>

          ))
        }


      </div>




      <div className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      ">



        <div className="
          lg:col-span-2
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
          shadow-[0_10px_30px_rgba(34,211,238,0.06)]
          hover:shadow-[0_10px_40px_rgba(168,85,247,0.20)]
          transition-all
          duration-300
        ">


          <div className="
            flex
            items-center
            gap-3
            mb-6
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-purple-500/10
              flex
              items-center
              justify-center
            ">

              <Clock
                size={20}
                className="text-purple-400"
              />

            </div>


            <div>

              <h2 className="
                text-xl
                font-semibold
                text-white
              ">
                Recent Orders
              </h2>


              <p className="
                text-gray-400
                text-sm
              ">
                Latest customer activity
              </p>

            </div>

          </div>




          <div className="space-y-4">


            {
              recentOrders.map((order,index)=>(

                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    items-center
                    bg-[#020617]
                    rounded-xl
                    p-4
                    border
                    border-gray-800
                    hover:border-purple-400/30
                    transition
                  "
                >


                  <div>

                    <h3 className="
                      text-white
                      font-medium
                    ">
                      {order.id}
                    </h3>


                    <p className="
                      text-gray-400
                      text-sm
                    ">
                      {order.customer}
                    </p>


                  </div>




                  <div className="text-right">


                    <p className="
                      text-white
                      font-semibold
                    ">
                      {order.amount}
                    </p>


                    <span className="
                      text-xs
                      text-cyan-400
                    ">
                      {order.status}
                    </span>


                  </div>


                </div>

              ))
            }


          </div>


        </div>





        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
          shadow-[0_10px_30px_rgba(34,211,238,0.06)]
          hover:shadow-[0_10px_40px_rgba(168,85,247,0.20)]
          transition-all
          duration-300
        ">


          <div className="
            flex
            items-center
            gap-3
            mb-6
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-cyan-400/10
              flex
              items-center
              justify-center
            ">

              <BarChart3
                size={20}
                className="text-cyan-400"
              />

            </div>


            <h2 className="
              text-xl
              font-semibold
              text-white
            ">
              Store Overview
            </h2>


          </div>



          <div className="space-y-6">


            <div>

              <p className="text-gray-400 text-sm">
                Monthly Sales
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-white
              ">
                ₹45,000
              </h3>

            </div>



            <div>

              <p className="text-gray-400 text-sm">
                New Customers
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-purple-400
              ">
                +32
              </h3>

            </div>



            <div>

              <p className="text-gray-400 text-sm">
                Pending Orders
              </p>

              <h3 className="
                text-2xl
                font-bold
                text-cyan-400
              ">
                12
              </h3>

            </div>


          </div>


        </div>


      </div>


    </div>
  );
}


export default AdminDashboard;