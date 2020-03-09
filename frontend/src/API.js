// production url, this may be typically baked into configuration instead of here
// yes its no different from dev version
var BACKEND_URL = 'http://' + window.location.hostname + ':8000';
var developmentMode = false;
var productionMode = true;

// If in development mode, change the backend url
if(window.location.port === '3000')
{
    BACKEND_URL = 'http://' + window.location.hostname + ':8000';
    developmentMode = true;
    productionMode = false;
}

function callGETMethod(uri){
    return fetch(BACKEND_URL + uri).then(response => {
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error(response.json());
        }
    })
    .catch(reason => {
        throw new Error(reason);
    });
}

// XXX Mocking
let mockedTweets = [];

class Backend {

    /**
     * Gets tweet search results. Results are sorted descending by date automatically
     * (NOTE: i could have made this a parameter but im saving time here).
     * Page 0 is most recent results. Page 1 older, etc.
     * 
     * @param {Array<String>} terms Array of string terms to search for. 
     * @param {number} firstPage First page of results to get. 0-based. 
     * @param {number} lastPage Last page of results to get. 0-based.
     * 
     * @returns {Array<Object>} Returns an array of tweet objects.
     */
    static async search(terms, firstPage, lastPage){
        // XXX first/lastpage not used yet
        const results = await callGETMethod('/search' + '?q=' + terms);
        return results;
        // XXX mock
        if(!Backend.mockStart){
            Backend.mockStart = Date.now();
        }
        const tweetCount = parseInt((Math.random() * 3) + 1, 10);
        const startId = (mockedTweets.length === 0 ? -1 : mockedTweets[0].id) + 1;
        for(let i=0; i < tweetCount; i++){
            let randomStr = 'asdf asdf asdf &amp; &quot;';
            let randRepeat = parseInt(Math.random() * 5, 10);
            for(let j = 0 ; j < randRepeat; j++){
                randomStr += randomStr;
            }
            mockedTweets.unshift({
                id: startId + i,
                date: Date.now() + i * 1000,
                content: randomStr,
                user: 'user1',
                link: 'https://www.twitter.com/a',
                icon: 'images/icon.png'
            });
        }
        // limit mock count to 30
        if(mockedTweets.length > 30){
            mockedTweets = mockedTweets.slice(mockedTweets.length - 30, 30);
        }
        return mockedTweets;
    }
}

class RecentSearches {
    static _createIfNotExist(){
        if(!localStorage['recentSearches']){
            localStorage['recentSearches'] = JSON.stringify([]);
        }
    }

    static _get() {
        RecentSearches._createIfNotExist();
        return JSON.parse(localStorage['recentSearches']);
    }

    static _set(newList) {
        localStorage['recentSearches'] = JSON.stringify(newList);
    }

    static list(){
        return RecentSearches._get();
    }
    
    static add(search) {
        search = search.trim();
        if(search === ''){
            return;
        }

        let list = RecentSearches._get();

        // do not add duplicates
        const found = list.find(term => term.term === search);
        if(found){
            return;
        }

        list.unshift({
            term: search,
            date: Date.now()
        });

        // limit to 10
        list = list.slice(0,10);

        RecentSearches._set(list);
    }
    
    static remove(search) {
        const newList = RecentSearches._get().filter(term => term.term !== search);
        RecentSearches._set(newList);
    }
}

const API = {
    Backend,
    RecentSearches
};

export default API;