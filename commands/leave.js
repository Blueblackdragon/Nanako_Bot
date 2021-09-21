const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { cleanUp } = require('./play.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave a channel'),
	async execute(interaction, nanako, player, queue) {
        const connection = getVoiceConnection(interaction.member.guild.id)
		player.removeAllListeners(AudioPlayerStatus.Idle);
        console.log("stopped listeners")
		//cleanUp()
		connection.destroy();
        return queue, player, interaction.reply('Bye Bye');
	},
};