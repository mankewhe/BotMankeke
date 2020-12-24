const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hello World')
})
let port = process.env.PORT || 3000;
app.listen(port)

require('dotenv').config()
///////////////////////BOT/////////////////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();

let prefix = process.env.prefix;

client.on("ready", () => {
  console.log(`Estoy listo!`);
});

/////////////////////////////////
client.on("message", (message) => {
  ////////////////////////////////
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  ///////RETURN///////
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  /////Comandos///////
  if (command === "hola") {
    message.channel.send("hola")
  }

  //Avatar//
  if (command === "avatar") {
    let user = message.mentions.users.first();

    if (!user) return message.channel.send("Mencione a un usuario.")

    if (user) {
      message.channel.send(user.displayAvatarURL());
    } else {
      message.channel.send(message.author.displayAvatarURL);
    }
  }

  //kick 
  if (command === "kick") {
    let mencionado = message.mentions.users.first();
    let razon = args.slice(1).join(" ");
    
      if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
      return message.channel.send('No tengo permisos para expulsar personas')
    }

    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.channel.send('Perdon, pero no tienes el permiso para expulsar personas')
    }

    if (!mencionado) return message.channel.send("Mencione a un usuario")
    if (!razon) return message.channel.send("Debe escribir una razon de la expulsión");

    message.guild.member(mencionado).kick(razon);
    message.channel.send("usuario " + mencionado.tag + " fue expulsado del servidor")
  }

  //ban//
  if (command === "ban") {
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('No tengo permisos para banear personas')
    }

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('Perdon, pero no tienes el permiso para banear personas')
    }

    let persona = message.mentions.members.first() ||
      message.guild.members.resolve(args[0])

    if (!persona) {
      return message.channel.send('Debe mencionar a alguien para banear')
    } else if (!persona.bannable) {
      return message.channel.send('No puedo banear a esta persona')
    } else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
      return message.channel.send('Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo')
    }

    var razon = args.slice(1).join(' ')
    if (!razon) {
      razon = 'Razon no especificada'
    }

    razon += `, Baneado por ${message.author.tag}`

    message.guild.members.ban(persona, {
      reason: razon
    })
      .catch(e => message.reply('Ocurrio un **error** desconocido'))
      .then(() => {
        message.channel.send(`Listo, banee a **${persona.user.tag}**`)
      })
  }

  
  	
  //ping//

  if (command === "ping") {
    message.channel.send(client.ws.ping + 'ms')
  }

  //userStatus//

  if (command === "userstatus") {
    let color = {
      "online": "#00c903",
      "idle": "#ff9a00",
      "dnd": "#ff0000",
      "offline": "#d8d8d8"
    };
    let estados = {
      "online": "En Línea",
      "idle": "Ausente",
      "dnd": "No molestar",
      "offline": "Desconectado/invisible"
    };

    let user = message.mentions.users.first();
    if (!user) return message.reply(`¡Mencione a un usuario!`);

    const embed = new Discord.MessageEmbed()
      .setColor(color[user.presence.status])
      .addField(`Estado de ${user.username}`, `${estados[user.presence.status]}`)

    message.channel.send(embed);
  }
  //////Invite//////

  if (command === "invite") {
    message.channel.send("https://discord.com/oauth2/authorize?client_id=758059320238931978&scope=bot&permissions=2147483647")
  }
  //////

  if (command === "invitacion") {
    message.channel.createInvite({
      //opciones de la invitacion
      maxAge: 0
    })
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch(err => {
        message.channel.send('Ocurrio un error al crear la invitacion')
      })
  }

  //////Love/////

  if (command === "love") {
    let users = message.mentions.users.map(m => m.username).join(' y ');
    if (!users) return message.channel.send('Mencione a dos usuarios para calcular');

    const random = Math.floor(Math.random() * 100);
    let heard = "";

    if (random < 50) {
      heard = ':broken_heart:';

    } else if (random < 80) {
      heard = ':sparkling_heart: ';

    } else if (random < 101) {
      heard = ':heart:';

    }

    const embed = new Discord.MessageEmbed()
      .setAuthor('El porcentaje de amor de ' + users + ' es:')
      .setDescription(heard + ' **' + random + ' %**' + ' ' + heard)
      .setColor(0xff4d4d)

    message.channel.send(embed);
  }


  //////AmongUS////

  if (command === 'impostor') { //El comando

    const mencionado = message.mentions.members.first() //Definimos mencionado

    let random = [
      "No era el impostor",
      "Era el impostor"
    ] //Hacemos frases para ver si es o no


    if (!mencionado)//Si el autor no menciono a nadie

      return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${message.author.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`) //Enviamos el mensaje

    //Pero si menciona

    message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${mencionado.user.username} ${random[Math.floor(Math.random() * random.length)]} 　 。　.

　　'　　　 ${Math.floor(Math.random() * 3) + 1} Impostores restantes 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`)
  }

  ////////AFK/////

  if (command === "afk") {
  
   if(message.member.displayName.startsWith("[AFK]"))
   return message.channel.send("ya estas `AFK`")
   
   let reason = args.join(' ') || 'No especificada';
    message.member.setNickname(`[AFK] ` + message.member.displayName) 
    
    const embed = new Discord.MessageEmbed()
       .setColor("0x00fcee")
       .setTitle("Listo, ahora estas en `AFK` (debes usar el comando -online para quitarte el estado `AFK`)")
       .setDescription(" `RAZÓN:` " + reason)
   message.channel.send(embed) 
   
    message.delete({timeout : 3000});
  }

  if (command === "online"){

    if (message.member.displayName.startsWith("[AFK]")) { 
      message.member.setNickname(message.member.displayName.replace("[AFK]", "")); 
    

      message.channel.send("Listo, ahora ya no estas `AFK`"); 
    };
  }
  

  /////mankeke////

  if (command === "mankeke") {
    let user = message.mentions.users.first() || message.author;

    let aloneEmbed = new Discord.MessageEmbed();

    if (!user)
      return message.reply(
        "Menciona si quieres darle un mankeke a alguien mas >w<♥"
      );

    if (user.id === message.author.id)
      return message.channel.send(
        "**" +
        message.author.username +
        "** Toma un mankeke.. :cupcake: de mi parte ♥ "
      );

    message.channel.send(
      "**" +
      message.author.username +
      " ** le da un mankeke \n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cupcake: a  **" +
      user.username +
      "**"
    );
  }

  ///hug////
 let gifs = ['https://i.imgur.com/SxyGyNO.gif', 'https://i.imgur.com/6vXXfML.gif', 'https://i.imgur.com/xR3gUmG.gif']
 let randomIMG = gifs[Math.floor(Math.random() * gifs.length)]
 let userr = message.mentions.users.first() 

 if(command === "hug"){
  if (!userr) return message.channel.send("Mencione a un usuario")
   const embed = new Discord.MessageEmbed()
       .setImage(randomIMG)
       .setColor("0x00fcee")
       .setTitle(message.author.username + " Le da un abrazo a " + userr.username )
   message.channel.send(embed)    
 }

