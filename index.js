const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online I guess.`);
  bot.user.setActivity("with your emotions")
});


//message handler
bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return("I can't do that yet!");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //>say Hello
  //if(messageArray[0] != `${prefix}`) return;

//hello word
  if(cmd === `${prefix}hello`){
    return message.channel.send("Hello!");
  }

if(cmd === `${prefix}report`){

  let rUser = message.guild.member(message.mentions.users.first()
  || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("No User found)");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#d55b5b")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

  //deletes last message
  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
  //message.channel.send(reportEmbed);

}





  //help command
  if(cmd === `${prefix}help`) return (message.channel.send("I can't do much right now :disappointed: "));

//server Information
  if(cmd === `${prefix}serverinfo`){

      let servericon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#e55b5b")
      .setThumbnail(servericon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("Total Members", message.guild.memberCount)
      .addField("You Joined", message.member.joinedAt);

      return message.channel.send(serverembed);

  }

//bot Information
  if(cmd === `${prefix}botinfo`){

      let boticon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information:")
      .setColor("#5e6c82")
      .setThumbnail(boticon)
      .addField("Bot Name", bot.user.username);

      return message.channel.send(botembed);

  }

});

bot.login(botconfig.token);
