const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { Globals, cacheVideo } = require('../../globals.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction, nanako) {
		var url = interaction.options.getString("input");    

		var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			})
		}
		connection.subscribe(Globals.player);

		try {
			var stream = cacheVideo(url, "./videoCache.json");
		} catch (error) {
			return interaction.reply("How can I play a song that doesn't exist?")}

		resource = createAudioResource(stream, { inlineVolume: true });
		resource.volume.setVolume(Globals.volume)

		Globals.player.play(resource);

	interaction.reply({ content: `Now Playing: ${url}`});
}};

