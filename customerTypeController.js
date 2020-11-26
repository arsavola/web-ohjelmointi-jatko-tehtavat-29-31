'use strict'

// npm install mysql --save
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // Note! Do not use root credentials in production!
  password : '',
  database : 'customer'
});

module.exports = 
{
    fetchAll: function(req, res){
      console.log("query (GET): ", req.query);

      let query = 'SELECT * FROM asiakastyyppi WHERE 1=1';

      connection.query(query, function(error, results, fields){
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            if ( error ){
              console.log("Error fetching data from db, reason: " + error);
              res.statusCode = 400;
              //res.send(error);
              res.send({code: "NOT OK", error_msg : error, data : ""});
            }
            else
            {
              // console.log("Data = " + JSON.stringify(results));
              console.log("Data = ", results);
              // console.log("Data = " + results);
              res.statusCode = 200;
              // res.send(results);
              res.send({code: "OK", error_msg : "", data : results});
            }
        });
        console.log("select tehty!");
    },

    // Alla olevia ei ole testattu
    fetchOne: function(req, res){

      console.log("params (GET one): " + JSON.stringify(req.params));
      res.send({STATUS: "well done"});
    },

    create: function(req, res){
      console.log("------------------");
      console.log("CREATE");

        console.log("body : " + JSON.stringify(req.body));
        let c = req.body;

        // php : name = my_real_escape(c.Nimi)

        connection.query('INSERT INTO Asiakas (Nimi, Osoite, Postinro, Postitmp, Luontipvm, Asty_avain) VALUES (?, ?, ?, ?, CURDATE(), ?)', [c.Nimi, c.Osoite, c.Postinro, c.Postitmp, c.Asty_avain],
          function(error, results, fields){
          if ( error ){
            console.log("Error when inserting data to db, reason: " + error);
            res.json(error);
          }
          else
          {
            console.log("Data = " + JSON.stringify(results));
            res.statusCode = 201;
            c.Avain = results.insertId;
            res.json(c);
          }
      });
    },

    update: function(req, res){
      console.log("------------------");
      console.log("UPDATE");
      console.log("body: " + JSON.stringify(req.body));
      console.log("params: " + JSON.stringify(req.params));

      res.statusCode = 204;
      res.send();
  },

  delete : function (req, res) {
      console.log("------------------");
      console.log("DELETE");
      console.log("params: " + JSON.stringify(req.params));

      res.statusCode = 204; // No content
      res.send();
  }
}