///Kill///
let gif = ['https://i.imgur.com/YuwkEmI.gif', 'https://i.imgur.com/ggJ0GkQ.gif', 'https://i.imgur.com/dskOmzW.gif']
 let random = gif[Math.floor(Math.random() * gif.length)]
 let use = message.mentions.users.first() 

 if(command === "kill"){ 
 if (!use) return message.channel.send("Mencione a un usuario...")
 if(use.id === message.author.id) return message.channel.send('a ti mismo no UnU')

   const embed = new Discord.MessageEmbed()
       .setImage(random)
       .setColor("0x00fcee")
       .setTitle(message.author.username + "  Mata a  " + use.username)
   message.channel.send(embed)    
 }

///Hi///

let image = ['https://i.imgur.com/kYaoZmL.gif', 'https://i.imgur.com/NZcDFu9.gif', 'https://i.imgur.com/XtBhVTw.gif', 'https://i.imgur.com/jZAE0x1.gif']
 let randon = image[Math.floor(Math.random() * image.length)]
 let user = message.mentions.users.first() || message.author;
 let msg = '';
  
 if(command === "hi"){

  if(user.id !== message.author.id) msg = message.author.username + ' a saludado a ' + user.username + " >v<";
 else msg = message.author.username + ' saluda a todos >v<'; 

  const embed = new Discord.MessageEmbed()
  .setImage(randon)
  .setColor("0x00fcee")
  .setTitle(msg)
  message.channel.send(embed)

 }

