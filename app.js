var express = require('express');
var bodyParser=require('body-parser');
var mysql  = require('mysql'); 
var faker= require ('faker');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
//app.set("view engine", "ejs");
var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'join_us'
});



// var data = [];
// for(var i = 0; i < 500; i++){
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ]);
// }

// var q = 'INSERT INTO users (email, create_at) VALUES ?';
 
// connection.query(q, [data], function(err, result) {
//   console.log(err);
//   console.log(result);
// });

app.get("/", function(req, res){
    var q="select count(*) as count from users";
    
    connection.query(q, function(err, results){
        if(err) throw err;
        var count=results[0].count;
        res.render("home.ejs",{data:count});
    })
    
});

app.post("/register", function(req, res){
    var person={
        email: req.body.email
    }
    connection.query('INSERT INTO users SET ?',person, function(err, results){
       console.log(err);
        res.redirect("/");
    } )
})

app.listen(3000, process.env.IP, function(){
    console.log("server start");
});