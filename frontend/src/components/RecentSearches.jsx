import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
  }
};

class RecentSearches extends React.Component {

  constructor(props){
    super(props);
    console.log(props);//XXX

  }

  render(){
    const classes = this.props.classes;
    const terms = [];
    if(this.props.list){
      this.props.list.forEach(term => {
        terms.push(
          <div className={classes.termWrapper}>
            <div className={classes.searchTerm}>↻ {term.term}</div>
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


export default withStyles(styles)(RecentSearches);
