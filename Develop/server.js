//Dependencies
//npm
var express = require("express");

//tells node we are creating an express server
var app = express();

//sets and initial port
var PORT = process.env.PORT || 8080;

//sets up expres app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//ROUTER
require("./routes/apiRoutes")(app);     //API
require("./routes/htmlRoutes")(app);    //HTML


//LISTENER
app.listen(PORT, function() {
    console.log("App listening PORT: " + PORT);
});