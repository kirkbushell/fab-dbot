const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Strings = require('../Strings');
const CardSearch = require('../CardSearch');

exports.run = async (client, message, args, level) => {
    let card = await CardSearch.findDepending(args);

    if (!card) {
        message.reply('No cards matching that :pensive:');
        return;
    }

    const embed = new MessageEmbed();

    embed.setTitle(card.name + ' - ' + card.identifier + '-' + card.rarity.toUpperCase());
    embed.setImage(card.image);
    embed.setURL("https://fabdb.net/cards/" + card.identifier);

    if (card.stats.resource) {
        embed.addField("Resource", card.stats.resource, true);
    }
    if (card.stats.cost) {
        embed.addField("Cost", card.stats.cost, true);
    }
    if (card.stats.defense) {
        embed.addField("Defense", card.stats.defense, true);
    }
    if (card.stats.attack) {
        embed.addField("Power", card.stats.attack, true);
    }
    if (card.stats.life) {
        embed.addField("Life", card.stats.life, true);
    }
    if (card.stats.intellect) {
        embed.addField("Intellect", card.stats.intellect, true);
    }

    if (card.text) {
        embed.setDescription(Strings.prettified(card.text));
    }

    embed.setFooter("View more @ fabdb.net", "https://fabdb.net/img/favicon-32x32.png");

    message.channel.send({embeds: [embed]});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: "User"
};

exports.help = {
    name: "card",
    category: "Cards",
    description: "Search for and display a single card.",
    examples: [
        "card WTR000",
        "card heart",
        "card red warrior's valor"
    ]
};