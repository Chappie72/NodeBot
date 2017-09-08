require('dotenv-extended').load();
var builder = require('botbuilder');

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
    session.send("This is awesome!!");
});

// Add global LUIS recognizer to bot
var luisAppUrl = process.env.LUIS_APP_URL;
bot.recognizer(new builder.LuisRecognizer(luisAppUrl));

// Connector listener wrapper to capture site url
var connectorListener = connector.listen();
function listen() {
    return function (req, res) {
        // Capture the url for the hosted application
        var url = req.protocol + '://' + req.get('host');
        connectorListener(req, res);
    };
}

bot.dialog('Help', require('.dialogs/help'))
.triggerAction({
    matches: [/help/i, /support/i, /problem/i]
});

module.exports = {
    listen: listen
};