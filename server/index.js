const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

// sync the database
sequelize.sync().then(() => {
  console.log("Database & tables created!");

  // start the server only after syncing
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});