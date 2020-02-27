import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VizSensor from 'react-visibility-sensor';

const styles = {
  /* search */
  show: {
      position: 'fixed',
      display: 'block',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      zIndex: 1000,
      padding: '0.5em 0.5em',
      borderBottom: '3px solid lightblue'
  },
  hide: {
      display: 'none'
  }
};

class StickToTop extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        showSticky: false,
    };
  }

  render(){
    const classes = this.props.classes;

    return (
        <div>
            <VizSensor
                onChange={(isVisible) => {
                    this.setState({showSticky: !isVisible})}}>
                {this.props.children}
            </VizSensor>
            <div className={this.state.showSticky ? classes.show : classes.hide }>
                {this.props.children}
            </div>
        </div>
    );
  }
}

export default withStyles(styles)(StickToTop);