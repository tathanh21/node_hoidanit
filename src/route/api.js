const express = require("express");
import apiController from '../controller/apiController';
// import connection from '../configs/connectDb';
let router = express.Router();
const initApiRoute = (app) => {
    router.get('/users', apiController.getAllUsers)
    router.post('/create-user', apiController.createNewUser)
    router.put('/update-user', apiController.updateUser)
    router.delete('/delete-user/:id', apiController.deleteUser)

    return app.use('/api/v1/', router);
}

module.exports = initApiRoute;