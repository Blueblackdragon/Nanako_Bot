const nanako = require('../index.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		// if (!interaction.isCommand()) return;
		// const command = nanako.commands.get(interaction.commandName);
		// if (!command) return;
		// try {
		// 	await command.execute(interaction);
		// } catch (error) {
		// 	console.error(error);
		// 	return interaction.reply({ content: 'There was an error while executing this command BAKA!', ephemeral: true });
		// }  THIS SHIT NO WORK WHY? CUZ NO COMMANDS HOW???
	}
};