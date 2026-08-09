import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Trash2,
  Edit,
  Plus,
  Package,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import AdminToast from "./AdminToast";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });


  // =====================================================
  // API URL
  // =====================================================

  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com/api/products";


  // =====================================================
  // SHOW TOAST
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
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load products"
        );
      }

      setProducts(data);

    } catch (error) {
      console.error(
        "Fetch products error:",
        error
      );

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  useEffect(() => {
    fetchProducts();
  }, []);


  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

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
          "Failed to delete product"
        );
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== id
        )
      );

      showToast(
        "Product deleted successfully",
        "success"
      );

    } catch (error) {
      console.error(
        "Delete product error:",
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
  // SEARCH
  // =====================================================

  const filteredProducts =
    products.filter((product) => {

      const searchText =
        search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(searchText) ||

        product.brand
          ?.toLowerCase()
          .includes(searchText) ||

        product.category
          ?.toLowerCase()
          .includes(searchText) ||

        product.subCategory
          ?.toLowerCase()
          .includes(searchText)
      );
    });


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <>

        <AdminToast
          message={toast.message}
          type={toast.type}
        />

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

        <AdminToast
          message={toast.message}
          type={toast.type}
        />

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
              className="
                text-red-400
              "
            />

            <h2 className="
              text-white
              font-semibold
            ">
              Unable to load products
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
            onClick={fetchProducts}
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

      </>
    );
  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <>

      <AdminToast
        message={toast.message}
        type={toast.type}
      />


      <div className="
        min-h-screen
        bg-gradient-to-br
        from-[#020617]
        via-[#020617]
        to-purple-950/20
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          flex
          flex-col
          sm:flex-row
          justify-between
          items-start
          sm:items-center
          gap-4
          mb-8
        ">


          <div>

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-cyan-400/10
                flex
                items-center
                justify-center
              ">

                <Package
                  size={22}
                  className="
                    text-cyan-400
                  "
                />

              </div>


              <h1 className="
                text-3xl
                font-bold
                text-white
              ">
                Products
              </h1>

            </div>


            <p className="
              text-gray-400
              mt-3
            ">
              Manage your ShopSphere products
            </p>

          </div>


          <div className="
            flex
            items-center
            gap-3
          ">


            <button
              onClick={fetchProducts}
              className="
                w-11
                h-11
                rounded-xl
                bg-[#111827]
                border
                border-gray-800
                text-gray-400
                hover:text-white
                hover:border-cyan-400/30
                transition
                flex
                items-center
                justify-center
              "
              title="Refresh products"
            >

              <RefreshCw size={18} />

            </button>


            <Link
              to="/admin/add-product"
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-400
                to-purple-500
                text-[#020617]
                font-semibold
                hover:opacity-90
                transition
                shadow-[0_10px_30px_rgba(168,85,247,0.25)]
              "
            >

              <Plus size={20} />

              Add Product

            </Link>

          </div>

        </div>


        {/* =================================================
            PRODUCT SUMMARY
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mb-6
        ">


          <div className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Total Products
            </p>

            <h2 className="
              text-2xl
              font-bold
              text-white
              mt-1
            ">
              {products.length}
            </h2>

          </div>


          <div className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              In Stock
            </p>

            <h2 className="
              text-2xl
              font-bold
              text-emerald-400
              mt-1
            ">
              {
                products.filter(
                  (product) =>
                    product.stock > 0
                ).length
              }
            </h2>

          </div>


          <div className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-5
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Low Stock
            </p>

            <h2 className="
              text-2xl
              font-bold
              text-orange-400
              mt-1
            ">
              {
                products.filter(
                  (product) =>
                    product.stock <= 5
                ).length
              }
            </h2>

          </div>

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          p-4
          mb-6
          flex
          items-center
          gap-3
        ">

          <Search
            size={20}
            className="
              text-purple-400
              flex-shrink-0
            "
          />


          <input
            type="text"
            placeholder="Search by product, brand or category..."
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


        {/* =================================================
            PRODUCTS TABLE
        ================================================= */}

        <div className="
          bg-[#111827]
          border
          border-gray-800
          rounded-2xl
          overflow-hidden
          shadow-[0_10px_30px_rgba(168,85,247,0.12)]
        ">


          {filteredProducts.length === 0 ? (

            <div className="
              py-16
              text-center
            ">

              <Package
                size={42}
                className="
                  text-gray-600
                  mx-auto
                  mb-4
                "
              />


              <p className="
                text-gray-400
                font-medium
              ">
                {search
                  ? "No products match your search"
                  : "No products available"}
              </p>


              {search && (
                <button
                  onClick={() =>
                    setSearch("")
                  }
                  className="
                    text-cyan-400
                    text-sm
                    mt-2
                    hover:underline
                  "
                >
                  Clear search
                </button>
              )}

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
              ">


                <thead className="
                  bg-[#020617]
                  text-gray-400
                  text-sm
                ">

                  <tr>

                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Image
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Product
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Brand
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Category
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Price
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Stock
                    </th>


                    <th className="
                      p-5
                      text-left
                      font-medium
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredProducts.map(
                    (product) => (

                      <tr
                        key={product._id}
                        className="
                          border-t
                          border-gray-800
                          hover:bg-white/5
                          transition
                        "
                      >


                        {/* IMAGE */}

                        <td className="p-5">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              w-14
                              h-14
                              rounded-xl
                              object-cover
                              border
                              border-gray-800
                            "
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        </td>


                        {/* PRODUCT */}

                        <td className="
                          p-5
                          text-white
                          font-medium
                        ">

                          <div>
                            {product.name}
                          </div>


                          {product.subCategory && (
                            <p className="
                              text-xs
                              text-gray-500
                              mt-1
                            ">
                              {product.subCategory}
                            </p>
                          )}

                        </td>


                        {/* BRAND */}

                        <td className="
                          p-5
                          text-gray-300
                        ">

                          {product.brand || "-"}

                        </td>


                        {/* CATEGORY */}

                        <td className="
                          p-5
                          text-gray-300
                        ">

                          {product.category}

                        </td>


                        {/* PRICE */}

                        <td className="
                          p-5
                        ">

                          <span className="
                            text-cyan-400
                            font-semibold
                          ">
                            ₹
                            {Number(
                              product.price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>


                          {product.discount > 0 && (
                            <p className="
                              text-xs
                              text-emerald-400
                              mt-1
                            ">
                              {product.discount}% off
                            </p>
                          )}

                        </td>


                        {/* STOCK */}

                        <td className="
                          p-5
                        ">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                              ${
                                product.stock === 0
                                  ? "bg-red-500/10 text-red-400"
                                  : product.stock <= 5
                                  ? "bg-orange-500/10 text-orange-400"
                                  : "bg-emerald-500/10 text-emerald-400"
                              }
                            `}
                          >

                            {product.stock === 0
                              ? "Out of Stock"
                              : product.stock <= 5
                              ? `Low: ${product.stock}`
                              : product.stock}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="
                          p-5
                        ">

                          <div className="
                            flex
                            gap-3
                          ">


                            <Link
                              to={`/admin/edit-product/${product._id}`}
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
                              title="Edit product"
                            >

                              <Edit size={18} />

                            </Link>


                            <button
                              onClick={() =>
                                deleteProduct(
                                  product._id
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-lg
                                bg-red-500/10
                                text-red-400
                                hover:bg-red-500/20
                                transition
                                flex
                                items-center
                                justify-center
                              "
                              title="Delete product"
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default AdminProducts;