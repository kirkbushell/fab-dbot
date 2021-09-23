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
            return card.type === 'hero';
        })[0];
    },

    equipment(cards) {
        return cards.filter(card => {
            return card.type === 'equipment';
        });
    },

    weapons(cards) {
        return cards.filter(card => {
            return card.type === 'weapon';
        });
    },

    other(cards) {
        return cards.filter(card => {
            return card.type !== 'weapon' &&
                card.type !== 'equipment' &&
                card.type !== 'hero';
        });
    },

    thumbnail(hero) {
        let imageName = hero.name.split(/[\s,]/)[0];

        return 'http://images.fabdb.net/heroes/' + imageName.toLowerCase() + '.jpg';
    }
};
