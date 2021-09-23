const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args, level) => {
    // If no specific command is called, show all filtered commands.
    if (!args[0]) {
        // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

        // Here we have to get the command names only, and we use that array to get the longest name.
        // This make the help commands "aligned" in the output.
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        let currentCategory = "";
        let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

        const embed = new MessageEmbed();

        embed.setColor('#cccccc');
        embed.setTitle('Help - Commands');
        embed.setDescription('Help regarding the various commands you can use on me.');
        embed.setFooter("Created by fabdb.net", "https://fabdb.net/img/favicon-32x32.png");

        sorted.forEach( c => {
            const cat = c.help.category.toProperCase();

            if (currentCategory !== cat) {
                output += `\u200b\n== ${cat} ==\n`;
                currentCategory = cat;
            }

            let description = c.help.description;

            if (c.help.examples) {
                description += "\r\n**Examples**:";
                c.help.examples.forEach(example => {
                    description += "\r\n" + message.settings.prefix + example;
                });
                description += "\r\n";
            }

            embed.addField(c.help.name, description);
        });

        message.channel.send({embeds: [embed]});
    } else {
        // Show individual command's help.
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\n= ${command.help.name} =`, {code:"asciidoc"});
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
};