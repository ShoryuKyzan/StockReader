# Intro

A responsive interface for searching one or more symbols using StockTwits API.

* Example: Search for AAPL AMZN (no need for $).

# Features

* Auto-refresh every 20 seconds.
* Touch-enabled sidebar (swipe open from left or use menu icon).
* Recent searches visible from sidebar or below search box
* Search box is sticky, as you scroll down the page it reappears at the top.
* Warning: Beware of StockTwits rate-limiting, 200 requests per hour is the limit. One request is made for each symbol in the search box.

# How to run

Set up a docker environment.

## Production

* This was designed to run on one machine inside a docker engine.
* run ./prod-build.sh, then ./prod-up.sh
* Will run frontend on port 80
* Will run backend on port 8000

## Development

### Frontend
* cd frontend/
* Run npm install
* Run npm run --watch
* Navigate browser to localhost:3000
* Make changes to source files and the browser will auto-refresh.

### Backend
* cd backend/
* Run npm install -g nodemon
* Run npm install
* Run nodemon main.js
* Will run an API server on port 8000, but CORS policy won't allow it to be accessed directly without modifying the cors filter function early in main.js.
* CORS policy is set to allow localhost.
* You can also just run ./dev-build.sh, ./dev-up.sh to start a backend in your docker engine (also running on port 8000, forwarded to your local 8000).