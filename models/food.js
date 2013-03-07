var mongoose = require('mongoose');

//Food Schema
var Food = new mongoose.Schema({
    title: String,
    price: Number,
    count: Number,
    total: Number
});

//Models
mongoose.model( 'Food', Food );
