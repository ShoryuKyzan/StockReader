import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';

import Sidebar from "react-sidebar"; // XXX sidebar

const mql = window.matchMedia(`(min-width: 800px)`); // XXX sidebar

const styles = {
  /* sidebar */
  menuButton: {
    position: 'absolute',
    top: '3.2em',
    left: '3em',
    width: '2em',
    height: '2em',
    background: 'url(images/menu.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '2em',
    backgroundPosition: 'center center',
    border: 'none'
  },
  hideMenuButton: {
    display: 'none'
  },
  sidebarTitle: {
    fontVariant: 'small-caps',
    fontSize: '1.2em',
    margin: '0.5em 0.8em'
  },
  sidebarContentWrapper: {
    margin: '0.8em 0.8em 0'
  },
  /* main */
  main: {
    borderRadius: '1em',
    border: '1px solid lightblue',
    margin: '1em',
    padding: '1em'
  },
  title: {
    textAlign: 'center',
    fontVariant: 'small-caps',
    fontSize: '2em',
    marginBottom: '0.2em'
  },
  /* search */
  box: {
    borderRadius: '0.8em',
    border: '1px solid black',
    padding: '0.3em'
  },
  boxExpanded: {
    borderRadius: '0.8em 0.8em 0 0'
  },
  /* search term */
  stWrapper: {
    margin: '0.2em 0.5em'
  },
  searchTerm: {
    border: '1px solid transparent',
    backgroundColor: 'lightblue',
    borderRadius: '0.5em',
    margin: '0 0.3em 0 0',
    padding: '0.2em 0.3em',
    display: 'inline-block'
  },
  /* search box */
  inputWrapper: {
    padding: '0 0.4em',
    margin: '0 0.3em'
  },
  searchText: {
    border: 'none',
    width: '100%'
  },
  /* Recent searches */
  rsWrapper: {
    margin: '0 0 0.4em',
    borderRadius: '0 0 0.8em 0.8em',
    border: '3px solid lightblue',
    padding: '0.3em',
  },
  /* tweet */
  wrapper: {
    borderRadius: '0.8em',
    border: '2px solid lightblue',
    padding: '0.8em',
    maxWidth: '30em',
    margin: '0 auto 0.5em'
  },
  header: {
    position: 'relative',
    height: '4em',
    marginBottom: '0.7em'
  },
  profilePic: {
    position: 'absolute',
    left: '0',
    width: '4em',
    height: '4em',
    borderRadius: '2em',
    border: '3px solid lightblue'
  },
  info: {
    position: 'absolute',
    left: '5em',
    right: '0'
  },
  username: {
    display: 'inline-block',
    margin: '0.4em 0',
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    marginBottom: '1em'
  },
  link: {
    background: 'no-repeat no-repeat center center url(images/external-link.svg)',
    backgroundSize: '1em 1em',
    width: '1em',
    height: '1em',
    right: '0em',
    top: '0.6em',
    position: 'absolute',
  },
  content: {
  },
};

var sidebarStyle = {
  sidebar: {
      background: 'white',
      borderRight: '0.7em solid lightblue',
      width: '70%',
      maxWidth: '16em'
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  },
};

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      menuOpen: false, // XXX sidebar
      desktopMode: mql.matches // XXX sidebar
    };

    this.sidebarStateChanged = this.sidebarStateChanged.bind(this); // XXX sidebar
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this); // XXX sidebar
  }

  /* sync state of menu with state of component */
  // XXX sidebar
  sidebarStateChanged (open) {
    this.setState({menuOpen: open})  
  }

  // XXX sidebar
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  // XXX sidebar
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  // XXX sidebar
  mediaQueryChanged() {
    this.setState({ desktopMode: mql.matches, menuOpen: false });
  }

  render(){
    const classes = this.props.classes;

    // XXX sidebar
    const toggleInDesktop = this.state.desktopMode ? classes.hideMenuButton : '';

    return (
      <div>
        <Sidebar
          docked={this.state.desktopMode}
          transitions={!this.state.desktopMode}
          contentId="content"
          sidebar={
            <div className={classes.sidebar}>
              <div className={classes.sidebarTitle}>Recent Searches</div>
              <div className={classes.sidebarContentWrapper}>
                <div className={classes.stWrapper}>
                  <div className={classes.searchTerm}>↻ $PONY</div>
                </div>
                <div className={classes.stWrapper}>
                  <div className={classes.searchTerm}>↻ $TOWN</div>
                </div>
                <div className={classes.stWrapper}>
                  <div className={classes.searchTerm}>↻ $TOWN</div>
                </div>
              </div>
            </div>
          }
          open={this.state.menuOpen}
          onSetOpen={this.sidebarStateChanged}
          styles={sidebarStyle} >
          
            <button
              className={classes.menuButton + ' ' + toggleInDesktop} 
              onClick={() => this.sidebarStateChanged(true)}></button>
            <div className={classes.main} id='content'>
              
              <div className={classes.title}>Stock Tweets</div>

              <div>
                {/* Search, regular*/}
                <div className={classes.box}>
                  {/* TODO for later we do this.
                  <span className={classes.searchTerm}>$PONY</span>
                  <span className={classes.searchTerm}>$TOWN</span>
                  */}
                  <div className={classes.inputWrapper}>
                    <input className={classes.searchText} name="search" value="term" />
                  </div>
                </div>

                <div className={classes.box + ' ' + classes.boxExpanded}>
                  <div className={classes.inputWrapper}>
                    <input className={classes.searchText} name="search" value="term" />
                  </div>
                </div>
                {/* Recent searches */}
                <div className={classes.rsWrapper}>
                  <div className={classes.stWrapper}>
                    <div className={classes.searchTerm}>↻ $PONY</div>
                  </div>
                  <div className={classes.stWrapper}>
                    <div className={classes.searchTerm}>↻ $TOWN</div>
                  </div>
                  <div className={classes.stWrapper}>
                    <div className={classes.searchTerm}>↻ $TOWN</div>
                  </div>
                </div>
              </div>
              
              <div>
                {/* search results */}
                {/* tweet */}
                <div className={classes.wrapper}>
                  <div className={classes.header}>
                    <img className={classes.profilePic} src="images/icon.png" />
                    <div className={classes.info}>
                      <div className={classes.username}>username</div>
                      <div className={classes.date}>Feb 3 2019 10:22 am</div>
                    </div>
                    <a href="https://www.twitter.com" className={classes.link}></a>
                  </div>
                  <div className={classes.content}>
                    tweet tweet tweet tweet tweet tweet
                  </div>
                </div>

                {/* tweet */}
                <div className={classes.wrapper}>
                  <div className={classes.header}>
                    <img className={classes.profilePic} src="images/icon.png" />
                    <div className={classes.info}>
                      <div className={classes.username}>username</div>
                      <div className={classes.date}>Feb 3 2019 10:22 am</div>
                    </div>
                    <a href="https://www.twitter.com" className={classes.link}></a>
                  </div>
                  <div className={classes.content}>
                    tweet tweet tweet tweet tweet tweet
                  </div>
                </div>

              </div>
            </div>
        </Sidebar>
      </div>
    );
  }
}


export default withStyles(styles)(App);
