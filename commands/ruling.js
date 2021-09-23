const { MessageEmbed } = require('discord.js');
const CardSearch = require('../CardSearch');

exports.run = async (client, message, args, level) => {
    let card = await CardSearch.findDepending(args);

    if (!card) {
        message.reply('Sorry, no cards matching that :pensive:');
        return;
    }

    const embed = new MessageEmbed();

    embed.setTitle(card.name + ' - ' + card.identifier + '-' + card.rarity.toUpperCase());
    embed.setThumbnail(card.image);
    embed.setURL("https://fabdb.net/cards/" + card.identifier);

    if (card.rulings) {
        embed.setDescription(card.rulings.map(ruling => ruling.description ).join('\r\n\r\n'));
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
    name: "ruling",
    category: "Decks",
    description: "Search for and display rulings for a specific card.",
    examples: [
        "ruling ARC000",
        "ruling eye",
        "ruling plunder run"
    ]
};