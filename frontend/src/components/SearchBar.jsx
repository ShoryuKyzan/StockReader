import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import RecentSearches from './RecentSearches';

const styles = {
  /* search */
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
    margin: '0 auto 0.4em',
    borderRadius: '0 0 0.8em 0.8em',
    border: '3px solid lightblue',
    padding: '0.3em',
    maxWidth: '35em'
  }
};

class SearchBar extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const classes = this.props.classes;

    return (
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
            <div className={classes.rsWrapper}>
                <RecentSearches />
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(SearchBar);
