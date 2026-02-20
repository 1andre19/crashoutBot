const { Events } = require('discord.js');
// const { channelId } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		try {
			const channel = await client.channels.fetch(process.env.CHANNEL_ID);

			client.targetChannel = channel;

			console.log(`Channel fetched ${channel.name}`);
		} catch (err) {
			console.error('Failed to fetch channel: ', err);
		}

	},
};