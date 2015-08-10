(function(){
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  var http = require('http');
  var express = require('express');

  var app = express();
  app.set('view engine', 'html');
  app.set('views', './views');
  app.use(express.static(__dirname + '/views'));
  require('./routes')(app);

  var server = require('http').createServer(app);

  var port = process.env.PORT || 8000;

  //Start the server
  server.listen(port, function() {
  console.log('Server listening on port ' + port);
  });

  exports.callback0 = app;
})();