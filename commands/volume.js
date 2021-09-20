const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Manage audio volume')
        .addIntegerOption(option => option
            .setName('int')
            .setDescription('int for control')),
    async execute(interaction) {
        const integer = interaction.options.getInteger('int');
        const { resource } = require("./play.js")
        console.log(resource);
        resource.volume.setVolume(integer);
        return interaction.reply({ content: `Volume is now set to ${integer}`, ephemeral: true });
        //connection.setVolume(integer);
    }
};