/**
 * Created by Radu on 1/29/2017.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var User = require('./user.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // APIs
    // select all
    app.get('/users', function(req, res) {
        User.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        });
    });

    // app.get('/cats', function(req, res) {
    //     Cat.find({}, function(err, docs) {
    //         if(err) return console.error(err);
    //         res.json(docs);
    //     });
    // });


    // count all
    app.get('/users/count', function(req, res) {
        User.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/user', function(req, res) {
        var obj = new User(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/user/:id', function(req, res) {
        User.findOne({_id: req.params.id}, function(err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/user/:id', function(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/user/:id', function(req, res) {
        User.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });


    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname,'../../index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('Angular 2 Full Stack listening on port '+app.get('port'));
    });
});

module.exports = app;