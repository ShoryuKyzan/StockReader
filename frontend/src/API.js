// production url, this may be typically baked into configuration instead of here
var BACKEND_URL = 'http://api.comicsite.com';
var developmentMode = false;
var productionMode = true;

// If in development mode, change the backend url
if(window.location.port === '3000')
{
    BACKEND_URL = 'http://api.comicsite.com:8000'
    developmentMode = true;
    productionMode = false;
}

function callJSONMethod(uri, data){
    return fetch(BACKEND_URL + uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
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
        // XXX mock
        return [{
            id: 1,
            date: Date.now(),
            content: 'asdf asdf asdf',
            user: 'user1',
            link: 'https://www.twitter.com/a',
            icon: 'images/icon.png'
        },
        {
            id: 2,
            date: Date.now() + 1,
            content: 'asdf asdf asdf',
            user: 'user1',
            link: 'https://www.twitter.com',
            icon: 'images/icon.png'
        },
        {
            id: 3,
            date: Date.now() + 2,
            content: 'asdf asdf asdf',
            user: 'user1',
            link: 'https://www.twitter.com',
            icon: 'images/icon.png'
        }];
    }
}

class RecentSearches {
    static list(){
        return [
            {
                term: '$PONY',
                date: Date.now() - 1
            },
            {
                term: '$TOWN',
                date: Date.now() - 2
            },
            {
                term: '$LAND',
                date: Date.now() - 3
            }
        ]; // XXX mock
    }
    
    static add(search) {
        // XXX todo
    }
    
    static remove(id) {
        // XXX todo
    }
}

const API = {
    Backend,
    RecentSearches
};

export default API;