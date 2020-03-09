const express = require('express');
const fetch = require('node-fetch');
const util = require('util');
const app = express();
const port = 8000;

var cors = require('cors')

var copts = {
  origin: function (origin, callback) {
    // allow all
    callback(null, true);
  }
}


const SEARCH_URL = 'https://api.stocktwits.com/api/2/streams/symbol/%s.json';

app.get('/search', cors(copts), (req, res) => {
    let input = req.query.q;
    // santize
    input = input.replace(/[^A-Za-z0-9 ]/g,'');

    if(input === ''){
        res.send(JSON.stringify({errors:[], results: []}));
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
            const parsed = parseResults(symbolList, results);
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
 * @param {Array<String>} symbolList original search terms
 * @param {Array<Object>} results results from stocktwit
 * 
 * @returns {Array<Object>} Returns results parsed into useable form. Sorted descending by date
 */
function parseResults(symbolList, results) {
    // use hash to ensure unique
    const messages = {};
    const errorList = [];

    // TODO use caching to determine whether there's new results. use 'since' field possibly
    // extract all messages
    results.forEach((list, i) => {
        // check for errors and append nothing if so
        if(list.response.status !== 200){
            const errors = {
                status: list.response.status,
                symbol: symbolList[i],
                messages: []
            };
            list.errors.forEach(error => errors.messages.push(error.message))
            errorList.push(errors);
            return;
        }
        list.messages.forEach(msg => {
            messages[msg.id] = {
                id: msg.id,
                date: Date.parse(msg.created_at),
                // strip html tags out, but allow for html special codes like &amp;
                content: msg.body.replace(/[<>]/g, ''),
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

    return {
        errors: errorList,
        results: ret
    };
}

app.listen(port, () => console.log(`Server started on ${port}!`));
