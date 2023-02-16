const express = require('express');
const path = require('path');
const api = require('./routes/index')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));


const port = process.env.PORT || 3001;

// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Gets wildcard route for 404 Error page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${port}`));