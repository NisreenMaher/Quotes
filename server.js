require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongoDb = require("./config/dbConn");

app.set("view engine", "ejs");
mongoDb.connectToServer(function(err) {
    // built-in middleware to handle urlencoded form data
    app.use(express.urlencoded({ extended: false }));
    // built-in middleware for json
    app.use(express.json());
    app.use(bodyParser.json());
    //serve static files
    app.use("/", express.static(path.join(__dirname, "/public")));
    // routes

    app.use("/", require("./routes"));
    app.listen(3000, function() {
        console.log("listening on 3000");
    });
});