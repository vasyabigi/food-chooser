'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    path = require('path');

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

    socket.on('online', function() {
        socket.emit('online', { number: io.sockets.clients().length });
        socket.broadcast.emit('online', { number: io.sockets.clients().length });
    });

    socket.on('food', function() {
        socket.broadcast.emit('food');
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('online', { number: io.sockets.clients().length - 1 });
    });
});
