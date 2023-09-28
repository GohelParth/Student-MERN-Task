import express, { urlencoded } from "express";
import cors from "cors";
import { ConnectMongo } from "./src/config/DbConnection";
import { userRoute } from "./src/routes/user.routes";
import { studentRoutes } from "./src/routes/student.routes";

const app = express();
require("dotenv").config();

//Server Port
const PORT = process.env.PORT || 5000;

// Database Configuration
ConnectMongo();

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));

app.use(express.static(__dirname + "/src/uploads"));

// Testing route for server
app.get("/", (req, res) => {
  res.send("Express Server Testing...");
});

// User and Student API Routes
app.use("/user", userRoute);
app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
