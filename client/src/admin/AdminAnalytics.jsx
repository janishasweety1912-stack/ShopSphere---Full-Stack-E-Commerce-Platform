import { useEffect, useState } from "react";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";

function AdminAnalytics() {
  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ANALYTICS
  // =====================================================

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/analytics`,
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
          data.message ||
            "Failed to load analytics"
        );
      }

      setAnalytics(data);
    } catch (error) {
      console.error(
        "Analytics fetch error:",
        error
      );

      setError(
        error.message ||
          "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value) => {
    return `₹${Number(
      value || 0
    ).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // FORMAT MONTH
  // =====================================================

  const formatMonth = (month) => {
    if (!month) {
      return "";
    }

    const [year, monthNumber] =
      month.split("-");

    const date = new Date(
      Number(year),
      Number(monthNumber) - 1
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      }
    );
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
            Loading analytics...
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
      <div
        className="
          min-h-screen
          bg-[#020617]
          flex
          items-center
          justify-center
          p-6
        "
      >
        <div
          className="
            max-w-md
            w-full
            bg-[#111827]
            border
            border-red-400/20
            rounded-2xl
            p-8
            text-center
          "
        >
          <XCircle
            size={48}
            className="
              text-red-400
              mx-auto
              mb-4
            "
          />

          <h2
            className="
              text-xl
              font-bold
              text-white
              mb-2
            "
          >
            Failed to Load Analytics
          </h2>

          <p className="text-gray-400 mb-6">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchAnalytics}
            className="
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              text-[#020617]
              font-bold
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const {
    summary,
    orderStatus,
    monthlyAnalytics,
    topProducts,
    paymentMethods,
  } = analytics;

  // =====================================================
  // STATUS DATA
  // =====================================================

  const statusCards = [
    {
      title: "Order Placed",
      value: orderStatus.orderPlaced,
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Pending",
      value: orderStatus.pending,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Shipped",
      value: orderStatus.shipped,
      icon: Truck,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      title: "Delivered",
      value: orderStatus.delivered,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Cancelled",
      value: orderStatus.cancelled,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  // =====================================================
  // UI
  // =====================================================

  return (
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

      <div className="mb-8">
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
            <BarChart3
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
            Analytics
          </h1>
        </div>

        <p
          className="
            text-gray-400
            mt-2
          "
        >
          ShopSphere store performance overview
        </p>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
          mb-6
        "
      >
        {/* REVENUE */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                Total Revenue
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {formatCurrency(
                  summary.totalRevenue
                )}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-emerald-400/10
                flex
                items-center
                justify-center
              "
            >
              <DollarSign
                size={22}
                className="text-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* ORDERS */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                Total Orders
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {summary.totalOrders}
              </p>
            </div>

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
              <ShoppingCart
                size={22}
                className="text-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* USERS */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {summary.totalUsers}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-purple-400/10
                flex
                items-center
                justify-center
              "
            >
              <Users
                size={22}
                className="text-purple-400"
              />
            </div>
          </div>
        </div>

        {/* PRODUCTS */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                Total Products
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {summary.totalProducts}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-orange-400/10
                flex
                items-center
                justify-center
              "
            >
              <Package
                size={22}
                className="text-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          SECONDARY SUMMARY
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          mb-6
        "
      >
        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <TrendingUp
              size={22}
              className="text-cyan-400"
            />

            <div>
              <p className="text-gray-500 text-sm">
                Average Order Value
              </p>

              <p
                className="
                  text-xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {formatCurrency(
                  summary.averageOrderValue
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <CreditCard
              size={22}
              className="text-purple-400"
            />

            <div>
              <p className="text-gray-500 text-sm">
                Payment Methods
              </p>

              <p
                className="
                  text-xl
                  font-bold
                  text-white
                  mt-1
                "
              >
                {Object.keys(
                  paymentMethods
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          ORDER STATUS
      ================================================= */}

      <div
        className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
          mb-6
        "
      >
        <div className="mb-5">
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Order Status
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Current order distribution
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-4
          "
        >
          {statusCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  bg-[#020617]
                  border
                  border-gray-800
                  rounded-xl
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p className="text-gray-500 text-xs">
                      {item.title}
                    </p>

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mt-1
                      "
                    >
                      {item.value}
                    </p>
                  </div>

                  <div
                    className={`
                      w-10
                      h-10
                      rounded-xl
                      ${item.bg}
                      flex
                      items-center
                      justify-center
                    `}
                  >
                    <Icon
                      size={20}
                      className={item.color}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================
          MONTHLY REVENUE
      ================================================= */}

      <div
        className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-6
          mb-6
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Revenue Overview
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Revenue for the last 6 active months
          </p>
        </div>

        {monthlyAnalytics.length === 0 ? (
          <div
            className="
              py-12
              text-center
              text-gray-500
            "
          >
            No revenue data available yet.
          </div>
        ) : (
          <div className="space-y-5">
            {monthlyAnalytics.map(
              (item) => {
                const maxRevenue =
                  Math.max(
                    ...monthlyAnalytics.map(
                      (month) =>
                        month.revenue
                    ),
                    1
                  );

                const percentage =
                  (item.revenue /
                    maxRevenue) *
                  100;

                return (
                  <div key={item.month}>
                    <div
                      className="
                        flex
                        justify-between
                        mb-2
                        text-sm
                      "
                    >
                      <span className="text-gray-400">
                        {formatMonth(
                          item.month
                        )}
                      </span>

                      <span className="text-cyan-400 font-semibold">
                        {formatCurrency(
                          item.revenue
                        )}
                      </span>
                    </div>

                    <div
                      className="
                        h-3
                        bg-[#020617]
                        rounded-full
                        overflow-hidden
                      "
                    >
                      <div
                        className="
                          h-full
                          bg-gradient-to-r
                          from-cyan-400
                          to-purple-500
                          rounded-full
                          transition-all
                        "
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <p className="text-gray-600 text-xs mt-1">
                      {item.orders} order
                      {item.orders !== 1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* =================================================
          TOP PRODUCTS + PAYMENT METHODS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        {/* TOP PRODUCTS */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            overflow-hidden
          "
        >
          <div
            className="
              p-6
              border-b
              border-gray-800
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                text-white
              "
            >
              Top Selling Products
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Products with the highest sales
            </p>
          </div>

          {topProducts.length === 0 ? (
            <div
              className="
                p-10
                text-center
                text-gray-500
              "
            >
              No sales data available.
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {topProducts.map(
                (product, index) => (
                  <div
                    key={`${product.name}-${index}`}
                    className="
                      p-5
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-purple-400/10
                        text-purple-400
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                      "
                    >
                      {index + 1}
                    </div>

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-12
                          h-12
                          rounded-lg
                          object-cover
                          bg-[#020617]
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-12
                          h-12
                          rounded-lg
                          bg-[#020617]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Package
                          size={20}
                          className="text-gray-600"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p
                        className="
                          text-white
                          font-medium
                          truncate
                        "
                      >
                        {product.name}
                      </p>

                      <p
                        className="
                          text-gray-500
                          text-sm
                          mt-1
                        "
                      >
                        {product.quantity} sold
                      </p>
                    </div>

                    <p
                      className="
                        text-cyan-400
                        font-semibold
                        text-sm
                      "
                    >
                      {formatCurrency(
                        product.revenue
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* PAYMENT METHODS */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            overflow-hidden
          "
        >
          <div
            className="
              p-6
              border-b
              border-gray-800
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                text-white
              "
            >
              Payment Methods
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Orders grouped by payment method
            </p>
          </div>

          {Object.keys(paymentMethods)
            .length === 0 ? (
            <div
              className="
                p-10
                text-center
                text-gray-500
              "
            >
              No payment data available.
            </div>
          ) : (
            <div className="p-6 space-y-5">
              {Object.entries(
                paymentMethods
              ).map(
                ([method, count]) => {
                  const total =
                    Object.values(
                      paymentMethods
                    ).reduce(
                      (sum, value) =>
                        sum + value,
                      0
                    );

                  const percentage =
                    total > 0
                      ? (count / total) *
                        100
                      : 0;

                  return (
                    <div key={method}>
                      <div
                        className="
                          flex
                          justify-between
                          mb-2
                        "
                      >
                        <span className="text-gray-300">
                          {method}
                        </span>

                        <span className="text-purple-400 font-semibold">
                          {count} order
                          {count !== 1
                            ? "s"
                            : ""}
                        </span>
                      </div>

                      <div
                        className="
                          h-2
                          bg-[#020617]
                          rounded-full
                          overflow-hidden
                        "
                      >
                        <div
                          className="
                            h-full
                            bg-gradient-to-r
                            from-purple-500
                            to-cyan-400
                            rounded-full
                          "
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <p className="text-gray-600 text-xs mt-1">
                        {percentage.toFixed(
                          1
                        )}
                        %
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;