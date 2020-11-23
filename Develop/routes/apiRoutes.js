var notes = require("../db/db.json"); ///links to database file
var fs = require("fs");
var path = require("path");


//ROUTING
module.exports = function (app) {

    ////////GET
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
        //res.json(notes);
    });


    ////////POST
    app.post("/api/notes", function (req, res) {

        let addNote = req.body;
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
        let listLength = (savedNotes.length).toString();

        //give ids to added notes
        addNote.id = listLength;

        //add new note(addNote) to saved list
        savedNotes.push(addNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);


    });


    ////////Delete note 
    app.delete("/api/notes:id", function (req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
        
        let id = (req.params.id).toString();

        //removes the selected note based on id from the savednotes
        savedNotes = savedNotes.filter(function(selected) {
            return selected.id != id; //returns all notes that are unequal to the one selected to be deleted.
        });

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));   //writes to "database"
        res.json(savedNotes);
    });


}