const fs = require('fs');
const { Client, Collection, Intents, VoiceChannel, ClientApplication } = require('discord.js');
const { token } = require('./config.json');
const { createAudioPlayer,createAudioResource,entersState,
	StreamType, AudioPlayerStatus, VoiceConnectionStatus,} = require('@discordjs/voice');

const nanako = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });


nanako.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	nanako.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		nanako.once(event.name, (...args) => event.execute(...args));
	} else {
		nanako.on(event.name, (...args) => event.execute(...args));
	}
}

const player = createAudioPlayer();

nanako.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = nanako.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction, nanako, player);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command BAKA!', ephemeral: true });
	}
});


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

