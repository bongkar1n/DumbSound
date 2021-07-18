require("dotenv").config();
const express = require('express')
const router = require("./src/routers/router")

const cors = require("cors");

const app = express()
app.use(express.json());

app.use(cors());
const port = 7000

app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"))

app.listen(port, () => {
  console.log(`you are listening at http://localhost:${port}`)})