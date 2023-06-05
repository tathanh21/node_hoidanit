const express = require("express");
import homeController from '../controller/homeController';
let router = express.Router();
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    return app.use('/', router);
}

module.exports = initWebRoute;