const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================================
// GET PRODUCTS BY CATEGORY + PRODUCT TYPE
// Example:
// /api/products/category/footwear/sports-shoes
// =====================================================

router.get(
  "/category/:category/:productType",
  async (req, res) => {
    try {
      const category = req.params.category
        .trim()
        .toLowerCase();

      const productType = req.params.productType
        .trim()
        .toLowerCase();

      const products = await Product.find({
        category: category,
        productType: productType,
      }).sort({
        createdAt: -1,
      });

      res.json(products);
    } catch (error) {
      console.error(
        "Get category products error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get single product error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================================
// ADD PRODUCT
// =====================================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        brand,
        category,
        subCategory,
        productType,
        price,
        discount,
        rating,
        stock,
        image,
        description,
        colors,
      } = req.body;

      if (
        !name ||
        !brand ||
        !category ||
        !subCategory ||
        !productType ||
        !price ||
        !image
      ) {
        return res.status(400).json({
          message:
            "Please provide all required product fields",
        });
      }

      const product = new Product({
        name: name.trim(),
        brand: brand.trim(),

        category: category
          .trim()
          .toLowerCase(),

        subCategory: subCategory
          .trim()
          .toLowerCase(),

        productType: productType
          .trim()
          .toLowerCase(),

        price: Number(price),

        discount:
          Number(discount) || 0,

        rating:
          Number(rating) || 0,

        stock:
          Number(stock) || 0,

        image,

        description:
          description?.trim() || "",

        colors: colors || [],
      });

      await product.save();

      res.status(201).json({
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      console.error(
        "Add product error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (updateData.category) {
        updateData.category =
          updateData.category
            .trim()
            .toLowerCase();
      }

      if (updateData.subCategory) {
        updateData.subCategory =
          updateData.subCategory
            .trim()
            .toLowerCase();
      }

      if (updateData.productType) {
        updateData.productType =
          updateData.productType
            .trim()
            .toLowerCase();
      }

      if (updateData.name) {
        updateData.name =
          updateData.name.trim();
      }

      if (updateData.brand) {
        updateData.brand =
          updateData.brand.trim();
      }

      if (updateData.description) {
        updateData.description =
          updateData.description.trim();
      }

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message:
          "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message:
          "Product deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;