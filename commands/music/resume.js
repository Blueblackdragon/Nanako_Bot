const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { Globals } = require('../../globals.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the music'),
	async execute(interaction, nanako) {
        const connection = getVoiceConnection(interaction.member.guild.id);

        if (!connection) return interaction.reply("I'm not home to pause the music");

        connection._state.subscription.player._state.status = 'playing';

        interaction.reply("Ok, I turned the music back on");
    }
}