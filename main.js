const Discord = require('discord.js');
const axios = require('axios');
const { MessageButton, MessageActionRow } = require('discord-buttons');


const client = new Discord.Client();
require('discord-buttons')(client)
const { TOKEN, PREFIX } = require("./config.json");
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// CONSOLE
client.on("ready", () => console.log("Je suis pret masta"))
client.on("error", () => console.error);
client.on("warn", () => console.warn);
client.on("debug", console.log);
client.login(TOKEN);



client.on("message", async msg => {
    // SETUP CMD
    if (msg.author.bot) return;
    if (msg.content.indexOf(PREFIX) !== 0) return;
    const args = msg.content.slice(PREFIX.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    const start = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : {
            pseudo : msg.member.displayName,
            Money : 0,

        },
        mode: "cors",
        credentials : "same-origin",
    };




    if(cmd == "start"){
        axios.post('http://localhost:3000/posts', start).then(() => {
            
        }).catch((err) => {
            msg.reply(err)
        })

    }

    if(cmd == "show"){
        axios.get('http://localhost:3000/posts').then((res) => {
            data = res.data;
            data.forEach(e => {
                if (e.body.pseudo == msg.member.displayName){
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Profil")
                    .setThumbnail(msg.author.displayAvatarURL({ size: 256 }))
                    .addField("Pseudo : " + e.body.pseudo, "____")
                    .addField("Money : " + e.body.Money + "€", "____")
                    .setTimestamp()
                    .setImage("https://raw.githubusercontent.com/YassSSH/YassSSH/master/standard%20(1).gif")
                    .setFooter("Yass#2255")
                    .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL())
                    .setColor(7419530)
        
                msg.channel.send(embed)
                }
                
            });
        })
    }

    





});