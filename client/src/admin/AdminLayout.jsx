import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  BarChart3,
} from "lucide-react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin/dashboard") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-[#111827] border-r border-gray-800 p-6 flex-col sticky top-0 h-screen">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-[#020617] shadow-lg">
            <ShieldCheck size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              ShopSphere
            </h1>

            <p className="text-xs text-cyan-400">
              Admin Panel
            </p>
          </div>

        </div>


        {/* Admin Info */}
        <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-gray-800 rounded-2xl p-4 mb-8">

          <p className="text-xs text-gray-500">
            Welcome back 👋
          </p>

          <h3 className="text-white font-semibold mt-1">
            {admin?.name || "Admin"}
          </h3>

          <p className="text-xs text-purple-400 mt-1">
            Store Manager
          </p>

        </div>


        {/* Navigation */}
        <nav className="space-y-2 flex-1">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${
                    active
                      ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-white border-l-4 border-cyan-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >

                <Icon
                  size={20}
                  className={active ? "text-cyan-400" : ""}
                />

                <span>
                  {item.name}
                </span>

              </Link>
            );
          })}

        </nav>


        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>


      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-4">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-[#020617]">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h1 className="text-sm font-bold text-white">
              ShopSphere
            </h1>

            <p className="text-[9px] uppercase tracking-widest text-cyan-400">
              Admin
            </p>
          </div>

        </div>


        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-gray-400 hover:text-white"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>


      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>

          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/60"
          />

          <aside className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#111827] border-r border-gray-800 p-6 flex flex-col">

            <div className="flex items-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-[#020617]">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  ShopSphere
                </h1>

                <p className="text-xs text-cyan-400">
                  Admin Panel
                </p>
              </div>

            </div>


            <nav className="space-y-2 flex-1">

              {menuItems.map((item) => {

                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      ${
                        active
                          ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >

                    <Icon
                      size={20}
                      className={active ? "text-cyan-400" : ""}
                    />

                    {item.name}

                  </Link>
                );

              })}

            </nav>


            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10"
            >
              <LogOut size={20} />
              Logout
            </button>

          </aside>

        </>
      )}


      {/* Main Area */}
      <div className="flex-1 min-w-0">

        {/* Desktop Header */}
        <header className="hidden md:flex h-20 items-center justify-between px-8 border-b border-gray-800 bg-[#020617]">

          <div>

            <p className="text-xs text-gray-500 mb-1">
              ShopSphere / Admin
            </p>

            <h2 className="text-lg font-semibold text-white">
              {location.pathname === "/admin/dashboard"
                ? "Dashboard"
                : location.pathname
                    .split("/")
                    .pop()
                    ?.replace(/^\w/, (c) => c.toUpperCase())}
            </h2>

          </div>


          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-[#020617] font-bold">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div>

              <p className="text-sm text-white font-medium">
                {admin?.name || "Admin"}
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 pt-20 md:pt-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;