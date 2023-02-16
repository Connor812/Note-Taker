const notes = require('express').Router();
const { readFromFile, readAndAppend, witeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const express = require('express');

notes.use(express.json());
notes.use(express.urlencoded({ extend: true }));

notes.get('/', (req, res) => 
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    console.log(req.body)
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



module.exports = notes;