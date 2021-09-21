const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Manage audio volume')
        .addIntegerOption(option => option
            .setName('int')
            .setDescription('int for control')),
    async execute(interaction, nanako) {
        interaction.reply("Move the slider yourself poopyhead")
    }
};