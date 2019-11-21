var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");
var events = new Array();
const infoMsg =
  "Hello i Am HoonBot. My prefix is : * , My commends are : Info,Events,AddEvent,DisplayTimeZones.  IMPORTENT! ,AddEvents Commend works Only with JsonFiles for Now ! : See Example : '*AddEvents {'Name':'InsertName','Date':'InsertDate'} ";
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});
logger.level = "debug";
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function(user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == "*") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];
    console.log("Args", args);
    console.log("Cmd", cmd);
    args = args.splice(1);
    switch (cmd) {
      case "Info":
        bot.sendMessage({
          to: channelID,
          message: infoMsg
        });
        break;
      case "Poke":
        bot.sendMessage({
          to: channelID,
          message: "Rawr!"
        });
        break;
      case "Events":
        bot.sendMessage({
          to: channelID,
          message: JSON.stringify(events)
        });
        break;
      case "AddEvents":
        events.push(JSON.parse(args[1]));
        bot.sendMessage({
          to: channelID,
          message: "Event Have been added !"
        });
        break;
    }
  }
});
