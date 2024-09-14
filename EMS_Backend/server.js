const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const employee = require("./routes/employee");
const department = require("./routes/department");

mongoose
  .connect(
    "mongodb+srv://sachilaawandya:sachila20000816@cluster0.jpluo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use("/api/employee", employee);

app.use("/api/department", department);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
