module.exports = {
	name: 'interactionCreate',
	async execute(interaction, nanako) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction on.`);
	}
};