const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Globals } = require('../../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, nanako) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('BURNING PETALS')
					.setStyle('DANGER'),
			)
		interaction.reply({ content: `It takes ${nanako.ws.ping}ms to Pong!`, components: [row] });
	}
};
