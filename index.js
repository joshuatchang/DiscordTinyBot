const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online I guess.`);
  bot.user.setActivity("with your emotions")
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return("I can't do that yet!");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //>say Hello


  if(cmd === `${prefix}hello`){
    return message.channel.send("Hello!");
  }
  if(cmd === `${prefix}help`) return (message.channel.send("I can't do much right now :disappointed:"))
  else return message.channel.send("@" + message.author + "\n ERROR, command not recognized.")

});

bot.login(botconfig.token);
