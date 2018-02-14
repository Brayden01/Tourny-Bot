const Discord = require("discord.js")
const client = new Discord.Client({
  disableEveryone: true,
  messageCacheMaxSize: 500,
  messageCacheLifetime: 120,
  messageSweepInterval: 60
})

const token = 'NDEyNzM4NDI0NDcxMjg5ODU4.DWUceg.GOhOFh3tvXIG8-maK1GdDwjHxn4';
const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setGame(`on ${client.guilds.size} servers`)
});

client.on("message", async message => {

  if (message.author.bot) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.channel.id != "411911804155985950") {return}

  if (command === "signup") {
    if (message.member.roles.find("name", "Participant")) {
      let embed = {
      "description": `${message.author} You already are a **Participant**.`,
      "color": 15158332
      };
      return message.channel.send({ embed });
    }
    else {
      let role = message.guild.roles.find("name", "Participant");
      let member = message.member
      let maxParticipants = 100
      let people = 0;
      role.members.forEach(function() {
        people++;
      })
      if (people >= maxParticipants) {
        return message.reply(`There are already the max amount of participants: **${maxParticipants}**`)
      } else {
        member.addRole(role).catch(console.error);
        let embed = {
        "description": `${message.author} You are now a **Participant**. There are *${people}* other Participants`,
        "color": 3066993
        };
        return message.channel.send({ embed });
      }
    }
  }
})

client.login(token)
