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
	async execute(interaction, nanako, player) {
        const url = interaction.options.getString("input");
        console.log(url);
        let stream = await play.stream(url);
        const connection = getVoiceConnection(interaction.member.guild.id)
        //const player = createAudioPlayer();
        const resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        connection.subscribe(player);
        player.play(resource);
        return player, interaction.reply(`Now Playing: ${url}`)
}};

