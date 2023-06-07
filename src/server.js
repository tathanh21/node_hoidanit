const express = require('express')
// import { Express } from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initApiRoute from './route/api';
// import connection from './configs/connectDb';

const path = require('path');
require('dotenv').config()


const app = express()
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// set up view engine
configViewEngine(app);

//init web route
initWebRoute(app)

//init the api
initApiRoute(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})