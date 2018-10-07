/* moongoose - variable for connecting to mongoDB*/
var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
/* initialized username and password for mongoDB*/
	username: String,
	password: String

});
/*exporting from mongo db*/
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema)
