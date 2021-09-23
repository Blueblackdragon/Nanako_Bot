const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with Server info'),
	async execute(interaction, nanako) {
		interaction.reply(`Server info: ${interaction.guild.name}\nTotal numbers: ${interaction.guild.memberCount}`);
	},
};
