const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Manage audio volume')
        .addIntegerOption(option => option
            .setName('int')
            .setDescription('int for control')),
    async execute(interaction, nanako, player, queue) {
        const connection = getVoiceConnection(interaction.member.guild.id)
        const integer = interaction.options.getInteger('int');
        console.log(resource);
        console.log(2000);
        //connection.setVolume(integer);
        resource.volume.setVolume(integer);
    }
};