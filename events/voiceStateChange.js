const { getVoiceConnection, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { join } = require('path');
const { Globals } = require('../globals.js');

module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        const louis = 281224322029453315n
        const connection = getVoiceConnection(newState.guild.id);
        if (!connection) return;

        var user = (newState.id);
        var bot = (oldState.client.user.id);
        
        if ((user != bot)){
            if (newState.channelId === null) {
                console.log("user left", oldState.id);
            } else if (oldState.channelId === null) {
                console.log("user joined", newState.id);
                const player2 = createAudioPlayer();

                if (player2._state.status == "idle"){
                    var rng = Math.random();
                    console.log(rng)

                    if ((rng === 0.5) && (louis == BigInt(newState.id))){

                        const resource = createAudioResource(join(__dirname, '../Nanako_VERY_LOUD.mp3'), { inlineVolume: true });
                        resource.volume.setVolume(30);

                        connection.subscribe(player2);

                        player2.play(resource);

                        setTimeout(() => {
                            connection.subscribe(Globals.player);
                        }, 2000);
                        
                    } else {
                        const resource = createAudioResource(join(__dirname, '../Nanako_hello_2.mp3'), { inlineVolume: true });
                        resource.volume.setVolume(2);

                        connection.subscribe(player2);

                        player2.play(resource);

                        setTimeout(() => {
                            connection.subscribe(Globals.player);
                        }, 2000);
                    }
                }
            }
        }
    }
};
