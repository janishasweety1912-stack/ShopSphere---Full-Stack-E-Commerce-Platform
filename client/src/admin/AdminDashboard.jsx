import { useEffect, useState } from "react";

import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  Clock,
  BarChart3,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";


function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      setError("");


      const token =
        localStorage.getItem("adminToken");


      if (!token) {

        setError(
          "Admin session not found. Please login again."
        );

        return;
      }


      const response = await fetch(
        "https://shopsphere-full-stack-e-commerce-platform.onrender.com/api/admin/stats",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to load dashboard"
        );
      }


      setDashboard(data);

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {

    fetchDashboard();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="
        min-h-[70vh]
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <RefreshCw
            size={34}
            className="
              text-cyan-400
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="
            text-gray-400
          ">
            Loading dashboard...
          </p>

        </div>

      </div>

    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="
        bg-red-500/10
        border
        border-red-500/20
        rounded-2xl
        p-6
      ">

        <div className="
          flex
          items-center
          gap-3
          mb-3
        ">

          <AlertTriangle
            size={22}
            className="text-red-400"
          />

          <h2 className="
            text-white
            font-semibold
          ">
            Unable to load dashboard
          </h2>

        </div>


        <p className="
          text-red-400
          text-sm
          mb-5
        ">
          {error}
        </p>


        <button
          onClick={fetchDashboard}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >

          <RefreshCw size={16} />

          Try Again

        </button>

      </div>

    );
  }


  // =====================================================
  // STATISTICS CARDS
  // =====================================================

  const stats = [

    {
      title: "Total Products",

      value:
        dashboard.stats.totalProducts,

      icon: (
        <Package size={22} />
      ),

      color:
        "from-cyan-400/20 to-cyan-400/5",

      iconColor:
        "text-cyan-400",
    },


    {
      title: "Total Orders",

      value:
        dashboard.stats.totalOrders,

      icon: (
        <ShoppingCart size={22} />
      ),

      color:
        "from-purple-500/20 to-purple-500/5",

      iconColor:
        "text-purple-400",
    },


    {
      title: "Total Customers",

      value:
        dashboard.stats.totalCustomers,

      icon: (
        <Users size={22} />
      ),

      color:
        "from-emerald-400/20 to-emerald-400/5",

      iconColor:
        "text-emerald-400",
    },


    {
      title: "Total Revenue",

      value:
        `₹${dashboard.stats.totalRevenue.toLocaleString(
          "en-IN"
        )}`,

      icon: (
        <IndianRupee size={22} />
      ),

      color:
        "from-orange-400/20 to-orange-400/5",

      iconColor:
        "text-orange-400",
    },

  ];


  // =====================================================
  // COMPONENT
  // =====================================================

  return (

    <div>


      {/* =================================================
          HEADER
      ================================================= */}

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


        <button
          onClick={fetchDashboard}
          className="
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
            hover:text-white
            hover:border-cyan-400/30
            transition
          "
        >

          <RefreshCw size={17} />

          Refresh

        </button>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        {stats.map(
          (stat, index) => (

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

              <div
                className={`
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
                `}
              >

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

          )
        )}

      </div>


      {/* =================================================
          LOWER SECTION
      ================================================= */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      ">


        {/* =================================================
            RECENT ORDERS
        ================================================= */}

        <div className="
          lg:col-span-2
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
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
                className="
                  text-purple-400
                "
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


            {dashboard.recentOrders.length === 0 ? (

              <div className="
                text-center
                py-10
                text-gray-500
              ">

                No orders yet

              </div>

            ) : (

              dashboard.recentOrders.map(
                (order) => (

                  <div
                    key={order._id}
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
                        #
                        {order._id
                          .slice(-6)
                          .toUpperCase()}
                      </h3>


                      <p className="
                        text-gray-400
                        text-sm
                      ">
                        {
                          order.user?.name ||
                          "Guest Customer"
                        }
                      </p>

                    </div>


                    <div className="
                      text-right
                    ">


                      <p className="
                        text-white
                        font-semibold
                      ">
                        ₹
                        {order.totalAmount.toLocaleString(
                          "en-IN"
                        )}
                      </p>


                      <span
                        className={`
                          text-xs
                          ${
                            order.status ===
                            "Delivered"
                              ? "text-emerald-400"
                              : order.status ===
                                "Pending"
                              ? "text-orange-400"
                              : "text-cyan-400"
                          }
                        `}
                      >
                        {order.status}
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* =================================================
            STORE OVERVIEW
        ================================================= */}

        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
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
                className="
                  text-cyan-400
                "
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


          <div className="
            space-y-6
          ">


            {/* Monthly Sales */}

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Monthly Sales
              </p>


              <h3 className="
                text-2xl
                font-bold
                text-white
              ">
                ₹
                {dashboard.stats.monthlySales.toLocaleString(
                  "en-IN"
                )}
              </h3>

            </div>


            {/* New Customers */}

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                New Customers
              </p>


              <h3 className="
                text-2xl
                font-bold
                text-purple-400
              ">
                +
                {dashboard.stats.newCustomers}
              </h3>

            </div>


            {/* Pending Orders */}

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Pending Orders
              </p>


              <h3 className="
                text-2xl
                font-bold
                text-cyan-400
              ">
                {dashboard.stats.pendingOrders}
              </h3>

            </div>


            {/* Low Stock */}

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Low Stock Products
              </p>


              <h3 className="
                text-2xl
                font-bold
                text-orange-400
              ">
                {dashboard.stats.lowStockProducts}
              </h3>

            </div>


          </div>

        </div>

      </div>

    </div>

  );
}


export default AdminDashboard;