const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents, VoiceChannel, ClientApplication } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { createAudioPlayer, createAudioResource, entersState,
	StreamType, AudioPlayerStatus, VoiceConnectionStatus, AudioPlayer} = require('@discordjs/voice');

const { clientId, guildId, token } = require('./config.json'); 

const nanako = new Client({ intents: [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_VOICE_STATES
	] 
});

var queue = [];
const player = createAudioPlayer();

nanako.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	nanako.commands.set(command.data.name, command);
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
		await command.execute(interaction, nanako, player, queue);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command BAKA!', ephemeral: true });
	}
});

// nanako.on('interactionCreate', async interaction => {
// 	if (!interaction.isSelectMenu()) return;
// 	console.log(interaction);
// })


// connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
// 	try {
// 		await Promise.race([
// 			entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
// 			entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
// 		]);
// 		// Seems to be reconnecting to a new channel - ignore disconnect
// 	} catch (error) {
// 		console.error(error);
// 		// Seems to be a real disconnect which SHOULDN'T be recovered from
// 		connection.destroy();
// 	}
// });



nanako.login(token);

