const axios = require('axios');
const Card = require('../Card');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (!args[0]) {
        message.reply('you forgot to provide the FaB DB deck ID. Eg. !deck TyhgaVD');
        return;
    }

    axios.get('https://api.fabdb.net/decks/' + args[0]).then(response => {
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

        let deckText = Card.other(cards).map(card => {
            let colours = {1: 'red', 2: 'yellow', 3: 'blue'};
            let text = card.total + 'x ' + card.name;

            if (card.stats.resource) {
                text += ' (' + colours[card.stats.resource] + ')';
            }

            return text;
        }).join("\r\n");

        const embed = new MessageEmbed();

        embed.setColor('#666666');
        embed.setTitle(deck.name);
        embed.setThumbnail(Card.thumbnail(hero));
        embed.setURL("https://fabdb.net/decks/" + args[0]);
        embed.addField("Hero", hero.name, true)
        embed.addField("Weapons", weapons);
        embed.addField("Equipment", equipment);
        embed.setDescription(deckText);
        embed.setFooter("Deck crafted @ fabdb.net", "https://fabdb.net/img/favicon-32x32.png");

        message.channel.send({embed});
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: "User"
};

exports.help = {
    name: "deck",
    category: "Decks",
    description: "Search for and display a single deck.",
    examples: [
        "deck HfDadVsa",
    ]
};