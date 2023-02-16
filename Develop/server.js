const express = require('express');
const path = require('path');
const api = require('./routes/index');
const { readFromFile } = require('./helpers/fsUtils');
const app = express();

app.use('/api', api);
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/api/notes', api);

app.use(express.static('public'));

const port = process.env.PORT || 3001;

// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET Route for json


// Get Route for individual note
app.get('/api/note/:note_id', (req, res) => {
  if(req.params.note_id){
    // console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id
    readFromFile('./db/db.json')
      .then((data) => {
        const parsedData = JSON.parse(data)
        for(let i=0; i < parsedData.length; i++){
          const currentNote = parsedData[i]
          // console.log(currentNote.note_id + noteId);
          if(currentNote.note_id === noteId){
            res.status(200).json(currentNote);
            // console.log(currentNote);
            return;
          }
        }
        res.status(404).send('Note ID not found');
      })
  } else {
    res.status(400).send('Note ID not provided');
  }
})

app.listen(port, () => 
console.log(`App listening at http://localhost:${port}`));