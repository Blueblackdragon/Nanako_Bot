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
                console.log(player._state.status)
                if (player._state.status == "idle"){
                                const resource = createAudioResource(join(__dirname, "../Nanakao_hello_2.mp3"), { inlineVolume: true });
                                console.log(resource)
                                resource.volume.setVolume(4);
                                connection.subscribe(player);
                                player.play(resource);
                }
            }
        }
        console.log(oldState)
    }
};
