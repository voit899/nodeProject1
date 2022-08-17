const express = require ("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express();
dotenv.config({path: '.env'});
const port = process.env.PORT;
const url = process.env.URL;

app.listen(port, "localhost", () => {
    console.log(`listening on ${port}`)
})
