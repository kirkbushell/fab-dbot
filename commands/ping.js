const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    help: {
        name: "ping",
        category: "System",
        description: "Ping the bot and hope for a response!",
        usage: "ping"
    },

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
