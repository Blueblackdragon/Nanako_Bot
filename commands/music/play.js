const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const play = require("play-dl");
const { Globals } = require('../../globals.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction, nanako) {
		var url = interaction.options.getString("input");    
		var check = play.yt_validate(url);

		console.log(check)
		if (!check) return interaction.reply("That's not even a video!")
        if (check === "playlist") return interaction.reply("Playlists are difficult to play Onii-chan...")

		var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}
		connection.subscribe(Globals.player);
		try {
			let yt_info = await play.video_info(url)
			console.log(yt_info.video_details.title) 
		} catch (error) {
			return interaction.reply("How can I play a song that doesn't exist?")
		}
		//Globals.queue.push(url);

		var stream = await play.stream(url);
		resource = createAudioResource(stream.stream, { inlineVolume: true , inputType: stream.type });
		resource.volume.setVolume(Globals.volume)
		Globals.player.play(resource);
	interaction.reply({ content: `Now Playing: ${url}`});
}};
