'use strict';

var mongoose = require('mongoose'),
    FoodModel = mongoose.model('Food');

//Get a list of all foods
exports.getFood = function( request, response ) {
    return FoodModel.find( function( err, foods ) {
        if( !err ) {
            return response.send( foods );
        } else {
            return console.log( err );
        }
    });
};

//Insert a new food
exports.postFood = function( request, response ) {

    var food = new FoodModel({
        title: request.body.title,
        price: request.body.price,
        count: request.body.count,
        total: request.body.total
    });

    food.save( function( err ) {
        if( !err ) {
            return console.log( 'Food created' );
        } else {
            return console.log( err );
        }
    });

    return response.send( food );
};


//Update a food
exports.putFood = function( request, response ) {
    console.log( 'Updating food ' + request.body.title );

    return FoodModel.findById( request.params.id, function( err, food ) {

        food.title = request.body.title;
        food.price = request.body.price;
        food.count = request.body.count;
        food.total = request.body.total;

        return food.save( function( err ) {
            if( !err ) {
                console.log( 'Food updated' );
            } else {
                console.log( err );
            }
            return response.send( food );

        });
    });
};

//Delete a food
exports.deleteFood = function( request, response ) {
    console.log( 'Deleting food with id: ' + request.params.id );
    return FoodModel.findById( request.params.id, function( err, food ) {
        return food.remove( function( err ) {
            if( !err ) {
                console.log( 'Food removed' );
                return response.send( {} );
            } else {
                console.log( err );
            }
        });
    });
};
