const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');
const { Globals } = require('../globals.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Manage audio volume')
        .addIntegerOption(option => option
            .setName('int')
            .setDescription('Numbers between 1 and 200 please')),
    async execute(interaction, nanako) {
        let int = interaction.options.getInteger("int")
        if (int > 200) return interaction.reply("Number can't be above 200");
        if (int < 0) return interaction.reply("The volume can't be below 0, how would that even work?");
        int = int/100
        Globals.volume = int;
        resource.volume.setVolume(Globals.volume);
        interaction.reply("Move the slider yourself poopyhead")
    }
};