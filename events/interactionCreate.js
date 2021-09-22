module.exports = {
	name: 'interactionCreate',
	async execute(interaction, nanako) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction on.`);
		// if (interaction.isButton()){
		// 	console.log("hello there")
		// }
		// if (!interaction.isCommand()) return;

		// const command = nanako.commands.get(interaction.commandName);

		// if (!command) return;

		// try {
		// 	await command.execute(interaction, nanako, player, queue);
		// } catch (error) {
		// 	console.error(error);
		// 	return interaction.reply({ content: 'There was an error while executing this command BAKA!', ephemeral: true });
		//}
	}
};