const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors');
const request = require('request');

const passport = require('passport');
const mongoose = require("mongoose");

const methodOverride = require('method-override');

const userRoutes = require("./api/routes/user");
const projectRoutes = require("./api/routes/projects");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const uploadRoutes = require("./api/routes/upload");

// Middleware
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// MongoDB connection
mongoose.Promise = global.Promise;

const mongoURI = 'mongodb://localhost:27017/modsv2';

const debugDB = mongoose.connect(`${mongoURI}`)
        .then(() => console.log(`Connected on ${mongoURI}`))
        .catch((err) => console.log(`Database error: ${err}`));

// Initialize Cors
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Use passport to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./api/config/passport')(passport);

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/projects", projectRoutes)
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/upload", uploadRoutes);

// Index Route
app.get('/', (req, res) => {
  res.render('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html'));
})


// test request 

// test = request.get('https://rotterdam.tcbmedia.eu/user/3/accounts/')

// app.get('https://rotterdam.tcbmedia.eu/user/3/accounts/', (req,res, next) => {
//   console.log(req);
// });
// // console.log(test)
//Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
