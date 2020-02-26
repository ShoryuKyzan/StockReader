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

  }

  render(){
    const classes = this.props.classes;

    return (
        <div>
            <div className={classes.termWrapper}>
                <div className={classes.searchTerm}>↻ $PONY</div>
            </div>
            <div className={classes.termWrapper}>
                <div className={classes.searchTerm}>↻ $TOWN</div>
            </div>
            <div className={classes.termWrapper}>
                <div className={classes.searchTerm}>↻ $TOWN</div>
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(RecentSearches);