///kiss///

 let imagen = ['https://i.imgur.com/0G7dcK5.gif', 'https://i.imgur.com/JC2wrrF.gif', 'https://i.imgur.com/Qlgirtk.gif', 'https://i.imgur.com/92lx1qr.gif', "https://i.pinimg.com/originals/67/6b/f9/676bf9c2cd4104187c9c211ee0efe130.gif", "https://steamuserimages-a.akamaihd.net/ugc/866238054439775317/35DED27B352FD5C3F13D27E7D369C66929DCB0FA/", "https://steamuserimages-a.akamaihd.net/ugc/853846034000137024/1DBE31093ADDCB510491045FE8FE85BDC4A8554C/"]
 let aleatorio = imagen[Math.floor(Math.random() * imagen.length)]
 let uce = message.mentions.users.first() || message.author;

 if(command === "kiss"){
   const embed = new Discord.MessageEmbed()
       .setImage(aleatorio)
       .setColor("0x00fcee")
       .setTitle(message.author.username + "  besa a " + uce.username + " >w<♥ ")
   message.channel.send(embed)    
 }

///sherk

if(command === "shrek"){
  message.channel.send(`⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀ ⣀⣀⣤⣤⣤⣀⡀
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠸⣼⡿
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇
⠀⠀ ⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠇
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`)
}

///Facil

if(command === "facil"){
  message.channel.send(`╰┃ ┣▇━▇
 ┃ ┃  ╰━▅╮ 
 ╰┳╯ ╰━━┳╯F A S I L I T O
  ╰╮ ┳━━╯ E L T U T O R I A L
 ▕▔▋ ╰╮╭━╮
╱▔╲▋╰━┻┻╮╲╱▔▔▔╲
▏  ▔▔▔▔▔▔▔  O O┃ 
╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱
 ▏╳▕▇▇▕ ▏╳▕▇▇▕
 ╲▂╱╲▂╱ ╲▂╱╲▂╱`)
}

if(command === "fasil"){
  message.channel.send(`╰┃ ┣▇━▇
 ┃ ┃  ╰━▅╮ 
 ╰┳╯ ╰━━┳╯F A S I L I T O
  ╰╮ ┳━━╯ E L T U T O R I A L
 ▕▔▋ ╰╮╭━╮
╱▔╲▋╰━┻┻╮╲╱▔▔▔╲
▏  ▔▔▔▔▔▔▔  O O┃ 
╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱
 ▏╳▕▇▇▕ ▏╳▕▇▇▕
 ╲▂╱╲▂╱ ╲▂╱╲▂╱`)
}

///meow

if(command === "miow"){
  message.channel.send("Miow meouw :sparkling_heart: :cat:")
}

///adios///

let adios = "https://i.imgur.com/IGCQeoF.gif"

if(command == "adios"){
  const embed = new Discord.MessageEmbed()
       .setImage(adios)
       .setColor("0x00fcee")
       .setTitle(" ATA LA PROCSIMA " + "  * Musica de Dubstep Intensifies * ")
   message.channel.send(embed)    
 }

///mimir///

let mimir = "https://i.imgur.com/iSo4p5W.gif"

if(command == "momir"){
  const embed = new Discord.MessageEmbed()
       .setImage(mimir)
       .setColor("0x00fcee")
       .setTitle(message.author.username + " va a hacer la dormicion zzz... ")
   message.channel.send(embed)    
 }

 let momir = "https://i.imgur.com/SltNjSN.gif"

 if(command == "mimir"){
  const embed = new Discord.MessageEmbed()
       .setImage(momir)
       .setColor("0x00fcee")
       .setTitle(message.author.username + " va a hacer la mimicion zzz... ")
   message.channel.send(embed)    
 }

///fliP coin///

 let coin = ['https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png',
 'https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png']
 let randoohm = coin[Math.floor(Math.random() * coin.length)]

 if(command === "coin"){
   const embed = new Discord.MessageEmbed()
       .setImage(randoohm)
       .setColor("0x00fcee")
       .setAuthor(message.author.username+" sacaste:", message.author.avatarURL)
   message.channel.send(embed)    
 }
  
///say///

if(command === "say"){
  if(!args) return message.channel.send(`debe escribir un mensaje a enviar.`);
 message.channel.send(args.join(" "));

  message.delete();

}


});
client.login(process.env.token); 
