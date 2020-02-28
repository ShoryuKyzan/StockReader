import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { reloadRecentSearches, RecentSearches } from './RecentSearches';
import API from '../API';

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
    this.onDeleteRecentSearch = this.onDeleteRecentSearch.bind(this);

    this.searchBox = React.createRef();
    this.recentSearches = React.createRef();
  }

  componentDidMount(){
    document.body.addEventListener('click', this.onBlur);
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.onBlur);
  }

  /** Fired whenever this element is clicked not just input box */
  onFocus(e) {
    this.setState({recentOpen: true});
    e.stopPropagation();
  }

  onBlur() {
    // dont do it...
    this.setState({recentOpen: false});
  }

  search(e) {
    // TODO make sure this works on mobile! i have no search button!
    if(e.charCode !== 13){
      return;
    }
    // TODO do this on successful search
    API.RecentSearches.add(this.searchBox.current.value);
    reloadRecentSearches();
    setTimeout(() => this.setState({recentOpen: true}), 0); // trigger trying to show it.
  }

  onDeleteRecentSearch() {
    // close recent searches if empty
    console.log('called', this.recentSearches.current.isEmpty());
    if(this.recentSearches.current && this.recentSearches.current.isEmpty()){
      setTimeout(() => this.setState({recentOpen: false}), 0);
    }
  }

  render(){
    const classes = this.props.classes;

    let recentOpenClass = this.state.recentOpen ? classes.showRecent : '';
    let searchBarExpanded = this.state.recentOpen ? classes.boxExpanded : '';

    if(this.recentSearches.current && this.recentSearches.current.isEmpty()){
      recentOpenClass = '';
      searchBarExpanded = '';
    }

    return (
        <div className={classes.main} onClick={this.onFocus}>
            <div className={classes.box + ' ' + searchBarExpanded}>
                {/* TODO for later we do this.
                <span className={classes.searchTerm}>$PONY</span>
                <span className={classes.searchTerm}>$TOWN</span>
                */}
                <div className={classes.inputWrapper}>
                    <input
                        ref={this.searchBox}
                        onFocus={this.onFocus}
                        onKeyPress={this.search}
                        className={classes.searchText} name="search"/>
                </div>
            </div>
            <div className={classes.rsWrapper + ' ' + recentOpenClass}>
                <RecentSearches ref={this.recentSearches} onDeleted={this.onDeleteRecentSearch}/>
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(SearchBar);
