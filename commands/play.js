const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType, entersState, getVoiceConnection, AudioResource, AudioPlayer } = require('@discordjs/voice');
const { Client, VoiceChannel, Intents } = require('discord.js');
const { fs } = require('fs');
const play = require("play-dl");
const { https } = require("https");
const { join } = require('path');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)),
	async execute(interaction, nanako, player, queue) {
        const url = interaction.options.getString("input");
        queue.push(url)
        const connection = getVoiceConnection(interaction.guild.id);
        let entry = queue.shift();
        queue.push(entry)
        let stream = await play.stream(entry);
        let resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        //resource.volume.setVolume(0.5);
        connection.subscribe(player);
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, async () => {
            entry = queue.shift();
            queue.push(entry);
            stream = await play.stream(entry);
            console.log(queue)
            resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
            await player.play(resource);
        });
        






    

        // const resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        // const resource2 = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        // const resource3 = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
        // let resources_played = 0         
        // player.on(AudioPlayerStatus.Idle, async () => {
        //     if(resources_played === 0){
        //         player.play(resource2);
        //         resources_played ++
        // }
        //     else if(resources_played === 1) {
        //     player.play(resource3)
        //     resources_played++
        // }//https://www.youtube.com/watch?v=etYYf9ZNWTI
        // });
        


        console.log()
        return interaction.reply({ content: `Now Playing: url`, ephemeral: true })
}};

