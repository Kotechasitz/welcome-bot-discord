const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]})
const canvacord = require("canvacord");
const dotenv = require('dotenv');

dotenv.config();

client.once('ready', () => {
	console.log('Bot Welcome Ready!');
});


// Join Server
client.on("guildMemberAdd",async member => {
    const welcomeCard = new canvacord.Welcomer()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({format: "png"}))
    .setColor("title", "#bfbc19")
    .setColor("username-box", "#090a0a")
    .setColor("discriminator-box", "#090a0a")
    .setColor("message-box", "#090a0a")
    .setColor("border", "#15d6d6")
    .setColor("avatar", "#15d6d6")
    .setBackground("https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg")
    .setMemberCount(member.guild.memberCount)
  
    const attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png")

    member.guild.channels.cache.find(ch => ch.name === "welcome").send(member.user.toString(), attachment)
})

// Leave Server
client.on("guildMemberRemove",async member => {
    const welcomeCard = new canvacord.Leaver()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({format: "png"}))
    .setColor("title", "#ff0037")
    .setColor("username-box", "#090a0a")
    .setColor("discriminator-box", "#090a0a")
    .setColor("message-box", "#090a0a")
    .setColor("border", "#15d6d6")
    .setColor("avatar", "#15d6d6")
    .setBackground("https://png.pngtree.com/thumb_back/fh260/background/20200731/pngtree-blue-carbon-background-with-sport-style-and-golden-light-image_371487.jpg")
    .setMemberCount(member.guild.memberCount)
  
    const attachment = new Discord.MessageAttachment(await welcomeCard.build(), "bye.png")

    member.guild.channels.cache.find(ch => ch.name === "welcome").send(member.user.toString(), attachment)
})

client.on("message", async message =>{
  if(message.content === "ping"){
    message.channel.send("pong")
  }
})

client.login(process.env.TOKEN)