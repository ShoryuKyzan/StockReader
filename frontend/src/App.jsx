import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SiteMenu from './components/SiteMenu';
import SearchBar from './components/SearchBar';
import Tweet from './components/Tweet';

const styles = {
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
        <SiteMenu>
            <div className={classes.main} id='content'>
              
              <div className={classes.title}>Stock Tweets</div>

              <SearchBar />

              <div>
                {/* search results */}
                <Tweet />
                <Tweet />
                <Tweet />

              </div>
            </div>
        </SiteMenu>
      </div>
    );
  }
}


export default withStyles(styles)(App);
