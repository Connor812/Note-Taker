const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { readFromFile } = require('./helpers/fsUtils');

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/api', api);
app.use(express.static('public'));



// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(port, () => 
console.log(`App listening at http://localhost:${port}`));