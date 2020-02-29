const express = require('express');
const fetch = require('node-fetch');
const util = require('util');
const app = express();
const port = 8000;

var cors = require('cors')

var whitelist = ['http://localhost', 'http://localhost:3000']
var copts = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS Restricted'))
    }
  }
}


const SEARCH_URL = 'https://api.stocktwits.com/api/2/streams/symbol/%s.json';

app.get('/search', cors(copts), (req, res) => {
    let input = req.query.q;
    // santize
    input = input.replace(/[^A-Za-z0-9 ]/g,'');

    if(input === ''){
        res.send('[]');
    }
    

    console.log('req', input);
    // parse
    const symbolList = input.split(' ');

    // retrieve
    const pList = [];
    symbolList.forEach(symbol => {
        const url = util.format(SEARCH_URL, symbol);
        console.log('fetching', url);
        const prom = fetch(url).then(response => response.json());
        pList.push(prom);
    });
    Promise.all(pList).then(results => {
        try{
            const parsed = parseResults(results);
            res.send(JSON.stringify(parsed));
        }catch(e){
            console.error('parse error', e);
            throw e;
        }
    }).catch(err => {
        res.sendStatus('500');
        console.error('request error', JSON.stringify(err));
    });

});

/**
 * Parses results
 * 
 * @param {Array<Object>} results results from stocktwit
 * 
 * @returns {Array<Object>} Returns results parsed into useable form. Sorted descending by date
 */
function parseResults(results) {
    // use hash to ensure unique
    const messages = {};

    // TODO use caching to determine whether there's new results. use 'since' field possibly
    // extract all messages
    results.forEach(list => {
        // check for errors and append nothing if so
        if(list.response.status !== 200){
            return;
        }
        list.messages.forEach(msg => {
            messages[msg.id] = {
                id: msg.id,
                date: Date.parse(msg.created_at),
                content: msg.body,
                user: msg.user.username,
                icon: msg.user.avatar_url,
                // extra: which symbols in there
                symbols: msg.symbols.map(sym => sym.symbol)
            };
        })
    });
    
    const ret = Object.values(messages);
    // sort all messages descending by date
    ret.sort((a,b) => b.date - a.date);
    return ret;
}

app.listen(port, () => console.log(`Server started on ${port}!`));
