var mongoose = require('mongoose');

//Person Schema
var Telo = new mongoose.Schema({
    name: String,
});

//Models
mongoose.model( 'Telo', Telo );
