"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const router_1 = __importDefault(require("./routes/router"));
require("dotenv").config(); // per variabili d'ambiente (.env)
const app = express();
//start listening on port
app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
//register view engine
app.set("view engine", "ejs");
// middleware & static files
app.use(cors());
app.use(express.static("public")); //rende i file nella cartella 'public' pubblici, utile per i css e immagini
app.use(express.urlencoded({ extended: true })); //encoding dell'url, lo rende 'leggibile'
app.use(morgan("dev")); //format dell'output del log delle richieste
app.use(bodyParser.json()); // Per passare dati dal frontend con axios.post
app.use((req, res, next) => {
    res.locals.path = req.path;
    next(); //serve per passare la richieste al prossimo route senza perdere lo stato della richiesta
});
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "false");
    // Pass to next layer of middleware
    next();
});
app.use("/router", router_1.default);
// version
app.get("/version", (req, res) => {
    res.send("1.0.0");
});
// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).send("Resource not found, check if the URL is correct");
});
