//Lets require/import the HTTP module
var Settings = require('./settings.js')
var Server = require('./server.js');

Settings.init();
Server.start(8081);
