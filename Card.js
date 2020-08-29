module.exports = {
    identifierParts(identifier) {
        return identifier.match(/.{3}/g);
    },

    set(identifier) {
        return this.identifierParts(identifier)[0];
    },

    id(identifier) {
        return this.identifierParts(identifier)[1];
    },

    imageId(identifier) {
        return this.id(identifier).replace(/^0+/, '');
    },

    hero(cards) {
        return cards.filter(card => {
            return card.keywords[1] == 'hero';
        })[0];
    },

    equipment(cards) {
        return cards.filter(card => {
            return card.keywords[1] == 'equipment';
        });
    },

    weapons(cards) {
        return cards.filter(card => {
            return card.keywords[1] == 'weapon';
        });
    },

    other(cards) {
        return cards.filter(card => {
            return card.keywords.indexOf('weapon') == -1 &&
                card.keywords.indexOf('equipment') == -1 &&
                card.keywords.indexOf('hero') == -1;
        });
    },

    thumbnail(hero) {
        let imageName = hero.name.split(/[\s,]/)[0];

        return 'http://images.fabdb.net/heroes/' + imageName.toLowerCase() + '.jpg';
    }
};
