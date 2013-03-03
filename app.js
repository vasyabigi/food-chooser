'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    io = require('socket.io').listen(server);


mongoose.connect('mongodb://localhost/food_chooser');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    // For development with yeoman
    app.use(express.static(path.join(__dirname, '.tmp')));

    app.use(express.static(path.join(__dirname, 'app')));
});

// Models
require('./models/person');
require('./models/food');

// Routes
app.get('/', routes.index);
app.get('/people', routes.index);

// REST API for people
var people = require('./routes/people');
app.get( '/api/telo', people.getPerson);
app.post( '/api/telo', people.postPerson);
app.put( '/api/telo/:id', people.putPerson);
app.delete( '/api/telo/:id', people.deletePerson);

// REST API for foods
var people = require('./routes/food');
app.get( '/api/food', people.getFood);
app.post( '/api/food', people.postFood);
app.put( '/api/food/:id', people.putFood);
app.delete( '/api/food/:id', people.deleteFood);

app.configure('development', function(){
    app.use(express.errorHandler());
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
