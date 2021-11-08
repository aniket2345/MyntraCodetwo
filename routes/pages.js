const express = require('express');
const User = require('../core/user');
const bodyParser = require('body-parser'); // middleware
const router = express.Router();
const mysql = require('mysql');
const path = require('path');


router.use(bodyParser.urlencoded({ extended: false }));

// create an object from the class User in the file core/user.js
const user = new User();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"My application"});
});

// Get home page
router.get('/home', (req, res, next) => {
    console.log("requesting home page");
    /*let user = req.session.user;

    if(user) {
        res.render('./view1/home', {opp:req.session.opp, name:user.fullname});
        return;
    }*/
    let destination = path.join(__dirname, '../views/home.hbs');
    res.render(destination);
    //res.redirect('/');
});

router.get("/login",(req,res)=>{
    console.log("presenting login page");
    res.render("login");
});

router.get("/home",(req,res)=>{
    res.render("home");
});


router.get("/friends",(req,res)=>{
    res.render("friends");
});


// Post login data
router.post('/login', (req, res, next) => {

    var mysqlConnection = mysql.createConnection({
    host:'brxfkdbhw4smdzmfjsi8-mysql.services.clever-cloud.com',
    user : 'ump4jw56ptf5tiig',
    password : 'k6NrXR0SqyVlOQK196ee',
    database : 'brxfkdbhw4smdzmfjsi8'
});

    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    console.log(req.body.username);
    mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB connection successful");
    }else{
        console.log("DB connection error");
    }
    query = "Select * from UserDB where Username='"+req.body.username+"'";
    mysqlConnection.query(query,(err, rows, fields)=>{
            if(!err){
                console.log(rows);
                var results = Object.values(JSON.parse(JSON.stringify(rows)))
                if(results.length == 0){
                    res.send("No such user exists");
                }
                else if(req.body.password != results[0].Password){
                    res.send('Incorrect password or username');
                }
                else{
                    res.redirect('/home');
                }
            }
            else{
                console.log(err);
                res.send("There has been an error");
            }
        })

        mysqlConnection.end();
    });


/*
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })
*/

});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});

router.get("/suggestions",(req,res)=>{
    res.render("http://127.0.0.1:5500/suggestions");
});

router.get("/upload",(req,res)=>{
    res.render("index");
});


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});


router.get('/checkout',(req, res) => {
    var mysqlConnection = mysql.createConnection({
        host:'brxfkdbhw4smdzmfjsi8-mysql.services.clever-cloud.com',
        user : 'ump4jw56ptf5tiig',
        password : 'k6NrXR0SqyVlOQK196ee',
        database : 'brxfkdbhw4smdzmfjsi8'
    });

     mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB connection successful");
    }else{
        console.log("DB connection error");
    }

    query = "Select * from SharedCart;";
    mysqlConnection.query(query,(err, rows, fields)=>{
            if(!err){
                console.log(rows);
                var results = Object.values(JSON.parse(JSON.stringify(rows)))
                console.log(results);
                
            }
            else{
                console.log(err);
                res.send("There has been an error");
            }
        });

    mysqlConnection.end();
});
});

module.exports = router;