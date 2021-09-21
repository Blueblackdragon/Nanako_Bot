const { createAudioPlayer } = require("@discordjs/voice")


const Globals = {
	isLooping: false,
	queue: [],
	player: createAudioPlayer(),
}
module.exports = { Globals }

