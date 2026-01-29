const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./db/config");
const authRoute = require("./routers/auth");

const Port = process.env.PORT;

dbConnection();

app.use(express.json());

app.use("/api", authRoute);

app.listen(Port, () => console.log("server start"));
