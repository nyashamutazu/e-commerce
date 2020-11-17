const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require("dotenv").config();
require("./auth/passport");

const port = process.env.PORT || 8000;
const production = process.env.NODE_ENV === "production";

// Routes
const indexRoutes = require("./routes/index");

const app = express();

app.use("/api", indexRoutes);

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(response => {
    console.log("Starting app on port: " + port);
  })
  .catch(err => {
    console.log("Failed to connect to DB \n");
    console.log(err)
  });

app.listen(port, () => {});
