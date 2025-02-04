const express = require("express");
const app = new express();

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

require("dotenv").config();
require("./db/connection");

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/employee", employeeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
