const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave a channel'),
	async execute(interaction) {
        const connection = getVoiceConnection(interaction.member.guild.id)
		connection.destroy();
        interaction.reply('Bye Bye');
	},
};