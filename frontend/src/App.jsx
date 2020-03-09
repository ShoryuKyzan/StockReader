import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import SiteMenu from './components/SiteMenu';
import SearchBar from './components/SearchBar';
import Tweet from './components/Tweet';
import { StickySensor, StickyWrapper } from './components/StickToTop';
import API from './API';

const mql = window.matchMedia(`(min-width: 800px)`);

const styles = {
  main: {
    borderRadius: '1em',
    border: '1px solid lightblue',
    margin: '1em',
    padding: '1em',
    position: 'relative'
  },
  title: {
    textAlign: 'center',
    fontVariant: 'small-caps',
    fontSize: '2em',
    marginBottom: '0.2em'
  },
  hideMenuButton: {
    display: 'none'
  },
  menuButton: {
    position: 'absolute',
    top: '2em',
    left: '2em',
    width: '2em',
    height: '2em',
    background: 'url(images/menu.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '2em',
    backgroundPosition: 'center center',
    border: 'none'
  }
};

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      desktopMode: mql.matches,
      showSticky: false,
      sidebarOpen: false,
      tweets: []
    };

    this.siteMenu = React.createRef();
    this.scrollingDiv = React.createRef();
    this.lastTopTweetId = null;
    this.tweetViewOffset = null;

    this.autoRefresh = null;
    this.autoRefreshTerm = null;
    this.autoRefreshTime = 2*1000;
    // XXX this.autoRefreshTime = 20*1000;
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount(){
    // start auto-refresh interval
    this.autoRefresh = setInterval(this.onAutoRefresh, this.autoRefreshTime);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);

    if(this.autoRefresh){
      clearInterval(this.autoRefresh);
    }
  }

  componentDidUpdate(){
    // scroll window up by amount of new content to keep same "position"
    let scrollNewPos = null;
    const container = this.scrollingDiv.current;
    console.log('pos', container.scrollTop()); // XXX
    window.AAA = container; // XXX
    if(container.scrollTop() !== 0){
      if(this.lastTopTweetId){
        const newTweetDiv = ReactDOM.findDOMNode(this).querySelector('#tweet-' + this.lastTopTweetId)
        // if it goes off the page it wont be found anymore
        if(newTweetDiv){
          scrollNewPos = newTweetDiv.offsetTop - this.tweetViewOffset;
        }else{
          this.lastTopTweetId = null;
        }
        if(scrollNewPos){
          console.log('new pos', scrollNewPos); // XXX
          container.scroll(scrollNewPos);
        }
      }
    }
  }

  onScroll = () => {
    // start tracking movement of the top tweet down the page
    if(this.state.tweets.length > 0 && this.scrollingDiv.current.scrollTop() !== 0){
      this.lastTopTweetId = this.state.tweets[0].id;
      const oldTweetPosition = ReactDOM.findDOMNode(this).querySelector('#tweet-' + this.lastTopTweetId).offsetTop;
      this.tweetViewOffset = oldTweetPosition - this.scrollingDiv.current.scrollTop();
    }
  }


  onShowSticky = (show) => {
    this.setState({showSticky: show});
  }

  mediaQueryChanged = () => {
    this.setState({ desktopMode: mql.matches});
  }
  
  menuButtonClick = () => {
    this.siteMenu.current.toggleMenuOpen()
  }

  onAutoRefresh = () => {
    console.log('autorefresh', this.autoRefreshTerm, new Date()); // XXX
    if(this.autoRefreshTerm){
      this.onSearch(this.autoRefreshTerm, false);
    }
  }

  onSearch = (term, resetScrollPosition) => {
    this.autoRefreshTerm = term;
    console.log('onsearch', this.autoRefreshTerm); // XXX
    // reset scroll position.
    if(resetScrollPosition){
      this.scrollingDiv.current.scrollToTop();
    }
    return API.Backend.search(term).then((tweets) => {
      this.setState({tweets});
    }).catch(err => console.error('error during search', err));
  }

  render(){
    const classes = this.props.classes;

    const stickyElement = <SearchBar onSearch={(term) => this.onSearch(term, true)}/>;

    const toggleInDesktop = this.state.desktopMode ? classes.hideMenuButton : '';

    const tweets = [];
    this.state.tweets.forEach((tweet, i) => {
      tweets.push(<Tweet key={i} tweet={tweet}/>)
    });

    return (
      <div>
        <SiteMenu ref={this.siteMenu}>
          <StickyWrapper
            onScroll={this.onScroll}
            ref={this.scrollingDiv}
            show={this.state.showSticky}
            sticky={stickyElement}>

            <div ref={this.contentDiv} className={classes.main} id='content'>
              
              <button
                className={classes.menuButton + ' ' + toggleInDesktop} 
                onClick={this.menuButtonClick}></button>

              <div className={classes.title}>Stock Tweets</div>
              
              <StickySensor onShow={this.onShowSticky}>
                {stickyElement}
              </StickySensor>

              <div>
                {/* search results */}
                {tweets}

              </div>
            </div>
          </StickyWrapper>
        </SiteMenu>
      </div>
    );
  }
}


export default withStyles(styles)(App);
