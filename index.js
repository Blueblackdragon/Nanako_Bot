const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./config.json'); 

const nanako = new Client({ intents: [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_VOICE_STATES
	] 
});




nanako.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	try{
		nanako.commands.set(command.data.name, command);
	} catch (error){
		console.error(error)
	}
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		nanako.once(event.name, (...args) => event.execute(...args));
	} else {
		nanako.on(event.name, (...args) => event.execute(...args));
	}
}

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

