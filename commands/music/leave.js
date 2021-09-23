const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { Globals } = require('../../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave a channel'),
	async execute(interaction, nanako) {
        const connection = getVoiceConnection(interaction.member.guild.id)
		Globals.player.removeAllListeners(AudioPlayerStatus.Idle);
        console.log("stopped listeners")
		connection.destroy();
		interaction.reply('Bye Bye');
	},
};