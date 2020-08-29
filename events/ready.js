module.exports = async (client, error) => {
    client.logger.log('Connected');
    client.logger.log('Logged in as: ' + client.user.username);
};