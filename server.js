var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Setting Port
var PORT = process.env.PORT || 3000;

//Initalize Express
var app = express();

//Express Router
var router = express.Router();

require("./config/routes")(router);


//Designate public folder as static dir
app.use(express.static(__dirname + "/public"));

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
  //Error log
  if (error){
    console.log(error);
  }
  else {
    console.log("Mongoose has connected sucessfully!!🎉")
  }
})

//Connect Handlebars to Express
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

//Use bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

//Every request goes through router
app.use(router);

//Listen on PORT
app.listen(PORT, function(){
  console.log("App is listening on Port: " + PORT);
});