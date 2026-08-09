import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Mail,
  Calendar,
  Eye,
  X,
} from "lucide-react";
import AdminToast from "./AdminToast";

function AdminUsers() {
  const API_URL =
    "https://shopsphere-full-stack-e-commerce-platform.onrender.com";

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

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
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {
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
        `${API_URL}/api/users`,
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
            "Failed to load users"
        );
      }

      setUsers(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch users error:",
        error
      );

      showToast(
        error.message ||
          "Failed to load users",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredUsers = users.filter(
    (user) => {
      const searchText =
        search.toLowerCase().trim();

      const name =
        user.name?.toLowerCase() || "";

      const email =
        user.email?.toLowerCase() || "";

      return (
        name.includes(searchText) ||
        email.includes(searchText)
      );
    }
  );

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
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
      <>
        <AdminToast
          message={toast.message}
          type={toast.type}
        />

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
              Loading users...
            </p>

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
              <Users
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
              User Management
            </h1>

          </div>

          <p
            className="
              text-gray-400
              mt-2
            "
          >
            Manage ShopSphere registered users
          </p>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
            bg-[#111827]
            border
            border-gray-800
            rounded-2xl
            p-4
            mb-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Search
              size={20}
              className="text-purple-400"
            />

            <input
              type="text"
              placeholder="Search by name or email..."
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

        </div>

        {/* =================================================
            USER COUNT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
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
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-gray-500
                    text-sm
                  "
                >
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
                  {users.length}
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
                <Users
                  size={22}
                  className="text-cyan-400"
                />
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
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-gray-500
                    text-sm
                  "
                >
                  Search Results
                </p>

                <p
                  className="
                    text-2xl
                    font-bold
                    text-white
                    mt-1
                  "
                >
                  {filteredUsers.length}
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
                <Search
                  size={22}
                  className="text-purple-400"
                />
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            USERS TABLE
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

          {filteredUsers.length === 0 ? (

            <div
              className="
                py-16
                text-center
              "
            >

              <Users
                size={48}
                className="
                  text-gray-700
                  mx-auto
                  mb-4
                "
              />

              <p className="text-gray-400">
                No users found
              </p>

              {search && (
                <p
                  className="
                    text-gray-600
                    text-sm
                    mt-2
                  "
                >
                  Try a different name or email.
                </p>
              )}

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

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      User
                    </th>

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      Email
                    </th>

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      Joined
                    </th>

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        p-5
                        text-left
                      "
                    >
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map(
                    (user) => (
                      <tr
                        key={user._id}
                        className="
                          border-t
                          border-gray-800
                          hover:bg-white/5
                          transition
                        "
                      >

                        {/* USER */}

                        <td className="p-5">

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >

                            <div
                              className="
                                w-10
                                h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-cyan-400
                                to-purple-500
                                flex
                                items-center
                                justify-center
                                text-[#020617]
                                font-bold
                              "
                            >
                              {user.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}
                            </div>

                            <div>

                              <p
                                className="
                                  text-white
                                  font-medium
                                "
                              >
                                {user.name ||
                                  "Unnamed User"}
                              </p>

                              <p
                                className="
                                  text-gray-500
                                  text-xs
                                  mt-1
                                "
                              >
                                ID:{" "}
                                {user._id
                                  ?.slice(-8)}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* EMAIL */}

                        <td className="p-5">

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Mail
                              size={16}
                              className="
                                text-purple-400
                              "
                            />

                            <span
                              className="
                                text-gray-300
                                text-sm
                              "
                            >
                              {user.email ||
                                "No email"}
                            </span>

                          </div>

                        </td>

                        {/* JOINED */}

                        <td className="p-5">

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Calendar
                              size={16}
                              className="
                                text-cyan-400
                              "
                            />

                            <span
                              className="
                                text-gray-300
                                text-sm
                              "
                            >
                              {formatDate(
                                user.createdAt
                              )}
                            </span>

                          </div>

                        </td>

                        {/* STATUS */}

                        <td className="p-5">

                          <span
                            className="
                              inline-flex
                              items-center
                              px-3
                              py-1.5
                              rounded-lg
                              bg-emerald-400/10
                              border
                              border-emerald-400/20
                              text-emerald-400
                              text-xs
                              font-medium
                            "
                          >
                            Active
                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="p-5">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedUser(
                                user
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
                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* =================================================
          USER DETAILS MODAL
      ================================================= */}

      {selectedUser && (
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
              max-w-lg
              bg-[#111827]
              border
              border-gray-800
              rounded-2xl
              shadow-2xl
              overflow-hidden
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
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
                  User Details
                </h2>

                <p
                  className="
                    text-gray-500
                    text-sm
                    mt-1
                  "
                >
                  Customer information
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
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

            {/* MODAL BODY */}

            <div className="p-6">

              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-center
                  mb-6
                "
              >

                <div
                  className="
                    w-20
                    h-20
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400
                    to-purple-500
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    text-[#020617]
                  "
                >
                  {selectedUser.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "U"}
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-white
                    mt-4
                  "
                >
                  {selectedUser.name ||
                    "Unnamed User"}
                </h3>

                <p
                  className="
                    text-gray-500
                    text-sm
                    mt-1
                  "
                >
                  {selectedUser.email ||
                    "No email"}
                </p>

              </div>

              <div className="space-y-4">

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
                      text-gray-500
                      text-xs
                      mb-1
                    "
                  >
                    User ID
                  </p>

                  <p
                    className="
                      text-gray-300
                      text-sm
                      break-all
                    "
                  >
                    {selectedUser._id}
                  </p>

                </div>

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
                      text-gray-500
                      text-xs
                      mb-1
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      text-gray-300
                      text-sm
                    "
                  >
                    {selectedUser.email ||
                      "No email"}
                  </p>

                </div>

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
                      text-gray-500
                      text-xs
                      mb-1
                    "
                  >
                    Registered On
                  </p>

                  <p
                    className="
                      text-gray-300
                      text-sm
                    "
                  >
                    {formatDate(
                      selectedUser.createdAt
                    )}
                  </p>

                </div>

                <div
                  className="
                    bg-[#020617]
                    border
                    border-gray-800
                    rounded-xl
                    p-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-gray-500
                        text-xs
                      "
                    >
                      Account Status
                    </p>

                    <p
                      className="
                        text-emerald-400
                        text-sm
                        font-medium
                        mt-1
                      "
                    >
                      Active
                    </p>

                  </div>

                  <span
                    className="
                      w-3
                      h-3
                      rounded-full
                      bg-emerald-400
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default AdminUsers;