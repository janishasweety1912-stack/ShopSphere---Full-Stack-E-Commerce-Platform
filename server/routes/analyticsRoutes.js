const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    // =====================================================
    // BASIC COUNTS
    // =====================================================

    const [
      totalOrders,
      totalUsers,
      totalProducts,
      orderPlaced,
      pending,
      shipped,
      delivered,
      cancelled,
      revenueResult,
    ] = await Promise.all([
      Order.countDocuments(),

      User.countDocuments(),

      Product.countDocuments(),

      Order.countDocuments({
        status: "Order Placed",
      }),

      Order.countDocuments({
        status: "Pending",
      }),

      Order.countDocuments({
        status: "Shipped",
      }),

      Order.countDocuments({
        status: "Delivered",
      }),

      Order.countDocuments({
        status: "Cancelled",
      }),

      // Revenue excludes cancelled orders
      Order.aggregate([
        {
          $match: {
            status: {
              $ne: "Cancelled",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

    // =====================================================
    // TOTAL REVENUE
    // =====================================================

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // =====================================================
    // AVERAGE ORDER VALUE
    // =====================================================

    const nonCancelledOrders =
      totalOrders - cancelled;

    const averageOrderValue =
      nonCancelledOrders > 0
        ? totalRevenue / nonCancelledOrders
        : 0;

    // =====================================================
    // MONTHLY ANALYTICS
    // LAST 6 MONTHS
    // =====================================================

    const monthlyResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },

          revenue: {
            $sum: "$totalAmount",
          },

          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Create the last 6 calendar months
    const monthlyAnalytics = [];

    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const monthNumber = date.getMonth() + 1;

      const monthKey = `${year}-${String(
        monthNumber
      ).padStart(2, "0")}`;

      const existingMonth = monthlyResult.find(
        (item) =>
          item._id.year === year &&
          item._id.month === monthNumber
      );

      monthlyAnalytics.push({
        month: monthKey,
        revenue: existingMonth
          ? existingMonth.revenue
          : 0,
        orders: existingMonth
          ? existingMonth.orders
          : 0,
      });
    }

    // =====================================================
    // TOP SELLING PRODUCTS
    // =====================================================

    const topProducts = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },

      // Products are embedded inside each order
      {
        $unwind: "$products",
      },

      {
        $group: {
          _id: "$products.name",

          quantity: {
            $sum: "$products.quantity",
          },

          revenue: {
            $sum: {
              $multiply: [
                "$products.price",
                "$products.quantity",
              ],
            },
          },

          image: {
            $first: "$products.image",
          },
        },
      },

      {
        $sort: {
          quantity: -1,
        },
      },

      {
        $limit: 5,
      },

      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: 1,
          revenue: 1,
          image: 1,
        },
      },
    ]);

    // =====================================================
    // PAYMENT METHODS
    // =====================================================

    const paymentResult = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const paymentMethods = {};

    paymentResult.forEach((item) => {
      const method =
        item._id || "Unknown";

      paymentMethods[method] = item.count;
    });

    // =====================================================
    // SEND RESPONSE
    // =====================================================

    res.json({
      success: true,

      summary: {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts,
        averageOrderValue,
      },

      orderStatus: {
        orderPlaced,
        pending,
        shipped,
        delivered,
        cancelled,
      },

      monthlyAnalytics,

      topProducts,

      paymentMethods,
    });
  } catch (error) {
    console.error(
      "ANALYTICS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;