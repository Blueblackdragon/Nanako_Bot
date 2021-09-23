const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, StreamType, AudioPlayerStatus, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { Globals } = require('../../globals.js');
const play = require("play-dl");
const { join } = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a channel'),
	async execute(interaction, nanako) {
        if(!interaction.member.voice.channelId) return interaction.reply({ content: "Join a channel first dummy", ephemeral: true});
		var connection = getVoiceConnection(interaction.member.guild.id);
        if (connection) return interaction.reply({content: "I'm already home dummy Onii-chan"})
        var connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });
            var resource = createAudioResource(join(__dirname, '../../first_try_hello.mp3'), { inlineVolume: true })
            resource.volume.setVolume(1.5);
            connection.subscribe(Globals.player);
            Globals.player.play(resource);
            setTimeout(() => {
                Globals.player.on(AudioPlayerStatus.Idle, async () => {
                    console.log(connection._state.subscription.player._state.status)
                    if(Globals.queue.length > 0) {
                        var entry = Globals.queue.shift();
                        if (Globals.isLooping == true){
                            Globals.queue.push(entry)
                        }
                        var stream = await play.stream(entry);
                        resource = createAudioResource(stream.stream, { inputType: stream.type, inlineVolume: true });
                        resource.volume.setVolume(Globals.volume)
                        await Globals.player.play(resource);

                        var video = await play.video_basic_info(entry)
                        console.log(video.video_details.title)

                        interaction.channel.send({content: `Now playing this ${video.video_details.title}`})
                        console.log(Globals.queue)
                    }
                })
                //console.log(Globals.player)
            }, 2000);
            interaction.reply("Joining~");
	},
};