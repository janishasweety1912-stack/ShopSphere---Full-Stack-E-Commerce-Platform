import { useEffect, useMemo, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

function ProductListing() {
  const {
    category,
    subCategory,
    occasion,
  } = useParams();

  const [searchParams] = useSearchParams();

  const bannerFilter =
    searchParams.get("filter");

  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch products"
          );
        }

        setProducts(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Product listing error:",
          error
        );

        setError(
          error.message ||
            "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setSort("");
    setBrand("");
    setMinRating(0);
    setInStock(false);
    setMaxPrice(5000);
  };

  // =====================================================
  // FORMAT VALUE
  // =====================================================

  const normalizeValue = (value) => {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-");
  };

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // =================================================
    // CATEGORY
    // =================================================

    if (category) {
      result = result.filter(
        (product) =>
          normalizeValue(product.category) ===
          normalizeValue(category)
      );
    }

    // =================================================
    // SUB CATEGORY
    // =================================================

    if (subCategory) {
      result = result.filter((product) => {
        const productSubCategory =
          normalizeValue(
            product.subCategory
          );

        const productTags =
          Array.isArray(product.tags)
            ? product.tags.map((tag) =>
                normalizeValue(tag)
              )
            : [];

        return (
          productSubCategory ===
            normalizeValue(subCategory) ||
          productTags.includes(
            normalizeValue(subCategory)
          )
        );
      });
    }

    // =================================================
    // OCCASION
    // =================================================

    if (occasion) {
      result = result.filter((product) => {
        if (
          !Array.isArray(
            product.occasion
          )
        ) {
          return false;
        }

        return product.occasion.some(
          (item) =>
            normalizeValue(item) ===
            normalizeValue(occasion)
        );
      });
    }

    // =================================================
    // BANNER FILTER
    // =================================================

    if (bannerFilter === "new-arrivals") {
      result = result.filter((product) => {
        const tags =
          Array.isArray(product.tags)
            ? product.tags.map((tag) =>
                normalizeValue(tag)
              )
            : [];

        return (
          product.newArrival === true ||
          product.newArrivals === true ||
          tags.includes("new-arrival") ||
          tags.includes("new-arrivals")
        );
      });
    }

    // =================================================
    // DISCOUNTED PRODUCTS
    // =================================================

    if (bannerFilter === "discount") {
      result = result.filter(
        (product) =>
          Number(product.discount || 0) > 0
      );
    }

    // =================================================
    // TRENDING PRODUCTS
    // =================================================

    if (bannerFilter === "trending") {
      result = result.filter((product) => {
        const tags =
          Array.isArray(product.tags)
            ? product.tags.map((tag) =>
                normalizeValue(tag)
              )
            : [];

        return (
          product.trending === true ||
          tags.includes("trending")
        );
      });
    }

    // =================================================
    // SEARCH
    // =================================================

    if (search.trim()) {
      result = result.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }

    // =================================================
    // BRAND
    // =================================================

    if (brand.trim()) {
      result = result.filter((product) =>
        product.brand
          ?.toLowerCase()
          .includes(
            brand.toLowerCase()
          )
      );
    }

    // =================================================
    // PRICE
    // =================================================

    result = result.filter(
      (product) =>
        Number(product.price || 0) <=
        Number(maxPrice)
    );

    // =================================================
    // RATING
    // =================================================

    if (minRating > 0) {
      result = result.filter(
        (product) =>
          Number(product.rating || 0) >=
          Number(minRating)
      );
    }

    // =================================================
    // STOCK
    // =================================================

    if (inStock) {
      result = result.filter(
        (product) =>
          Number(product.stock || 0) > 0
      );
    }

    // =================================================
    // SORT
    // =================================================

    if (sort === "low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    products,
    category,
    subCategory,
    occasion,
    bannerFilter,
    search,
    brand,
    maxPrice,
    minRating,
    inStock,
    sort,
  ]);

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const formatTitle = (value) => {
    return String(value || "")
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const pageTitle = bannerFilter
    ? bannerFilter === "new-arrivals"
      ? "New Arrivals"
      : bannerFilter === "discount"
      ? "Discount Collection"
      : bannerFilter === "trending"
      ? "Trending Collection"
      : "Products"
    : occasion
    ? `${formatTitle(
        occasion
      )} Collection`
    : subCategory
    ? formatTitle(subCategory)
    : category
    ? `${formatTitle(category)} Collection`
    : "Products";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <>
        <Navbar />

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

            <p className="text-gray-400 text-lg">
              Loading products...
            </p>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <>
        <Navbar />

        <div
          className="
            min-h-screen
            bg-[#020617]
            flex
            items-center
            justify-center
            px-6
          "
        >
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="
                px-5
                py-3
                rounded-xl
                bg-cyan-400
                text-black
                font-bold
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      <main
        className="
          bg-[#020617]
          min-h-screen
          pt-24
          pb-16
          px-4
          sm:px-6
        "
      >
        <div className="max-w-7xl mx-auto">

          {/* ==========================================
              PAGE TITLE
          ========================================== */}

          <div className="mb-8">
            <h1
              className="
                text-2xl
                sm:text-4xl
                font-bold
                text-cyan-400
                capitalize
              "
            >
              {pageTitle}
            </h1>

            <p className="text-gray-500 mt-2">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </p>
          </div>

          {/* ==========================================
              MAIN CONTENT
          ========================================== */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-4
              gap-6
            "
          >
            {/* ========================================
                FILTERS
            ======================================== */}

            <div className="w-full">
              <ProductFilters
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                brand={brand}
                setBrand={setBrand}
                minRating={minRating}
                setMinRating={setMinRating}
                inStock={inStock}
                setInStock={setInStock}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                resetFilters={resetFilters}
              />
            </div>

            {/* ========================================
                PRODUCTS
            ======================================== */}

            <div className="lg:col-span-3 w-full">

              {filteredProducts.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-2
                    md:grid-cols-3
                    xl:grid-cols-4
                    gap-4
                    sm:gap-6
                  "
                >
                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={
                          product._id ||
                          product.id
                        }
                        product={product}
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    min-h-[300px]
                    flex
                    items-center
                    justify-center
                    text-center
                    bg-[#111827]
                    border
                    border-gray-800
                    rounded-2xl
                    p-8
                  "
                >
                  <div>
                    <p className="text-gray-300 text-xl">
                      No products found.
                    </p>

                    <p className="text-gray-500 mt-2">
                      Try changing your filters
                      or browse another collection.
                    </p>

                    <button
                      onClick={resetFilters}
                      className="
                        mt-5
                        px-5
                        py-3
                        rounded-xl
                        bg-cyan-400
                        text-black
                        font-semibold
                        hover:scale-105
                        transition
                      "
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductListing;