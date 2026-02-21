const { ContainerBuilder, MessageFlags } = require('discord.js');

async function handleGithubEvent(event, payload, channel) {
    if (event !== 'push') {
        return;
    }

    const repo = payload.repository?.full_name;
    const pusher = payload.pusher?.name;
    const commits = Array.isArray(payload.commits) ? payload.commits : [];
    const commitMessage =
    commits.length > 0
        ? commits
            .map(c => `• ${c.message?.split('\n')[0] || '(no message)'}`)
            .join('\n')
        : '(no commits in payload)';


    const gitPushContainer = new ContainerBuilder()
        .setAccentColor(0xf2af5c)
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
            `Push by **${pusher}** in repo: **${repo}**.`,
            ),
        )
        .addSeparatorComponents((separator) => separator)
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
            `**Messages:**\n${commitMessage}`,
            ),
        );

    await channel.send({
        components: [gitPushContainer],
        flags: MessageFlags.IsComponentsV2,
    });
}

module.exports = { handleGithubEvent };