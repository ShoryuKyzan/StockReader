const express = require('express');
const fetch = require('node-fetch');
const util = require('util');
const app = express();
const port = 8000;

const SEARCH_URL = 'https://api.stocktwits.com/api/2/streams/symbol/%s.json';

app.get('/search', (req, res) => {
    let input = req.query.q;
    // santize
    input = input.replace(/[^A-Za-z0-9 ]/g,'');
    

    console.log('req', input);
    // parse
    const symbolList = input.split(' ');
    res.send(symbolList);

    // retrieve
    const pList = [];
    symbolList.forEach(symbol => {
        const url = util.format(SEARCH_URL, symbol);
        console.log('fetching', url);
        const prom = fetch(url).then(response => response.json());
        pList.push(prom);
    });
    Promise.all(pList).then(results => {
        console.log('todo parse results');
    }).catch(err => {
        res.sendStatus('500');
        console.err('request error', JSON.stringify(err));
    });

});

function parseResults() {
    return 'todo';
}

app.listen(port, () => console.log(`Server started on ${port}!`));
