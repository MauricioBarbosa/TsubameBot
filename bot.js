const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")
const execute = require("./tsubame/parser")

client.on('ready', () =>{
    console.log(`Logado como ${client.user.tag}!`);
    client.user.setActivity(config.activity.game)
});

//Listen Messages and react

client.on('message', async message =>{
    if(!message.content.startsWith(config.prefix)) return;
    if(message.channel.type=="dm"&& message.author.id!='270704317512548353') return;
    var command = message.content.toLowerCase()
    var msg = execute.execute.executeCommand(message.content)
    message.channel.send(msg);
})

client.on('guildDelete', guild =>{
    console.log(`Bye bye ${guild.name}-chan, :3`);
});

client.login(config.token);

