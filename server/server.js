const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const connString = process.env.ATLAS_URI;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(connString, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true    
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});