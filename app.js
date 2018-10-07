var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	User           = require("./models/user"),
	passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/auth_demo_app",{ useNewUrlParser: true });



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(require("express-session")({
	secret: "I'm cute",
	resave: false,
	saveUninitialized:false, 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/",function(req,res){
	res.render("home");
});

app.get("/register",function(req,res){
	res.render("Register");
});

app.post("/register",function(req,res){
	//res.send("Register Post Route");
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}),req.body.password,function(err,user){
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/secret");
		});
	});

});
app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
});

//login routes
app.get("/login",function(req,res){
	res.render("login");
});
app.post("/login", passport.authenticate("local",{
	failureRedirect : "/",
	successRedirect : "/secret"
}) ,function(req,res){
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
app.listen(8001,process.env.IP,function(){
	console.log("=======================================================");
	console.log("Server has started..................");
	console.log("=======================================================");
});