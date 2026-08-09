import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Eye,
  X,
} from "lucide-react";
import AdminToast from "./AdminToast";

function AdminOrders() {
  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  // =====================================================
  // TOAST
  // =====================================================

  const showToast = (message, type) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "",
      });
    }, 3000);
  };

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load orders"
        );
      }

      setOrders(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error
      );

      showToast(
        error.message ||
          "Failed to load orders",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      setSelectedOrder((previous) => {
        if (
          previous &&
          previous._id === orderId
        ) {
          return {
            ...previous,
            status: newStatus,
          };
        }

        return previous;
      });

      showToast(
        "Order status updated successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      showToast(
        error.message ||
          "Something went wrong",
        "error"
      );
    }
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredOrders = orders.filter(
    (order) => {
      const searchText =
        search.toLowerCase().trim();

      const customerName =
        order.user?.name ||
        order.shippingAddress?.name ||
        "Guest";

      const customerEmail =
        order.user?.email || "";

      const orderId =
        order._id || "";

      const matchesSearch =
        customerName
          .toLowerCase()
          .includes(searchText) ||
        customerEmail
          .toLowerCase()
          .includes(searchText) ||
        orderId
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";

      case "Shipped":
        return "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";

      case "Pending":
        return "bg-orange-400/10 text-orange-400 border-orange-400/20";

      case "Cancelled":
        return "bg-red-400/10 text-red-400 border-red-400/20";

      case "Order Placed":
        return "bg-purple-400/10 text-purple-400 border-purple-400/20";

      default:
        return "bg-gray-400/10 text-gray-400 border-gray-400/20";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#020617]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              border-4
              border-cyan-400
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-400">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <AdminToast
        message={toast.message}
        type={toast.type}
      />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-[#020617]
          via-[#020617]
          to-purple-950/20
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            justify-between
            items-start
            mb-8
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-cyan-400/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Package
                  size={22}
                  className="text-cyan-400"
                />
              </div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Orders
              </h1>
            </div>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Manage your ShopSphere orders
            </p>
          </div>
        </div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-4
            mb-6
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              flex-1
            "
          >
            <Search
              size={20}
              className="text-purple-400"
            />

            <input
              type="text"
              placeholder="Search by customer, email or order ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-transparent
                outline-none
                text-white
                placeholder:text-gray-500
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              bg-[#020617]
              border
              border-gray-700
              rounded-xl
              px-4
              py-3
              text-gray-300
              outline-none
              focus:border-cyan-400
            "
          >
            <option value="All">
              All Status
            </option>

            <option value="Order Placed">
              Order Placed
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* =================================================
            ORDERS TABLE
        ================================================= */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            overflow-hidden
            shadow-[0_10px_30px_rgba(168,85,247,0.12)]
          "
        >
          {filteredOrders.length === 0 ? (
            <div
              className="
                py-16
                text-center
              "
            >
              <Package
                size={48}
                className="
                  text-gray-700
                  mx-auto
                  mb-4
                "
              />

              <p className="text-gray-400">
                No orders found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className="
                    bg-[#020617]
                    text-gray-400
                    text-sm
                  "
                >
                  <tr>
                    <th className="p-5 text-left">
                      Order
                    </th>

                    <th className="p-5 text-left">
                      Customer
                    </th>

                    <th className="p-5 text-left">
                      Products
                    </th>

                    <th className="p-5 text-left">
                      Amount
                    </th>

                    <th className="p-5 text-left">
                      Payment
                    </th>

                    <th className="p-5 text-left">
                      Status
                    </th>

                    <th className="p-5 text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map(
                    (order) => {
                      const customerName =
                        order.user?.name ||
                        order.shippingAddress?.name ||
                        "Guest";

                      return (
                        <tr
                          key={order._id}
                          className="
                            border-t
                            border-gray-800
                            hover:bg-white/5
                            transition
                          "
                        >
                          {/* ORDER */}

                          <td className="p-5">
                            <p
                              className="
                                text-white
                                font-semibold
                              "
                            >
                              #
                              {order._id
                                ?.slice(-6)
                                .toUpperCase()}
                            </p>

                            <p
                              className="
                                text-gray-500
                                text-xs
                                mt-1
                              "
                            >
                              {order.createdAt
                                ? new Date(
                                    order.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </td>

                          {/* CUSTOMER */}

                          <td className="p-5">
                            <p
                              className="
                                text-white
                                font-medium
                              "
                            >
                              {customerName}
                            </p>

                            <p
                              className="
                                text-gray-500
                                text-sm
                                mt-1
                              "
                            >
                              {order.user?.email ||
                                "Guest order"}
                            </p>
                          </td>

                          {/* PRODUCTS */}

                          <td
                            className="
                              p-5
                              text-gray-300
                            "
                          >
                            {order.products?.length ||
                              0}{" "}
                            item(s)
                          </td>

                          {/* AMOUNT */}

                          <td
                            className="
                              p-5
                              text-cyan-400
                              font-semibold
                            "
                          >
                            ₹
                            {Number(
                              order.totalAmount || 0
                            ).toLocaleString("en-IN")}
                          </td>

                          {/* PAYMENT */}

                          <td className="p-5">
                            <p
                              className="
                                text-gray-300
                                text-sm
                              "
                            >
                              {order.paymentMethod ||
                                "COD"}
                            </p>

                            <p
                              className="
                                text-gray-500
                                text-xs
                                mt-1
                              "
                            >
                              {order.paymentStatus ||
                                "Pending"}
                            </p>
                          </td>

                          {/* STATUS */}

                          <td className="p-5">
                            <select
                              value={
                                order.status ||
                                "Order Placed"
                              }
                              onChange={(e) =>
                                updateStatus(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className={`
                                px-3
                                py-2
                                rounded-lg
                                border
                                text-xs
                                font-medium
                                bg-transparent
                                outline-none
                                ${getStatusStyle(
                                  order.status
                                )}
                              `}
                            >
                              <option value="Order Placed">
                                Order Placed
                              </option>

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Shipped">
                                Shipped
                              </option>

                              <option value="Delivered">
                                Delivered
                              </option>

                              <option value="Cancelled">
                                Cancelled
                              </option>
                            </select>
                          </td>

                          {/* ACTION */}

                          <td className="p-5">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-lg
                                bg-purple-500/10
                                text-purple-400
                                hover:bg-purple-500/20
                                transition
                                flex
                                items-center
                                justify-center
                              "
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          ORDER DETAILS MODAL
      ================================================= */}

      {selectedOrder && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              bg-[#111827]
              border
              border-gray-800
              rounded-2xl
              shadow-2xl
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                flex
                justify-between
                items-center
                p-6
                border-b
                border-gray-800
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  Order Details
                </h2>

                <p
                  className="
                    text-gray-500
                    text-sm
                    mt-1
                  "
                >
                  #{selectedOrder._id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-gray-800
                  text-gray-400
                  hover:text-white
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* CUSTOMER */}

              <div>
                <h3
                  className="
                    text-sm
                    text-gray-400
                    mb-3
                  "
                >
                  Customer
                </h3>

                <div
                  className="
                    bg-[#020617]
                    border
                    border-gray-800
                    rounded-xl
                    p-4
                  "
                >
                  <p
                    className="
                      text-white
                      font-medium
                    "
                  >
                    {selectedOrder.user?.name ||
                      selectedOrder.shippingAddress?.name ||
                      "Guest"}
                  </p>

                  <p
                    className="
                      text-gray-500
                      text-sm
                      mt-1
                    "
                  >
                    {selectedOrder.user?.email ||
                      "Guest order"}
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}

              <div>
                <h3
                  className="
                    text-sm
                    text-gray-400
                    mb-3
                  "
                >
                  Products
                </h3>

                <div className="space-y-3">
                  {selectedOrder.products?.map(
                    (item, index) => (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className="
                          flex
                          items-center
                          gap-4
                          bg-[#020617]
                          border
                          border-gray-800
                          rounded-xl
                          p-4
                        "
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              "Product"
                            }
                            className="
                              w-16
                              h-16
                              rounded-lg
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-16
                              h-16
                              rounded-lg
                              bg-gray-800
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Package
                              size={20}
                              className="
                                text-gray-600
                              "
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <p
                            className="
                              text-white
                              font-medium
                            "
                          >
                            {item.name ||
                              "Product"}
                          </p>

                          <p
                            className="
                              text-gray-500
                              text-sm
                              mt-1
                            "
                          >
                            Quantity:{" "}
                            {item.quantity ||
                              1}
                          </p>
                        </div>

                        <p
                          className="
                            text-cyan-400
                            font-semibold
                          "
                        >
                          ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* SHIPPING ADDRESS */}

              <div>
                <h3
                  className="
                    text-sm
                    text-gray-400
                    mb-3
                  "
                >
                  Shipping Address
                </h3>

                <div
                  className="
                    bg-[#020617]
                    border
                    border-gray-800
                    rounded-xl
                    p-4
                    text-gray-300
                    text-sm
                    leading-6
                  "
                >
                  <p>
                    {selectedOrder
                      .shippingAddress
                      ?.name || "N/A"}
                  </p>

                  <p>
                    {selectedOrder
                      .shippingAddress
                      ?.phone || "N/A"}
                  </p>

                  <p>
                    {selectedOrder
                      .shippingAddress
                      ?.address || "N/A"}
                  </p>

                  <p>
                    {selectedOrder
                      .shippingAddress
                      ?.city || ""}
                    {selectedOrder
                      .shippingAddress
                      ?.city &&
                    selectedOrder
                      .shippingAddress
                      ?.pincode
                      ? " - "
                      : ""}
                    {selectedOrder
                      .shippingAddress
                      ?.pincode || ""}
                  </p>
                </div>
              </div>

              {/* SUMMARY */}

              <div
                className="
                  bg-[#020617]
                  border
                  border-gray-800
                  rounded-xl
                  p-5
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    mb-3
                  "
                >
                  <span className="text-gray-400">
                    Payment Method
                  </span>

                  <span className="text-white">
                    {selectedOrder.paymentMethod ||
                      "COD"}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    mb-3
                  "
                >
                  <span className="text-gray-400">
                    Payment Status
                  </span>

                  <span className="text-cyan-400">
                    {selectedOrder.paymentStatus ||
                      "Pending"}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    mb-3
                  "
                >
                  <span className="text-gray-400">
                    Order Status
                  </span>

                  <span
                    className={
                      getStatusStyle(
                        selectedOrder.status
                      ) +
                      " px-2 py-1 rounded-lg border text-xs"
                    }
                  >
                    {selectedOrder.status ||
                      "Order Placed"}
                  </span>
                </div>

                <div
                  className="
                    border-t
                    border-gray-800
                    pt-3
                    flex
                    justify-between
                  "
                >
                  <span
                    className="
                      text-white
                      font-semibold
                    "
                  >
                    Total
                  </span>

                  <span
                    className="
                      text-xl
                      text-cyan-400
                      font-bold
                    "
                  >
                    ₹
                    {Number(
                      selectedOrder.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminOrders;