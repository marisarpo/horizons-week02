"use strict";

// mongo is smart, the moment u create a collection it will also save it

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs'
}));
app.set('view engine', 'hbs');

var mongoose = require('mongoose');
// when you see the <></> those are for the developer to tell u to replace them with
// your own username and password
mongoose.connect(process.env.MONGODB_URI);

var student = mongoose.model('student', {
  name: String,
  favFood: String,
})

// new student({
//   name: 'May'
// }).save(function(err) {
//   console.log('SAVED!')
// })

new student({
  name: 'Moose',
  favFood: 'Pizza'
}).save(function(err) {
  console.log('SAVED!')
})

student.find(function(err, students) {
  console.log('STUDENTS ARE', students);
});

app.get('/', function(req, res) {
  res.render('index.hbs');
});

app.listen(3000, function() {
  console.log('Running on port 3000!');
});
