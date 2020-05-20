const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mongo = require('mongodb').MongoClient;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  let q =[];
  mongo.connect("mongodb+srv://dummy:apache200@cluster0-buzwz.mongodb.net/dummy?retryWrites=true&w=majority")
      .then((client) => {
        client.db().collection('products').find().forEach(items => {
          q.push(items)
          console.log(q)
        }).then((data) => {
          res.json(q).send();
        })
      }).catch(e => console.log('Error'))
  // res.send(q).status(200)
})

app.get('/name', (req, res) => {
    let q =[];
    mongo.connect("mongodb+srv://dummy:apache200@cluster0-buzwz.mongodb.net/dummy?retryWrites=true&w=majority")
        .then((client) => {
            client.db().collection('products').find({name: "Asif"}).forEach(items => {
                q.push(items)
                console.log(q)
            }).then((data) => {
                res.json(q).send();
            })
        }).catch(e => console.log('Error'))
    // res.send(q).status(200)
})

app.get('/title', (req, res) => {
    let q =[];
    mongo.connect("mongodb+srv://dummy:apache200@cluster0-buzwz.mongodb.net/dummy?retryWrites=true&w=majority")
        .then((client) => {
            client.db().collection('products').find({title: "Tech Lead"}).forEach(items => {
                q.push(items)
                console.log(q)
            }).then((data) => {
                res.json(q).send();
            })
        }).catch(e => console.log('Error'))
    // res.send(q).status(200)
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
