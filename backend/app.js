const express = require("express");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PostRoutes = require('./routes/posts');

const app = express();

mongoose
  .connect(
    "mongodb+srv://prodip:KfmHvi57QIRaTusS@cluster0.uf9au.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.error("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", PostRoutes);

module.exports = app;
