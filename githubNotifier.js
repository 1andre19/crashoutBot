const { ContainerBuilder, MessageFlags } = require('discord.js');

async function handleGithubEvent(event, payload, channel) {
    if (event !== 'push') {
        return;
    }

    const repo = payload.repository?.full_name;
    const pusher = payload.pusher?.name;
    const commits = payload.commits?.length || 0;
    const commitMessage = payload.commits?.message;

    const message = `Push detected in ${repo} by ${pusher}. ${commits} commit(s).`;

    const gitPushContainer = new ContainerBuilder()
        .setAccentColor(f2af5c)
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
            `Push by **${pusher}** in repo: **${repo}**.`,
            ),
        )
        .addSeparatorComponents((separator) => separator)
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
            `**Message**:
            ${commitMessage}`,
            ),
        );

    await channel.send({
        components: [gitPushContainer],
        flags: MessageFlags.IsComponentsV2,
    });
}

module.exports = { handleGithubEvent };