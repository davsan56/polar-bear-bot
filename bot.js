// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the prefixes.json file that contains our token and our prefix values. 
const prefixes = require("./prefix.json");
// prefixes.token contains the bot's token
// prefixes.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.filter(user => !user.bot).size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  var prefix1 = true;
  if (message.content.toLowerCase().indexOf(prefixes.prefix) == 0) {
    prefix1 = true;
  } else {
    if (message.content.toLowerCase().indexOf(prefixes.prefix2) == 0) {
      prefix1 = false;
    } else {
      return;
    }
  }
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix1 ? prefixes.prefix.length : prefixes.prefix2.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if (command === "") {
    var string = "Hi guys, hope this brings good luck";
    const m = await message.channel.send(string);
  }

  if (command === "help") {
    const string = "Hi! Polar Bear brings good luck to spawn random Pokemon! To use type 'polarbear?' or 'pb?'\nAvailable commands:\nping, help, github";
    const m = await message.channel.send(string);
  }

  if (command === "github") {
    const string = "Check out how I work here! https://github.com/davsan56/polar-bear-bot";
    const m = await message.channel.send(string);
  }
});

client.login(process.env.DISCORD_AUTH);
