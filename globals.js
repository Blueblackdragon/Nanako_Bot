const { createAudioPlayer } = require("@discordjs/voice")


const Globals = {
	isLooping: false,
	queue: [],
	player: createAudioPlayer(),
	volume: 0.5
}
module.exports = { Globals }

