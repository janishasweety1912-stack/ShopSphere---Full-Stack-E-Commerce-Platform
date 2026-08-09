import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Package,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import AdminToast from "./AdminToast";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  // =====================================================
  // CATEGORY STRUCTURE
  // =====================================================

  const categoryOptions = {
    Men: {
      Shoes: [
        "Sneakers",
        "Sports Shoes",
        "Formal Shoes",
        "Casual Shoes",
        "Boots",
      ],
      Clothing: [
        "T-Shirts",
        "Shirts",
        "Jeans",
        "Trousers",
        "Jackets",
      ],
      Accessories: [
        "Watches",
        "Belts",
        "Wallets",
        "Sunglasses",
      ],
    },

    Women: {
      Shoes: [
        "Heels",
        "Sneakers",
        "Flats",
        "Sandals",
        "Boots",
      ],
      Clothing: [
        "Dresses",
        "Tops",
        "Jeans",
        "Skirts",
        "Jackets",
      ],
      Accessories: [
        "Handbags",
        "Watches",
        "Jewellery",
        "Sunglasses",
      ],
    },

    Electronics: {
      Mobiles: [
        "Smartphones",
        "Feature Phones",
      ],
      Laptops: [
        "Gaming Laptops",
        "Business Laptops",
        "Student Laptops",
      ],
      Accessories: [
        "Headphones",
        "Chargers",
        "Power Banks",
        "Keyboards",
        "Mouse",
      ],
    },

    Footwear: {
      Sports: [
        "Running Shoes",
        "Training Shoes",
        "Cricket Shoes",
        "Football Shoes",
      ],
      Casual: [
        "Sneakers",
        "Loafers",
        "Canvas Shoes",
      ],
      Formal: [
        "Formal Shoes",
        "Oxford Shoes",
        "Derby Shoes",
      ],
    },
  };

  // =====================================================
  // PRODUCT STATE
  // =====================================================

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    productType: "",
    price: "",
    discount: "0",
    rating: "0",
    stock: "0",
    image: "",
    description: "",
  });

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  // =====================================================
  // AVAILABLE SUB CATEGORIES
  // =====================================================

  const availableSubCategories =
    product.category &&
    categoryOptions[product.category]
      ? Object.keys(categoryOptions[product.category])
      : [];

  // =====================================================
  // AVAILABLE PRODUCT TYPES
  // =====================================================

  const availableProductTypes =
    product.category &&
    product.subCategory &&
    categoryOptions[product.category]?.[
      product.subCategory
    ]
      ? categoryOptions[product.category][
          product.subCategory
        ]
      : [];

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
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetching(true);

        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load product"
          );
        }

        setProduct({
          name: data.name || "",
          brand: data.brand || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          productType: data.productType || "",
          price: data.price ?? "",
          discount: data.discount ?? "0",
          rating: data.rating ?? "0",
          stock: data.stock ?? "0",
          image: data.image || "",
          description: data.description || "",
        });

        setColors(data.colors || []);

        setImagePreview(
          data.image || ""
        );
      } catch (error) {
        console.error(
          "Fetch product error:",
          error
        );

        showToast(
          error.message ||
            "Failed to load product",
          "error"
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));

    // When category changes,
    // reset sub category and product type

    if (name === "category") {
      setProduct((previous) => ({
        ...previous,
        category: value,
        subCategory: "",
        productType: "",
      }));
    }

    // When sub category changes,
    // reset product type

    if (name === "subCategory") {
      setProduct((previous) => ({
        ...previous,
        subCategory: value,
        productType: "",
      }));
    }
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast(
        "Please select a valid image",
        "error"
      );

      return;
    }

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  // =====================================================
  // ADD COLOR
  // =====================================================

  const addColor = () => {
    const color = colorInput.trim();

    if (!color) return;

    if (
      colors.some(
        (item) =>
          item.toLowerCase() ===
          color.toLowerCase()
      )
    ) {
      showToast(
        "Color already added",
        "error"
      );

      return;
    }

    setColors((previous) => [
      ...previous,
      color,
    ]);

    setColorInput("");
  };

  // =====================================================
  // REMOVE COLOR
  // =====================================================

  const removeColor = (colorToRemove) => {
    setColors((previous) =>
      previous.filter(
        (color) =>
          color !== colorToRemove
      )
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name.trim() ||
      !product.brand.trim() ||
      !product.category ||
      !product.subCategory ||
      !product.productType
    ) {
      showToast(
        "Please fill all required fields",
        "error"
      );

      return;
    }

    if (
      !product.price ||
      Number(product.price) <= 0
    ) {
      showToast(
        "Please enter a valid price",
        "error"
      );

      return;
    }

    try {
      setLoading(true);

      let imageUrl = product.image;

      // =================================================
      // UPLOAD NEW IMAGE
      // =================================================

      if (imageFile) {
        const imageData = new FormData();

        imageData.append(
          "image",
          imageFile
        );

        const uploadResponse =
          await fetch(
            `${API_URL}/api/upload`,
            {
              method: "POST",
              body: imageData,
            }
          );

        const uploadResult =
          await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.message ||
              "Image upload failed"
          );
        }

        imageUrl =
          uploadResult.imageUrl;
      }

      // =================================================
      // ADMIN TOKEN
      // =================================================

      const token =
        localStorage.getItem(
          "adminToken"
        );

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      // =================================================
      // UPDATE PRODUCT
      // =================================================

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: product.name.trim(),

            brand:
              product.brand.trim(),

            category:
              product.category,

            subCategory:
              product.subCategory,

            productType:
              product.productType,

            price:
              Number(product.price),

            discount:
              Number(product.discount) || 0,

            rating:
              Number(product.rating) || 0,

            stock:
              Number(product.stock) || 0,

            image: imageUrl,

            description:
              product.description.trim(),

            colors,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update product"
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      showToast(
        "Product updated successfully",
        "success"
      );

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      showToast(
        error.message ||
          "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (fetching) {
    return (
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
          ">
            Loading product...
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
          items-center
          gap-4
          mb-8
        ">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
            className="
              w-10
              h-10
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
          >
            <ArrowLeft size={20} />
          </button>

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
                bg-purple-500/10
                flex
                items-center
                justify-center
              ">
                <Package
                  size={22}
                  className="
                    text-purple-400
                  "
                />
              </div>

              <h1 className="
                text-3xl
                font-bold
                text-white
              ">
                Edit Product
              </h1>

            </div>

            <p className="
              text-gray-400
              mt-2
            ">
              Update your ShopSphere
              product details
            </p>

          </div>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="
            xl:col-span-1
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-6
            h-fit
          ">

            <h2 className="
              text-lg
              font-semibold
              text-white
              mb-5
            ">
              Product Image
            </h2>

            <label className="
              block
              cursor-pointer
            ">

              <div className="
                aspect-square
                rounded-2xl
                border-2
                border-dashed
                border-gray-700
                hover:border-cyan-400/50
                bg-[#020617]
                overflow-hidden
                flex
                items-center
                justify-center
                transition
              ">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="
                    text-center
                    px-6
                  ">

                    <ImageIcon
                      size={48}
                      className="
                        text-gray-600
                        mx-auto
                        mb-4
                      "
                    />

                    <p className="
                      text-gray-300
                      font-medium
                    ">
                      Upload product image
                    </p>

                    <p className="
                      text-gray-500
                      text-sm
                      mt-2
                    ">
                      PNG, JPG or WEBP
                    </p>

                  </div>
                )}

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {imageFile && (
              <div className="
                mt-4
                flex
                items-center
                gap-2
                text-sm
                text-gray-400
              ">

                <Upload
                  size={16}
                  className="
                    text-cyan-400
                  "
                />

                <span className="truncate">
                  {imageFile.name}
                </span>

              </div>
            )}

            <p className="
              text-xs
              text-gray-500
              mt-4
            ">
              Select a new image only if
              you want to replace the
              existing one.
            </p>

          </div>

          {/* =================================================
              PRODUCT DETAILS
          ================================================= */}

          <div className="
            xl:col-span-2
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-6
          ">

            <h2 className="
              text-lg
              font-semibold
              text-white
              mb-6
            ">
              Product Details
            </h2>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="admin-label">
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="admin-input"
                  required
                />

              </div>

              {/* BRAND */}

              <div>

                <label className="admin-label">
                  Brand *
                </label>

                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="e.g. Nike"
                  className="admin-input"
                  required
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="admin-label">
                  Category *
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="admin-input"
                  required
                >

                  <option
                    value=""
                    className="bg-[#020617]"
                  >
                    Select Category
                  </option>

                  {Object.keys(
                    categoryOptions
                  ).map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-[#020617]"
                    >
                      {category}
                    </option>
                  ))}

                </select>

              </div>

              {/* SUB CATEGORY */}

              <div>

                <label className="admin-label">
                  Sub Category *
                </label>

                <select
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleChange}
                  disabled={
                    !product.category
                  }
                  className="
                    admin-input
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                  required
                >

                  <option
                    value=""
                    className="bg-[#020617]"
                  >
                    Select Sub Category
                  </option>

                  {availableSubCategories.map(
                    (subCategory) => (
                      <option
                        key={subCategory}
                        value={subCategory}
                        className="bg-[#020617]"
                      >
                        {subCategory}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* PRODUCT TYPE */}

              <div>

                <label className="admin-label">
                  Product Type *
                </label>

                <select
                  name="productType"
                  value={product.productType}
                  onChange={handleChange}
                  disabled={
                    !product.subCategory
                  }
                  className="
                    admin-input
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                  required
                >

                  <option
                    value=""
                    className="bg-[#020617]"
                  >
                    Select Product Type
                  </option>

                  {availableProductTypes.map(
                    (productType) => (
                      <option
                        key={productType}
                        value={productType}
                        className="bg-[#020617]"
                      >
                        {productType}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* PRICE */}

              <div>

                <label className="admin-label">
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="admin-input"
                  required
                />

              </div>

              {/* DISCOUNT */}

              <div>

                <label className="admin-label">
                  Discount (%)
                </label>

                <input
                  type="number"
                  name="discount"
                  min="0"
                  max="100"
                  value={product.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className="admin-input"
                />

              </div>

              {/* RATING */}

              <div>

                <label className="admin-label">
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={product.rating}
                  onChange={handleChange}
                  placeholder="0"
                  className="admin-input"
                />

              </div>

              {/* STOCK */}

              <div>

                <label className="admin-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="admin-input"
                />

              </div>

              {/* COLORS */}

              <div className="md:col-span-2">

                <label className="admin-label">
                  Colors
                </label>

                <div className="
                  flex
                  gap-3
                ">

                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) =>
                      setColorInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        e.preventDefault();
                        addColor();
                      }
                    }}
                    placeholder="e.g. Black"
                    className="
                      admin-input
                      flex-1
                    "
                  />

                  <button
                    type="button"
                    onClick={addColor}
                    className="
                      px-4
                      rounded-xl
                      bg-purple-500/10
                      border
                      border-purple-500/20
                      text-purple-400
                      hover:bg-purple-500/20
                      transition
                    "
                  >
                    <Plus size={20} />
                  </button>

                </div>

                {colors.length > 0 && (
                  <div className="
                    flex
                    flex-wrap
                    gap-2
                    mt-3
                  ">

                    {colors.map(
                      (color) => (
                        <span
                          key={color}
                          className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-lg
                            bg-cyan-400/10
                            border
                            border-cyan-400/20
                            text-cyan-400
                            text-sm
                          "
                        >

                          {color}

                          <button
                            type="button"
                            onClick={() =>
                              removeColor(
                                color
                              )
                            }
                            className="
                              hover:text-red-400
                            "
                          >
                            <X size={14} />
                          </button>

                        </span>
                      )
                    )}

                  </div>
                )}

              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="admin-label">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    product.description
                  }
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  rows="5"
                  className="
                    admin-input
                    resize-none
                  "
                />

              </div>

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="
              flex
              justify-end
              gap-3
              mt-8
              pt-6
              border-t
              border-gray-800
            ">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/products"
                  )
                }
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-gray-800
                  text-gray-300
                  hover:bg-gray-700
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-400
                  to-purple-500
                  text-[#020617]
                  font-bold
                  hover:opacity-90
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >

                {loading ? (
                  <>
                    <span className="
                      w-5
                      h-5
                      border-2
                      border-[#020617]
                      border-t-transparent
                      rounded-full
                      animate-spin
                    " />

                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />

                    Update Product
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </div>

      {/* =================================================
          TOAST
      ================================================= */}

      <AdminToast
        message={toast.message}
        type={toast.type}
      />

      {/* =================================================
          INPUT STYLES
      ================================================= */}

      <style>{`
        .admin-label {
          display: block;
          color: #d1d5db;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .admin-input {
          width: 100%;
          background: #020617;
          border: 1px solid #374151;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: white;
          outline: none;
          transition: 0.2s;
        }

        .admin-input::placeholder {
          color: #6b7280;
        }

        .admin-input:focus {
          border-color: #22d3ee;
          box-shadow:
            0 0 0 1px
            rgba(34, 211, 238, 0.15);
        }

        .admin-input option {
          background: #020617;
          color: white;
        }
      `}</style>
    </>
  );
}

export default AdminEditProduct;