const { getVoiceConnection, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { join } = require('path');
const { Globals } = require('../globals.js');

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
                const player2 = createAudioPlayer();
                if (player2._state.status == "idle"){
                    var rng = Math.random();
                    if(rng === 0.5){
                        const resource = createAudioResource(join(__dirname, '../Nanako_VERY_LOUD.mp3'), { inlineVolume: true });
                        resource.volume.setVolume(30);
                        connection.subscribe(player2);
                        player2.play(resource);
                        setTimeout(() => {
                            connection.subscribe(Globals.player)
                        }, 2000);
                    } else {
                        const resource = createAudioResource(join(__dirname, '../Nanako_hello_2.mp3'), { inlineVolume: true });
                        resource.volume.setVolume(3);
                        connection.subscribe(player2);
                        player2.play(resource);
                        setTimeout(() => {
                            connection.subscribe(Globals.player)
                        }, 2000);
                    }
                }
            }
        }
    }
};
