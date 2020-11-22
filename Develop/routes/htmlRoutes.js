//dependecies
var path = require("path");
var express = require("express");

//ROUTING

module.exports = function (app) {

    //notes.html route
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //if no matching route is found default 
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });


}
