const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
const { handleGithubEvent } = require('./githubNotifier');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.MessageContents,
] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} us missing a required "data" or "execute" property`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token



const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('GET request to homepage');
});

app.post('/webhooks/github', async (req, res) => {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    console.log(`Github webhook received of type ${event}`);
    console.log(payload);

    if (!client.targetChannel) {
        console.error('Channel not ready');
        return res.status(500).send('Discord channel not ready');
    }

    await handleGithubEvent(event, payload, client.targetChannel);

    res.status(200).send('Webhook received');
});

client.login(process.env.TOKEN);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// change to test bot
