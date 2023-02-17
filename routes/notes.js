const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
let parsedData;

notes.get('/', (req, res) => {
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    // console.log(req.body)
    const { title, text } = (req.body);
    
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        readAndAppend(newNote, './db/db.json');
        
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});

notes.delete('/:noteId', (req, res) => {
    
    const noteId = req.params.noteId;
    console.log(noteId)

    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        for (var i = 0; i < json.length; i++) {
            if(noteId == json[i].note_id) {
                readAndDelete(noteId);
                res.send(`Seccessfully deleted ${noteId}`);
                return;
            } if (i == json.length - 1) {
                res.status(404).send('Note ID not found.')
                console.log("Could not find ID");
            }
        }
    })
})

module.exports = notes;