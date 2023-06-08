import pool from "../configs/connectDb";
const multer = require('multer');
const path = require('path');
let getHomepage = async (req, res) => {
    //logic.


    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows });
    console.log('check row:', rows)

}

let getDetailpage = async (req, res) => {
    let id = req.params.id;
    let user = await pool.execute(`select * from users where id= ?`, [id]);
    // console.log("check params:", rep.params)
    return res.send(JSON.stringify(user[0]));
}
let createNewUser = async (req, res) => {
    console.log("check rq:", req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName,lastName,email,address) values(?,?,?,?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id=?', [userId]);
    return res.redirect('/');
}
let getEditPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id =?', [userId]);
    // return res.send(JSON.stringify(user));
    return res.render('update.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName=? , lastName=? , email=? , address=? where id=?'
        , [firstName, lastName, email, address, id]);
    return res.redirect('/');
}


let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}
const upload = multer().single('profile_pic');
const uploadMultiple = multer().array('multiple_images');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    // let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            console.log('1');
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            console.log('2');
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            console.log('3');
            return res.send(err);
        }
        else if (err) {
            console.log('4');
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}
let handleUploadMultipleFile = async (req, res) => {
    // uploadMultiple(req, res, function (err) {
    //     if (req.fileValidationError) {
    //         return res.send(req.fileValidationError);
    //     }
    if (req.fileValidationError) {
        console.log('1');
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        console.log('2');
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
    // });
}
module.exports = {
    getHomepage, getDetailpage, createNewUser, deleteUser, getEditPage, updateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFile
}