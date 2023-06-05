import connection from "../configs/connectDb";
let getHomepage = (req, res) => {
    //logic.

    // simple query
    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            console.log("check mysql");
            console.log(results); // results contains rows returned by server
            data = results.map((row) => { return row });
            // console.log(fields); // fields contains extra meta data about results, if available
            return res.render('index.ejs', { dataUser: JSON.stringify(data) });

        }
    );
}

module.exports = {
    getHomepage
}