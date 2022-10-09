const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show a list of commands available'),

    help: {
        name: "help",
        category: "System",
        description: "Displays all the available commands for your permission level.",
        usage: "help [command]"
    },

    async execute(interaction) {
        const embed = new EmbedBuilder();
        const client = interaction.client;

        // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = client.commands;
        console.log(myCommands);

        let currentCategory = "";
        let output = `= Command List =\n\n[Use /help [command name] for details]\n`;
        const sorted = myCommands.map(command => command.help).sort((p, c) => p.category > c.category ? 1 :  p.name > c.name && p.category === c.category ? 1 : -1 );

        embed.setColor('#cccccc');
        embed.setTitle('Help - Commands');
        embed.setDescription('Help regarding the various commands you can use on me.');
        embed.setFooter({ text: "Created by fabdb.net", iconURL: "https://fabdb.net/img/favicon-32x32.png"});

        sorted.forEach(c => {
            let description = c.description;

            if (c.examples) {
                description += "\r\n**Examples**:";

                c.examples.forEach(example => {
                    description += "\r\n/" + example;
                });

                description += "\r\n";
            }

            embed.addFields({name: c.name, value: description});
        });

        await interaction.reply({ embeds: [embed]});
    }
};
