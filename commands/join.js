const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, StreamType, AudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a channel'),
	async execute(interaction) {
        if(!interaction.member.voice.channelId) return interaction.reply({ content: "Join a channel first dummy", ephemeral: true});
		const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });
        interaction.reply("Joining~");
        const player = createAudioPlayer();
        const resource = createAudioResource('https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/77/Cow_hurt1.ogg/revision/latest?cb=20120528164556', {
		inputType: StreamType.Arbitrary,
	});// replace audio resource with nanako's voice welcome home
        connection.subscribe(player);
	player.play(resource);
        setTimeout(() => {
            console.log(player._state)
        }, 3000);
        return player;
	},
};