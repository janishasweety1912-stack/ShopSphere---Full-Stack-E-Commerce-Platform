require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const productRoutes=require("./routes/productRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const orderRoutes=require("./routes/orderRoutes");

app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/orders",orderRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});