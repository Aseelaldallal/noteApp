

const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}


var addNote = (title, body) => {
    var note = {
        title,
        body
    }
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0)  {
        notes.push(note);
        saveNotes(notes,note);
        return note;
    }
};

var getAll = () => {
    console.log('Getting all notes');    
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    var myNote = (notes.filter((note) => note.title === title))[0];
    return myNote;
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var updatedNotes= notes.filter((note) => note.title !== title);
    saveNotes(updatedNotes);
    return notes.length !== updatedNotes.length;
}

var logNote = (note) => {
    debugger;
    console.log("----");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}


module.exports = {
    addNote, // ES6 Feature: equivelant to addNote: addNote
    getAll,
    getNote,
    removeNote,
    logNote
}