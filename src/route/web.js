const express = require("express");
import homeController from '../controller/homeController';
// import connection from '../configs/connectDb';
let router = express.Router();
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailpage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:id', homeController.getEditPage)
    router.post('/update-user', homeController.updateUser)

    return app.use('/', router);
}

module.exports = initWebRoute;