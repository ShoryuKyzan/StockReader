import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';

const styles = {
  sidebar: {
    display: 'none', /* TOOD desktop responsive view */
  },
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
    margin: '0.4em 0',
    borderRadius: '0.8em',
    border: '3px solid lightblue',
    padding: '0.3em',
  }
};

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const classes = this.props.classes;

    return (
      <div>
        <div className={classes.sidebar}>
          {/* sidebar (desktop) */}
          <div>
            {/* Recent searches */}
            <div>$PONY</div>
            <div>$TOWN</div>
            <div>$TOWN</div>
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.title}>Stock Tweets</div>
          <div>
            {/* Search */}
            <div className={classes.box}>
              {/* TODO for later we do this.
              <span className={classes.searchTerm}>$PONY</span>
              <span className={classes.searchTerm}>$TOWN</span>
              */}
              <div className={classes.inputWrapper}>
                <input className={classes.searchText} name="search" value="term" />
              </div>
            </div>
            <div>
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
          </div>
          <div>
            {/* search results */}
            <div>
              {/* tweet */}
              <div>
                left
                picture
              </div>
              <div>
                <div>username</div>
                <div>right space tweet tweet tweet tweet tweet tweet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(App);
