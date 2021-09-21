const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('audio')
		.setDescription('Manage audio')
        .addSubcommand(subcommand => subcommand
            .setName('pause')
            .setDescription('Pause the current track'))
        .addSubcommand(subcommand => subcommand
            .setName('unpause')
            .setDescription('Unpauses the current track'))
        .addSubcommand(subcommand => subcommand
            .setName('stop')
            .setDescription('Stops all Audio listeners on Idle')),
	async execute(interaction, nanako, player, queue) {
        const connection = getVoiceConnection(interaction.member.guild.id)
        if (interaction.options.getSubcommand() == 'pause'){
            connection._state.subscription.player._state.status = 'paused';
        } else if (interaction.options.getSubcommand() == 'unpause'){
            connection._state.subscription.player._state.status = 'playing';
        } else if (interaction.options.getSubcommand() == 'stop'){
            player.removeAllListeners(AudioPlayerStatus.Idle);
            console.log("stopped listeners")
            return interaction.reply("Stopped the music")
        }
	},
};