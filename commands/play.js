const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType, entersState, getVoiceConnection, AudioResource, AudioPlayer } = require('@discordjs/voice');
const { Client, VoiceChannel, Intents } = require('discord.js');
const { fs } = require('fs');
const play = require("play-dl");
const { https } = require("https");



module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction, nanako, player, queue) {
		console.log(queue)
		var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}

		connection.subscribe(player);

		let url = interaction.options.getString("input");    
		//queue.push(url);

		var stream = await play.stream(url);
		resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
		player.play(resource);
		
		player.on(AudioPlayerStatus.Idle, async () => {
				if(queue.length > 0) {
					var entry = await queue.shift();
					stream = await play.stream(entry);
					console.log(queue)
					resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
					//interaction.followUp({content: `Now playing this ${entry}`})
					await player.play(resource);
				}
				// if (queue.length = 0) {
				// 	player.removeAllListeners(AudioPlayerStatus.Idle)
				// 	entry = "";
				// 	queue = [];
				// 	stream = {};
				// 	console.log(queue, entry, stream);
				// 	interaction.followUp("Done playing all songs");
				// 	return queue;
				// }
		});
		
		setTimeout(() => {
			console.log(player)
		}, 3000);

        // const url = interaction.options.getString("input");
        // console.log(url);
        // let stream = await play.stream(url);
        // const connection = getVoiceConnection(interaction.member.guild.id);

        // const resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        // connection.subscribe(player);
        // console.log(player._state.status)
		module.exports = {
			cleanUp: function(){
				entry = "";
				queue = [];
				stream = {};
			}
	}
	interaction.reply({ content: `Now Playing: ${url}`});
	return player, queue;
}};

