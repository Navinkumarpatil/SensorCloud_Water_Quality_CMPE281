
/*
 * GET home page.
 */
var ejs = require("ejs");

exports.index = function(req, res){
 // res.render('index', { title: 'Test' });
// Sonika:	 res.render('login.ejs');
	console.log("Hi");
	res.render('HomePage.ejs');
	
};

exports.login = function(req, res){
	console.log("login");
	res.render('awsdashboard.ejs');
	
};

exports.home = function(req, res){
	console.log("dashboard");
	res.render('home.ejs');
	
};

exports.signup = function(req, res){
	console.log("signup");
	res.render('billing.ejs');
};

exports.maps = function(req,res){
	res.render('map.ejs');
};