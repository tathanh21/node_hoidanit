import pool from "../configs/connectDb";
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
module.exports = {
    getHomepage, getDetailpage
}