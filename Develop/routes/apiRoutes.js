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
app.delete("/api/notes/:id", (req, res) => {

    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    
    let noteId = (req.params.id).toString();
   

    //filters notes against selected note id and returns all that dont have that id, leaving out the deleted note
    savedNotes = savedNotes.filter(function(selected){
        return selected.id !== noteId;
    })

 // rewrites data without selected note, basically delteeting it
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});
}