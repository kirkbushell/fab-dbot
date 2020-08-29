const axios = require('axios');

module.exports = {
    url: 'https://api.fabdb.net/cards',

    any: async function(params) {
        let url = this.url+'/first';

        if (params.length > 1) {
            let colour = params[0];
            let resource = {'red': 1, 'yellow': 2, 'blue': 3}[colour];

            // they're searching with colour in mind
            if (resource) {
                params = params.slice(1);
            }

            let keywords = encodeURI(params.join(' '));

            url += '?name=' + keywords;

            if (resource) {
                url += '&pitch=' + resource;
            }
        } else {
            url += '?name='+params[0];
        }

        return axios.get(url).then(response => response.data);
    },

    find: async function(identifier) {
        return axios.get(this.url+'/'+identifier).then(response => response.data);
    },

    findDepending: async function(params) {
        if (params[0].match(/^[a-z]{3}[0-9]{3}$/i)) {
            return await this.find(params[0]);
        }

        return await this.any(params);
    }
};