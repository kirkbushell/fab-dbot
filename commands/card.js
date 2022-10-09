const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

const Strings = require('../Strings');
const CardSearch = require('../CardSearch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('card')
        .setDescription('Search for and display a single card.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Enter a card name.')
                .setRequired(true)
        ),

    help: {
        name: "card",
        category: "Cards",
        description: "Search for and display a single card.",
        examples: [
            "card WTR000",
            "card heart",
            "card red warrior's valor"
        ]
    },

    async execute(interaction) {
        const embed = new EmbedBuilder();
        const client = interaction.client;
        const input = interaction.options.getString('name');

        client.logger.log("Searching for: ["+input+"]");

        let card = await CardSearch.findDepending(input);

        if (!card) {
            interaction.reply('No cards matching that name :pensive:');
            return;
        }

        client.logger.log("Found card ["+card.identifier+"]");

        embed.setTitle(card.name);
        embed.setImage(card.image);
        embed.setURL("https://fabdb.net/cards/" + card.identifier);

        if (card.stats.resource) {
            embed.addFields({name: "Resource", value: String(card.stats.resource)});
        }
        if (card.stats.cost) {
            embed.addFields({name: "Cost", value: String(card.stats.cost)});
        }
        if (card.stats.defense) {
            embed.addFields({name: "Defense", value: String(card.stats.defense)});
        }
        if (card.stats.attack) {
            embed.addFields({name: "Power", value: String(card.stats.attack)});
        }
        if (card.stats.life) {
            embed.addFields({name: "Life", value: String(card.stats.life)});
        }
        if (card.stats.intellect) {
            embed.addFields({name: "Intellect", value: String(card.stats.intellect)});
        }

        if (card.text) {
            embed.setDescription(Strings.prettified(card.text));
        }

        embed.setFooter({text: "View more @ fabdb.net", iconURL: "https://fabdb.net/img/favicon-32x32.png"});

        await interaction.reply({ embeds: [embed]});
    }
};
