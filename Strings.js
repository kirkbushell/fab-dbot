const marked = require('marked');
const Discord = require('discord.js');

module.exports = {
    prettified: function(text) {
        let content = text.split('\n');

        content = content.map(line => {
            let regex = new RegExp(/\[([+-])?(([X0-9]{1})\s)?([a-z]+)\]/);

            while (true) {
                let matches = regex.exec(line);

                if (!matches) {
                    return line;
                }

                let modifier = matches[1];
                let amount = matches[3];
                let effect = this.effectEmoji(matches[4]);
                let string = '';

                if (modifier) {
                    string = modifier + amount + effect;
                } else if (amount) {
                    for (let x = 0; x < amount; x++) {
                        string += effect;
                    }
                } else {
                    string += effect;
                }

                line = line.replace(matches[0], string, line);
            }
        });

        return content.join('\n');
    },

    effectEmoji(effect) {
        let emojis = {
            'defense': ':def:643238621981311006',
            'life': ':hea:643238674166710282',
            'attack': ':att:643238710498033707',
            'resource': ':res:643238742752100362',
        };

        return '<'+emojis[effect]+'>';

    }
};
