const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const { Globals, cacheVideo, checkTitleDB} = require('../../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('q')
		.setDescription('Manage the queue')
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Add song to queue')
            .addStringOption(option => option.setName('input').setDescription('Urls only please').setRequired(true)),)
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Remove song from queue, no workie dont use'))
        .addSubcommand(subcommand => subcommand
            .setName('loop')
            .setDescription('Loops the q'))
        .addSubcommand(subcommand => subcommand
            .setName('clear')
            .setDescription('Clears the q'))
        .addSubcommand(subcommand => subcommand
            .setName('list')
            .setDescription('Lists the songs in the queue')),
	async execute(interaction, nanako) {
        var connection = getVoiceConnection(interaction.guild.id);
		if (!connection){
			var connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator,
			});
		}
        connection.subscribe(Globals.player);


        if (interaction.options.getSubcommand() == 'list'){
            const embed = new MessageEmbed()
            .setTitle(`Server Queue for ${interaction.guild.name}`)
            .setColor([225, 0, 255])
            for (let i=0; i < Globals.queue.length; i++){
                const { title, author, length } = await checkTitleDB(Globals.queue[i], "./titleCache.json");
                embed.addField(`~~~~~~~~~~~~~`, `${i+1}) ${title} |~~| by Creator: ${author} |~~| Length: ${length}`);
            }
            return interaction.reply({ embeds: [embed], content: `Heres the song queue`});
        }


        if (interaction.options.getSubcommand() == 'loop'){
            Globals.isLooping = !Globals.isLooping;
            if (Globals.isLooping == true) return interaction.reply('Now Looping the queue');
            if (Globals.isLooping == false) return interaction.reply('No longer looping');
        }


        if (interaction.options.getSubcommand() == 'add'){

            var url = interaction.options.getString("input");
            
            for (let song of Globals.queue) {
                if(song == url) {
                    return interaction.reply({content: `Song already exists, not adding it BAKA!`});
                }
            }

            Globals.queue.push(url);

            if (Globals.player.state.status == "idle"){

                try {
                    var stream = cacheVideo(url, "./videoCache.json");
                } catch (error) {
                    return interaction.reply("How can I play a song that doesn't exist?");
                }

                resource = createAudioResource(stream, { inlineVolume: true });
                resource.volume.setVolume(Globals.volume);
                Globals.player.play(resource);
            }
            return interaction.reply({content: `Added ${url} to the queue`});
        }


        if (interaction.options.getSubcommand() == 'clear'){

            console.log(Globals.queue);
            Globals.queue.length = 0;
            console.log(Globals.queue);
            return interaction.reply("Cleared the queue");
        }
    }
};