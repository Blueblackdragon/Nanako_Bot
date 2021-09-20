const { getVoiceConnection, createAudioResource, StreamType, createAudioPlayer } = require('@discordjs/voice');
const { join } = require('path');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        var user = (newState.id);
        var bot = (oldState.client.user.id)
        if ((user != bot)){
            const connection = getVoiceConnection(newState.guild.id)
            if (newState.channelId === null) {
                console.log("user left", oldState.channelId)
            } else if (oldState.channelId === null) {
                console.log("user joined", newState.channelId)
                const player = createAudioPlayer();
                bot = undefined;
                user = undefined;
                if (player._state.status == "idle"){
                    const resource = createAudioResource(join(__dirname, '../Nanako_hello.mp3'), { inlineVolume: true });
                    resource.volume.setVolume(3);
                    connection.subscribe(player);
                    player.play(resource);
                }
            }
        }
    }
};
