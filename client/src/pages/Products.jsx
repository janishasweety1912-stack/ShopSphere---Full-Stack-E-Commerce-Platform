import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Products() {
  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS FROM MONGODB
  // ==========================================

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
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data);
      } catch (error) {
        console.error(
          "Fetch products error:",
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

  // ==========================================
  // GET UNIQUE CATEGORIES FROM DATABASE
  // ==========================================

  const categories = [
    "all",
    ...new Set(
      products
        .map((product) =>
          product.category?.toLowerCase()
        )
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter(
    (product) => {
      const productName =
        product.name?.toLowerCase() || "";

      const productCategory =
        product.category?.toLowerCase() || "";

      const searchMatch =
        productName.includes(
          search.toLowerCase()
        );

      const categoryMatch =
        category === "all" ||
        productCategory === category;

      return (
        searchMatch &&
        categoryMatch
      );
    }
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="
          min-h-screen
          bg-[#020617]
          flex
          items-center
          justify-center
        ">
          <div className="text-center">

            <div className="
              w-10
              h-10
              border-4
              border-cyan-400
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-4
            " />

            <p className="
              text-gray-400
              text-lg
            ">
              Loading products...
            </p>

          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <>
        <Navbar />

        <div className="
          min-h-screen
          bg-[#020617]
          flex
          items-center
          justify-center
          px-6
        ">
          <div className="text-center">

            <p className="
              text-red-400
              text-xl
              mb-4
            ">
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

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Navbar />

      <div className="
        bg-[#020617]
        min-h-screen
        px-6
        py-10
      ">

        <div className="
          max-w-7xl
          mx-auto
        ">

          {/* TITLE */}

          <h1 className="
            text-4xl
            font-bold
            text-cyan-400
            text-center
            mb-10
          ">
            All Products
          </h1>

          {/* SEARCH + CATEGORY */}

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-5
            mb-8
          ">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                flex-1
                bg-[#111827]
                border
                border-cyan-400/20
                rounded-xl
                px-5
                py-3
                text-white
                outline-none
                focus:border-cyan-400
              "
            />

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                bg-[#111827]
                border
                border-cyan-400/20
                rounded-xl
                px-5
                py-3
                text-white
                outline-none
              "
            >

              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#111827]"
                  >
                    {item === "all"
                      ? "ALL"
                      : item.toUpperCase()}
                  </option>
                )
              )}

            </select>

          </div>

          {/* PRODUCT COUNT */}

          <p className="
            text-gray-500
            mb-5
          ">
            {filteredProducts.length}{" "}
            product
            {filteredProducts.length !== 1
              ? "s"
              : ""}
          </p>

          {/* PRODUCTS */}

          {filteredProducts.length === 0 ? (
            <div className="
              text-center
              py-20
            ">

              <p className="
                text-gray-400
                text-xl
              ">
                No products found
              </p>

            </div>
          ) : (
            <div className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              gap-6
            ">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                )
              )}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Products;