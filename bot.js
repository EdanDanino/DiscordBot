const Discord = require("discord.io");
const logger = require("winston");
const auth = require("./auth.json");
const fs = require("fs");
const ct = require("countries-and-timezones");

const infoMsg =
  "Hello i Am HoonBot. \n My prefix is : * \n My commends are : Info,Events,AddEvent,DisplayTimeZones ";

const writeEvent = data => {
  fs.writeFile("./info.json", JSON.stringify(data), err => {
    if (err) console.log("Error writing file:", err);
  });
};
const createJsonForEvent = (name, date, time, timezone) => {
  let data = {};
  data.name = name;
  data.date = date;
  data.time = time;
  const timezoneCt = ct.getTimezone(timezone);
  data.timezone = timezoneCt;
  console.log(JSON.stringify(data), "JSONDATA");
  return data;
};
const readJSONFile = () => {
  return (rawFile = require("./info.json"));
};
var file = readJSONFile();
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
      case "info":
        bot.sendMessage({
          to: channelID,
          message: infoMsg
        });
        break;
      case "poke":
        bot.sendMessage({
          to: channelID,
          message: "Rawr!"
        });
        break;
      case "event":
        let msg = `Name : ${file.name},Date : ${file.date},Time : ${file.time},TimeZone : ${file.timezone.utcOffsetStr}`;
        bot.sendMessage({
          to: channelID,
          message: msg || "There are no Events"
        });
        break;
      case "addEvent":
        console.log(args.length);
        if (args.length > 1 && args[3].includes("/")) {
          let tempEvent = createJsonForEvent(
            args[0] || "",
            args[1] || "",
            args[2] || "",
            args[3] || ""
          );
          writeEvent(tempEvent);
          bot.sendMessage({
            to: channelID,
            message: "Event Have been added !"
          });
        } else {
          bot.sendMessage({
            to: channelID,
            message:
              "make sure u add name date time and timezone after the commend!"
          });
        }
        break;
      case "DisplayTimeZones":
        const timezoneIL = ct.getTimezone("Asia/Tel_Aviv");
        const timezoneNJ = ct.getTimezone("America/New_York");
        const timezoneFR = ct.getTimezone("Europe/Paris");
        bot.sendMessage({
          to: channelID,
          message:
            `Times display in UTC : \n Timezone In Asia/Tel_Aviv ${timezoneIL.utcOffsetStr} \n Timezone In America/New_York ${timezoneNJ.utcOffsetStr} \n Timezone In Europe/Paris ${timezoneFR.utcOffsetStr}`
        });
        break;
        case "ShowExamples":     
        bot.sendMessage({
          to: channelID,
          message:
            "addEvent commend Example :\n *addEvent Alex's_Birthday 7/7 3Pm America/New_York"
        });
        break;
    }
  }
});
