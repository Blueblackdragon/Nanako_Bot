const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { Globals } = require('../globals.js');
const play = require("play-dl");
const { join } = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song'),
	async execute(interaction) {
        var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}
        connection.subscribe(Globals.player);

        let url = Globals.queue[0]
        var stream = await play.stream(url);
        
        interaction.reply("Skipping current song"),
        Globals.queue.shift();

        resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });

        Globals.player.play(resource);
        return interaction.followUp(`Skipped song`);
        }
};