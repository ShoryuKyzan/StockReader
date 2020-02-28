import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from "react-sidebar";

import RecentSearches from './RecentSearches';
import API from '../API';

const mql = window.matchMedia(`(min-width: 800px)`);

const styles = {
  sidebarTitle: {
    fontVariant: 'small-caps',
    fontSize: '1.2em',
    margin: '0.5em 0.8em'
  },
  sidebarContentWrapper: {
    margin: '0.8em 0.8em 0'
  }
};

var sidebarStyle = {
  sidebar: {
      background: 'white',
      borderRight: '0.7em solid lightblue',
      width: '70%',
      maxWidth: '16em',
      zIndex: '2000' /* pops over the searchbar if its sticky */
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

class SiteMenu extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      menuOpen: false,
      desktopMode: mql.matches,
      recentSearches: []
    };

    this.sidebarStateChanged = this.sidebarStateChanged.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

    this.state.recentSearches = API.RecentSearches.list(); // XXX
  }

  /* sync state of menu with state of component */
  sidebarStateChanged (open) {
    this.setState({menuOpen: open});
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ desktopMode: mql.matches, menuOpen: false });
  }

  toggleMenuOpen(){
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render(){
    const classes = this.props.classes;

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
                    <RecentSearches list={this.state.recentSearches}/>
                </div>
            </div>
            }
            open={this.state.menuOpen}
            onSetOpen={this.sidebarStateChanged}
            styles={sidebarStyle} >
          

            {this.props.children}

        </Sidebar>
      </div>
    );
  }
}


export default withStyles(styles)(SiteMenu);