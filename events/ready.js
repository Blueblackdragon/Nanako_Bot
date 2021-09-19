module.exports = {
	name: 'ready',
	once: true,
	execute(nanako) {
		console.log(`Ready! Logged in as ${nanako.user.tag}`);
		nanako.user.setActivity('the news', { type: 'WATCHING' });
	}
};
