import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SiteMenu from './components/SiteMenu';
import SearchBar from './components/SearchBar';
import Tweet from './components/Tweet';
import { StickySensor, StickyWrapper } from './components/StickToTop';

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
    this.onShowSticky = this.onShowSticky.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);

    this.siteMenu = React.createRef();

    const tweets = [
      {
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
      }
    ]; // XXX Mock
    this.state.tweets = tweets;
  }

  onShowSticky(show) {
    this.setState({showSticky: show});
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ desktopMode: mql.matches});
  }
  
  menuButtonClick() {
    this.siteMenu.current.toggleMenuOpen()
  }

  render(){
    const classes = this.props.classes;

    const stickyElement = <SearchBar />;

    const toggleInDesktop = this.state.desktopMode ? classes.hideMenuButton : '';

    const tweets = [];
    this.state.tweets.forEach((tweet) => {
      tweets.push(<Tweet tweet={tweet}/>)
    });

    return (
      <div>
        <SiteMenu ref={this.siteMenu}>
          <StickyWrapper
            show={this.state.showSticky}
            sticky={stickyElement}>

            <div className={classes.main} id='content'>
              
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
