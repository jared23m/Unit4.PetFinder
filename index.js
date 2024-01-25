// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;

// GET - / - returns homepage
// PSEUDOCODE: return the file => res.sendFile
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + 'public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
// PSEUDOCODE: return the array => res.send
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets);
});

// get pet by owner with query string
// PSEUDOCODE: get the query, find method, and return the owner => req.params and res.send
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.owner;

    // find the pet in the pets array
    const pet = pets.find((pet) => pet.owner === owner);

    // send the pet as a response
    res.send(pet);
});

// get pet by name
// PSEUDOCODE: get the param, find method, and return the name => req.params and res.send
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const {name} = req.params;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet);

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;