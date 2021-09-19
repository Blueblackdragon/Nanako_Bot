const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');


module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState, player) {
        var user = (oldState.id);
        var bot = (oldState.client.user.id)
        console.log(user, bot, 20)
        if (user != bot) {
            console.log(user)
            console.log(oldState.client.user)
            console.log(oldState.client)
	}}
};
