const { Events } = require('discord.js');
const { channelId } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		try {
			const targetChannel = await client.channels.fetch(channelId);
			console.log(`Channel fetched ${targetChannel.name}`);
			console.log(`Channel's last message ${targetChannel.messages.fetch({limit: 1})}`);
		} catch (err) {
			console.error('Failed to fetch channel: ', err);
		}

	},
};