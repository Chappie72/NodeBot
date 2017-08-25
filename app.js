var express = require('express');
var builder = require('botbuilder');

var app = express();

// Setup the express server
var port = process.env.port || process.env.PORT || 3000
app.listen(port, function () {
  console.log('Express server is listening on port 3000...')
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Register bot
app.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
  session.send("You said: %s", session.message.text);
});



