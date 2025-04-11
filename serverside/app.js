const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Pokemon = require('./models/pokemon')
//connect and display the status
mongoose.connect('mongodb://localhost:27017/IT6203')
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/pokemonlist', (req, res, next) => {
    //call mongoose method find (MongoDB db.Pokemons.find())
    Pokemon.find()
        //if data is returned, send data as a response
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

//in the app.get() method below we add a path for the students API 
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested. 
app.get('/pokemonlist/:id', (req, res, next) => {
    //call mongoose method find (MongoDB db.Pokemons.find())
    Pokemon.findOne({_id: req.params.id})
        //if data is returned, send data as a response
        .then(data => { 
            res.status(200).json(data)
            console.log(data);

        })    
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });

});

// serve incoming post requests to /pokemonlist
app.post('/pokemonlist', (req, res, next) => {
    // create a new student variable and save request's fields 
    const pokemon = new Pokemon({
        pokemonName: req.body.pokemonName
    });
    //send the document to the database
    pokemon.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/pokemonlist/:id", (req, res, next) => {
    Pokemon.deleteOne({_id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});


//serve incoming put requests to /pokemonlist 
app.put('/pokemonlist/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set new first and last names 
        Pokemon.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                pokemonName : req.body.pokemonName 
            }}, 
            {new:true} 
        ) 
        .then((pokemon) => { 
            if (pokemon) { //what was updated 
                console.log(pokemon); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});


//to use this miiddleware in other parts of the application
module.exports=app;