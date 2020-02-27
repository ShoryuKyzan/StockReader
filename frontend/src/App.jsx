import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SiteMenu from './components/SiteMenu';
import SearchBar from './components/SearchBar';
import Tweet from './components/Tweet';
import { StickySensor, StickyWrapper } from './components/StickToTop';

const styles = {
  main: {
    borderRadius: '1em',
    border: '1px solid lightblue',
    margin: '1em',
    padding: '1em',
    position: 'relative'
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

    this.state = {
      showSticky: false
    };
    this.onShowSticky = this.onShowSticky.bind(this);
  }

  onShowSticky(show) {
    this.setState({showSticky: show});
  }

  render(){
    const classes = this.props.classes;

    const stickyElement = <SearchBar />;

    return (
      <div>
        <SiteMenu>
          <StickyWrapper
            show={this.state.showSticky}
            sticky={stickyElement}>

            <div className={classes.main} id='content'>
              
              <div className={classes.title}>Stock Tweets</div>
              
              <StickySensor onShow={this.onShowSticky}>
                {stickyElement}
              </StickySensor>

              <div>
                {/* search results */}
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />

              </div>
            </div>
          </StickyWrapper>
        </SiteMenu>
      </div>
    );
  }
}


export default withStyles(styles)(App);
