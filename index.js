const express = require('express');
const dotenv = require("dotenv").config();
const connectDB = require("./connect/database");
const port = process.env.PORT;
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json());


app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use("/api",require("./routes/devedor-route"))

app.use("/api",require("./routes/credor-route"))

app.use('/api',require('./routes/geral-route')); 

app.listen(port,() => console.log(`Listening on http://localhost:${port}`));