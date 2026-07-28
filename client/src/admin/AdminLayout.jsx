import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  ShieldCheck
} from "lucide-react";

function AdminLayout(){

  const navigate=useNavigate();
  const location=useLocation();

  const admin=JSON.parse(
    localStorage.getItem("admin")
  );


  const logout=()=>{

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");

  };


  const menuItems=[

    {
      name:"Dashboard",
      path:"/admin/dashboard",
      icon:<LayoutDashboard size={20}/>
    },

    {
      name:"Products",
      path:"/admin/products",
      icon:<Package size={20}/>
    },

    {
      name:"Orders",
      path:"/admin/orders",
      icon:<ShoppingCart size={20}/>
    },

    {
      name:"Users",
      path:"/admin/users",
      icon:<Users size={20}/>
    }

  ];


  return(

    <div className="
      min-h-screen
      bg-[#020617]
      flex
      text-gray-200
    ">


      <aside className="
        w-72
        bg-[#111827]
        border-r
        border-gray-800
        p-6
        hidden
        md:flex
        flex-col
      ">


        <div className="
          flex
          items-center
          gap-3
          mb-10
        ">


          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-cyan-400
            via-purple-500
            to-purple-600
            flex
            items-center
            justify-center
            text-[#020617]
            shadow-lg
          ">

            <ShieldCheck size={26}/>

          </div>


          <div>

            <h1 className="
              text-xl
              font-bold
              text-white
            ">
              ShopSphere
            </h1>


            <p className="
              text-xs
              text-purple-400
            ">
              Admin Panel
            </p>


          </div>


        </div>




        <div className="
          bg-gradient-to-r
          from-cyan-400/10
          to-purple-500/10
          border
          border-gray-800
          rounded-2xl
          p-4
          mb-8
        ">


          <p className="
            text-sm
            text-gray-400
          ">
            Welcome back 👋
          </p>


          <h3 className="
            text-white
            font-semibold
            mt-1
          ">
            {admin?.name || "Admin"}
          </h3>


          <p className="
            text-xs
            text-purple-400
            mt-1
          ">
            Store Manager
          </p>


        </div>




        <nav className="
          space-y-2
          flex-1
        ">


          {
            menuItems.map((item,index)=>(

              <Link
                key={index}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-300
                  ${
                    location.pathname===item.path
                    ?
                    "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-white border-l-4 border-cyan-400"
                    :
                    "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >

                {item.icon}

                <span>
                  {item.name}
                </span>


              </Link>


            ))
          }


        </nav>




        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-gray-400
            hover:text-red-400
            hover:bg-red-400/10
            transition
          "
        >

          <LogOut size={20}/>

          Logout

        </button>



      </aside>



      <main className="
        flex-1
        p-6
      ">

        <Outlet/>

      </main>


    </div>

  );

}


export default AdminLayout;