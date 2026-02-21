const { SlashCommandBuilder, MessageFlags, TextDisplayBuilder } = require('discord.js');

// another change

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
        const exampleTextDisplay = new TextDisplayBuilder().setContent(
	    'This text is inside a Text Display component! You can use **any __markdown__** available inside this component too.',
        );

        await interaction.reply({
            components: [exampleTextDisplay],
            flags: MessageFlags.IsComponentsV2,
        });
    },
};