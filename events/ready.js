module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.logger.log('Connected');
        client.logger.log('Logged in as: ' + client.user.username);
    }
};