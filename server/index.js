const express = require("express");
const sequelize = require("./db");
const cors = require("cors");

// Routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

const app = express();

// Extra extensions
app.use(cors());
app.use(express.json());

// Add routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// sync the database
sequelize.sync().then(() => {
  console.log("Database & tables created!");

  // start the server only after syncing
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});