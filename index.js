const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

//Middleware to parse JSON with an increased limit (e.g., 20MB)
app.use(bodyParser.json({ limit: "5mb" }));

//Importing Models
const Info = require("./models/profile");

//Getting Database connection string
const connectionString = process.env.DATABASE_CONNECTION_STRING;

//Express Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Simple Web App Test</h1>");
});

//Posting Data to the database
app.post("/info", async (req, res) => {
  try {
    const info = await Info.create(req.body);
    res.status(200).json(info);
    res.send(console.log(info));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Getting All data from the Database
app.get("/info", async (req, res) => {
  try {
    const info = await Info.find({});
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Deleting Data from DataBase
app.delete("/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = await Info.findByIdAndDelete(id);

    if (!info) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({ message: "Character Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(() => {
    console.log("Failed to connect to the database");
  });
