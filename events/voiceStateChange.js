const { getVoiceConnection, createAudioResource, StreamType, createAudioPlayer } = require('@discordjs/voice');

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
                    setTimeout(() => {
                                const resource = createAudioResource('https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/77/Cow_hurt1.ogg/revision/latest?cb=20120528164556', {
                                    inputType: StreamType.Arbitrary});
                                connection.subscribe(player);
                                player.play(resource);
                    }, 500);
                }
            }
        }
    }
};
