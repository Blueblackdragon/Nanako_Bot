const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const play = require("play-dl");
const { Globals } = require('../globals.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction, nanako) {
		var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}
		connection.subscribe(Globals.player);

		let url = interaction.options.getString("input");    
		//Globals.queue.push(url);

		var stream = await play.stream(url);
		resource = createAudioResource(stream.stream, { inlineVolume: true , inputType: stream.type });
		resource.volume.setVolume(Globals.volume)
		Globals.player.play(resource);
	interaction.reply({ content: `Now Playing: ${url}`});
}};

