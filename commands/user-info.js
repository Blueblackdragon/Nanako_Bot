const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info'),
	async execute(interaction) {
        return interaction.reply(`User info: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},

};
