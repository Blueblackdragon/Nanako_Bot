const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Have Nanako flip a coin for you'),
	async execute(interaction) {
        interaction.reply("Ok, I'm flipping the coin now")
		setTimeout(() => {
            const number = Math.random();
            console.log(number)
            const coin = Math.round(number);
            console.log(coin)
            if (number === 0.5) {
                return interaction.followUp(`On its side... "So what will it be? Do we both win, or do we both lose?" "I say we both win."`);
            }
            else {
                if(coin === 1) return interaction.followUp('The coin landed on heads!');
                if (coin === 0) return interaction.followUp('The coin says tails!')
        }
        }, 3000); 
	}
};