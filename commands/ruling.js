const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

const Strings = require('../Strings');
const CardSearch = require('../CardSearch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ruling')
        .setDescription("Search for and display a single card's FAQs and errata.")
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Enter a card name.')
                .setRequired(true)
        ),

    help: {
        name: "ruling",
        category: "Cards",
        description: "Search for and display a single card's FAQs and errata.",
        examples: [
            "ruling ARC000",
            "ruling eye",
            "ruling plunder run"
        ]
    },

    async execute(interaction) {
        const embed = new EmbedBuilder();
        const input = interaction.options.getString('name');

        let card = await CardSearch.findDepending(input);

        if (!card) {
            interaction.reply('Sorry, no cards matching that name :pensive:');
            return;
        }

        embed.setTitle(card.name + ' - ' + card.identifier + '-' + card.rarity.toUpperCase());
        embed.setThumbnail(card.image);
        embed.setURL("https://fabdb.net/cards/" + card.identifier);

        if (card.rulings) {
            embed.setDescription(card.rulings.map(ruling => ruling.description ).join('\r\n\r\n'));
        }

        embed.setFooter({text: "View more @ fabdb.net", iconURL: "https://fabdb.net/img/favicon-32x32.png"});

        await interaction.reply({ embeds: [embed]});
    }
};
