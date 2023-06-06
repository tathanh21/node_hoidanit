const express = require("express");
import homeController from '../controller/homeController';
// import connection from '../configs/connectDb';
let router = express.Router();
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailpage)

    return app.use('/', router);
}

module.exports = initWebRoute;