const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
const { getVoiceConnection, AudioPlayer, PlayerSubscription, AudioPlayerStatus, NoSubscriberBehavior,  } = require('@discordjs/voice');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('q')
		.setDescription('Manage the queue')
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Add song to q')
            .addStringOption(option => option.setName('input').setDescription('Urls only please').setRequired(true)),)
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Remove song from q'))
        .addSubcommand(subcommand => subcommand
            .setName('loop')
            .setDescription('Loops the q'))
        .addSubcommand(subcommand => subcommand
            .setName('clear')
            .setDescription('Clears the q')),
	async execute(interaction, nanako, player, queue) {
        var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}
        connection.subscribe(player);


        if (interaction.options.getSubcommand() == 'add'){
            let url = interaction.options.getString("input");    
            queue.push(url);

            player.on(AudioPlayerStatus.Idle, async () => {
                if(queue.length > 0) {
                    var entry = await queue.shift();
                    stream = await play.stream(entry);
                    console.log(queue)
                    resource = createAudioResource(stream.stream, { inputType: stream.type }, { inlineVolume: true });
                    //interaction.followUp({content: `Now playing this ${entry}`})
                    await player.play(resource);
                }
            })
        }
        if (interaction.options.getSubcommand() == 'clear'){
            console.log(queue);
            queue = [];
            console.log(queue)
            return queue, interaction.reply("cleared the q")
        }
    }
};