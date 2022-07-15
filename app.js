const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const password = require("./config/password");

const user = require("./models/Users");
const routes = require("./routes/index");
require('dotenv').config({path:'.env'})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true,})

const db = mongoose.connection;
    db.once('open', _ => {
    console.log('db is connected');
})

db.on('error', err => {
    console.log(err);
})

app.use("/api", routes);

app.use(express.static(__dirname + '/favicon.ico'))

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

app.listen(port, host, () => {
    console.log("Server is running correctly");
})





