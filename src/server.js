const express = require('express')
// import { Express } from 'express';
import configViewEngine from './configs/viewEngine';
const path = require('path');
require('dotenv').config()


const app = express()
const port = process.env.PORT;

console.log("<< port,", port);
configViewEngine(app);


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})