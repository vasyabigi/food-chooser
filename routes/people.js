'use strict';

var mongoose = require('mongoose'),
    TeloModel = mongoose.model('Telo');

//Get a list of all persons
exports.getPerson = function( request, response ) {
    return TeloModel.find( function( err, tela ) {
        if( !err ) {
            return response.send( tela );
        } else {
            return console.log( err );
        }
    });
};

//Insert a new person
exports.postPerson = function( request, response ) {

    var telo = new TeloModel({
        name: request.body.name,
    });

    telo.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });

    return response.send( telo );
};


//Update a person
exports.putPerson = function( request, response ) {
    console.log( 'Updating book ' + request.body.title );
    return TeloModel.findById( request.params.id, function( err, telo ) {
        telo.name = request.body.name;

        return telo.save( function( err ) {
            if( !err ) {
                console.log( 'telo updated' );
            } else {
                console.log( err );
            }
            return response.send( telo );
        });
    });
};

//Delete a person
exports.deletePerson = function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return TeloModel.findById( request.params.id, function( err, telo ) {
        return telo.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
};
