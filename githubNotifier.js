async function handleGithubEvent(event, payload, channel) {
    if (event !== 'push') {
        return;
    }

    const repo = payload.repository?.full_name;
    const pusher = payload.pusher?.name;
    const commits = payload.commits?.length || 0;

    const message = `Push detected in ${repo} by ${pusher}. ${commits} commit(s).`;

    await channel.send(message);
}

module.exports = { handleGithubEvent };