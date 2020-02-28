import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { reloadRecentSearches, RecentSearches } from './RecentSearches';

const styles = {
  /* search */
  main: {
    marginBottom: '0.4em'
  },
  box: {
    borderRadius: '0.8em',
    border: '1px solid black',
    padding: '0.3em',
    maxWidth: '35em',
    margin: '0 auto'
  },
  boxExpanded: {
    borderRadius: '0.8em 0.8em 0 0'
  },
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
    display: 'none',
    margin: '0 auto 0.4em',
    borderRadius: '0 0 0.8em 0.8em',
    border: '3px solid lightblue',
    padding: '0.3em',
    maxWidth: '35em'
  },
  showRecent: {
    display: 'block'
  }
};

class SearchBar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        recentOpen: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.search = this.search.bind(this);

    this.searchBox = React.createRef();
  }

  onFocus() {
    this.setState({recentOpen: true});
  }

  onBlur() {
    this.setState({recentOpen: false});
  }

  search(e) {
    if(e.charCode !== 13){
      return;
    }
    console.log('searched', this.searchBox.current.value); // XXX
    reloadRecentSearches();
  }

  render(){
    const classes = this.props.classes;

    const recentOpenClass = this.state.recentOpen ? classes.showRecent : '';
    const searchBarExpanded = this.state.recentOpen ? classes.boxExpanded : '';

    return (
        <div className={classes.main}>
            <div className={classes.box + ' ' + searchBarExpanded}>
                {/* TODO for later we do this.
                <span className={classes.searchTerm}>$PONY</span>
                <span className={classes.searchTerm}>$TOWN</span>
                */}
                <div className={classes.inputWrapper}>
                    <input
                        ref={this.searchBox}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyPress={this.search}
                        className={classes.searchText} name="search"/>
                </div>
            </div>
            <div className={classes.rsWrapper + ' ' + recentOpenClass}>
                <RecentSearches />
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(SearchBar);
