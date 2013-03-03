var mongoose = require('mongoose');

//Person Schema
var Food = new mongoose.Schema({
    title: String,
    price: Number
});

//Models
mongoose.model( 'Food', Food );
