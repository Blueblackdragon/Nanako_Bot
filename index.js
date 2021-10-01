const fs = require('fs');
const Sequelize = require('sequelize');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./config.json'); 

const nanako = new Client({ intents: [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_VOICE_STATES
	] 
});

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	wallet: {
		type: Sequelize.BIGINT,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports ={
	Tags
}


nanako.commands = new Collection();
//const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


let command_dir = "./commands"

for(let dirs of fs.readdirSync(command_dir)) {
    for(let files of fs.readdirSync(command_dir.concat("/", dirs))) {
		const script = require(command_dir.concat("/", dirs, "/", files));
		nanako.commands.set(script.data.name, script);
    }
}

// for (const file of commandFiles) {
// 	const command = require(`./commands/fun/${file}`, `./commands/music/${file}`, `./commands/tags/${file}`, `./commands/utils/${file}`);
// 	try{
// 		nanako.commands.set(command.data.name, command);
// 	} catch (error){
// 		console.error(error)
// 	}
// }

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		nanako.once(event.name, (...args) => event.execute(...args));
	} else {
		nanako.on(event.name, (...args) => event.execute(...args));
	}
}

//nanako.on("debug", console.log).on("warn", console.log)

nanako.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = nanako.commands.get(interaction.commandName);
	
	if (!command) return;
	
	try {
		await command.execute(interaction, nanako);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command BAKA!', ephemeral: true });
	}
});


nanako.login(token);

