import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { publish, Subscriber, RefreshRecentSearches } from './PubSub';
import API from '../API';

export const reloadRecentSearches = (data) => publish(RefreshRecentSearches, data);

const styles = {
  /* search term */
  termWrapper: {
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
  delete: {
    margin: '0 0 0 0.5em',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3em',
    select: 'disabled',
    textDecoration: 'none'
  }
};

class _RecentSearches extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      list: API.RecentSearches.list()
    };
    
    this.sub = new Subscriber(RefreshRecentSearches, this.refresh.bind(this));

  }

  /**
   * Reload recent searches from store
   */
  refresh() {
    this.setState({list: API.RecentSearches.list()});
  }

  isEmpty(){
    return this.state.list.length === 0;
  }

  remove(term){
    console.log('term', term.term);
    API.RecentSearches.remove(term.term);
    // refresh all instances of this control
    reloadRecentSearches();
    if(this.props.onDeleted){
      // trigger after update
      setTimeout(() => this.props.onDeleted(), 0);
    }
  }

  componentWillUnmount(){
    this.sub.destroy();
  }

  render(){
    const classes = this.props.classes;
    const terms = [];
    if(this.state.list){
      this.state.list.forEach((term,i) => {
        terms.push(
          <div className={classes.termWrapper}>
            <div key={i} className={classes.searchTerm}>
              ↻ {term.term}
              <a onClick={e => this.remove(term)} className={classes.delete}>X</a>
            </div>
          </div>
        )
      });
    }

    return (
        <div>
          {terms}
        </div>
    );
  }
}


export const RecentSearches = withStyles(styles)(_RecentSearches);
