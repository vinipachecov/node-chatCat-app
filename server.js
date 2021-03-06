'use strict';

const express = require('express');
// creates our basic instance of our application
// we can further create other instances and connect to this one
const app = express();
const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
// static files 
app.use(express.static('public'));

// View engine relate to our templates
app.set('view engine', 'ejs');

// session
app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
  stream: { 
    write: message => {
      // write to legs :)
      chatCat.logger.log('info', message);
    }
  }
}));

// routing
app.use('/', chatCat.router);

// listen on a port

chatCat.ioServer(app).listen(app.get('port'), () => {
  console.log('ChatCat is running on port ', app.get('port'));
})