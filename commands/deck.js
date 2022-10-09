const _ = require('lodash');
const axios = require('axios');
const Card = require('../Card');
const Strings = require('../Strings');

const {
    EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deck')
        .setDescription('Search for and display a single deck.')
        .addStringOption(option =>
            option.setName('deck')
                .setDescription("Enter a deck's code or FaB DB url.")
                .setRequired(true)
        ),

    help: {
        name: "deck",
        category: "Decks",
        description: "Search for and display a single deck.",
        examples: [
            "deck https://fabdb.net/decks/build/HfDadVsa",
            "deck https://fabdb.net/decks/HfDadVsa",
            "deck HfDadVsa",
        ]
    },

    async execute(interaction) {
        const embed = new EmbedBuilder();
        const input = interaction.options.getString('deck');
        const deckSlug = Strings.deckSlug(input);

        await axios.get(`https://api.fabdb.net/decks/${deckSlug}`).then(response => {
            let deck = response.data;
            let cards = deck.cards
            let hero = Card.hero(cards);

            let weapons = Card.weapons(cards).map(card => {
                let weapon = card.name;
                if (card.total > 1) {
                    weapon += ' (' + card.total + ')';
                }
                return weapon;
            }).join(', ');

            let equipment = Card.equipment(cards).map(card => {
                return card.name;
            }).join(', ');

            let deckText = _.sortBy(Card.other(cards), card => card.stats.resource).map(card => {
                let colours = {1: 'red', 2: 'yellow', 3: 'blue'};
                let text = card.total + 'x ' + card.name;

                if (card.stats && card.stats.resource) {
                    text += ' (' + colours[card.stats.resource] + ')';
                }

                return text;
            }).join("\r\n");

            embed.setColor('#666666');
            embed.setTitle(deck.name);
            embed.setThumbnail(Card.thumbnail(hero));
            embed.setURL(`https://fabdb.net/decks/${deckSlug}`);
            embed.addFields(
                {name: "Hero", value: hero.name},
                {name: "Weapons", value: weapons},
                {name: "Equipment", value: equipment},
            )
            embed.setDescription(deckText);
            embed.setFooter({text: "Deck crafted @ fabdb.net", iconURL: "https://fabdb.net/img/favicon-32x32.png"});
        });

        await interaction.reply({embeds: [embed]});
    }
};
