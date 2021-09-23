const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');
const { Globals } = require('../../globals.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the music'),
	async execute(interaction, nanako) {
        const connection = getVoiceConnection(interaction.member.guild.id)
        if (!connection) return interaction.reply("I'm not home to pause the music");
        connection._state.subscription.player._state.status = 'paused';
        interaction.reply("Ok, I paused the music")
    }
}