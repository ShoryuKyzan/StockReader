import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { publish, Subscriber, Search } from './PubSub'
import { reloadRecentSearches, RecentSearches } from './RecentSearches';
import API from '../API';

export const setSearch = (data) => publish(Search, data);

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
    margin: '0 auto',
    position: 'relative',
    height: '1.4em'
  },
  boxExpanded: {
    borderRadius: '0.8em 0.8em 0 0'
  },
  inputWrapper: {
    padding: '0 0.4em',
    margin: '0.2em 0.3em 0',
    position: 'absolute',
    left: '0',
    right: '1em',
    top: '0',
    bottom: '0'
  },
  searchText: {
    border: 'none',
    width: '100%'
  },
  searchButton: {
    position: 'absolute',
    right: '0.2em',
    top: '0.2em',
    backgroundColor: 'transparent',
    backgroundImage: 'url(images/search.svg)',
    backgroundRepeat: 'no-repeat no-repeat',
    backgroundSize: '2em 2em',
    backgroundPosition: 'center center',
    width: '2em',
    height: '2em',
    border: 'none'
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
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onDeleteRecentSearch = this.onDeleteRecentSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);

    this.searchBox = React.createRef();
    this.recentSearches = React.createRef();

    this.sub = new Subscriber(Search, this.setSearch.bind(this));
  }

  componentDidMount(){
    document.body.addEventListener('click', this.onBlur);
  }

  componentWillUnmount(){
    document.body.removeEventListener('click', this.onBlur);
    this.sub.destroy();
  }

  /** Fired whenever this element is clicked not just input box */
  onFocus(e) {
    if(!this.state.recentOpen){
      this.setState({recentOpen: true});
      e.stopPropagation();
    }
  }

  onBlur() {
    // dont do it...
    this.setState({recentOpen: false});
  }

  onKeyPress(e) {
    // TODO make sure this works on mobile! i have no search button!
    if(e.charCode !== 13){
      return;
    }
    this.doSearch();
  }
  
  doSearch() {
    // close it on successful search
    setTimeout(() => this.setState({recentOpen: false}), 0);
    this.search();
  }
  

  search(term){
    if(!term){
      term = this.searchBox.current.value;
    }
    // TODO do this on successful search
    return this.props.onSearch(term).then(() => {
      API.RecentSearches.add(this.searchBox.current.value);
      reloadRecentSearches();
    });
  }

  setSearch(newSearch){
    this.search(newSearch.data).then(() => {
      // close recent searches if open
      setTimeout(() => this.setState({recentOpen: false}), 0); // trigger trying to show it.
    });

  }

  onDeleteRecentSearch() {
    // close recent searches if empty
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
                <div className={classes.inputWrapper}>
                    <input
                        ref={this.searchBox}
                        onFocus={this.onFocus}
                        onKeyPress={this.onKeyPress}
                        onChange={(e) => this.props.onChange(e.target.value)}
                        className={classes.searchText} name="search" value={this.props.value}/>
                </div>
                <button className={classes.searchButton} onClick={this.doSearch}>&nbsp;</button>
            </div>
            <div className={classes.rsWrapper + ' ' + recentOpenClass}>
                <RecentSearches ref={this.recentSearches} onDeleted={this.onDeleteRecentSearch}/>
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(SearchBar);
