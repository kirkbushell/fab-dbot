module.exports = {
    name: 'error',
    once: false,
    execute(client, error) {
        client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
    }
};