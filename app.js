const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const catagoryRoute = require("./routes/catagory.route");
const storeRoute = require("./routes/stor.route");
const supplierRoute = require("./routes/supplier.route");
const stokeRoute = require("./routes/stoke.route");
const userRoute = require("./routes/singup.route")

//middlewares
app.use(express.json());
app.use(cors());

// product routes
app.use("/api/v1/product", productRoute);
// brand routes
app.use("/api/v1/brand", brandRoute);
// catagory routes
app.use("/api/v1/catagory", catagoryRoute);
// store routes
app.use("/api/v1/store", storeRoute);
// supplier routes
app.use("/api/v1/supplier", supplierRoute)
// stoke routes
app.use("/api/v1/stoke",stokeRoute)
// user routes
app.use("/api/v1/user",userRoute)

module.exports = app;
