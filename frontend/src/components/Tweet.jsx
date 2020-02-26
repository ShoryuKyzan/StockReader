import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapper: {
    borderRadius: '0.8em',
    border: '2px solid lightblue',
    padding: '0.8em',
    maxWidth: '30em',
    margin: '0 auto 0.5em'
  },
  header: {
    position: 'relative',
    height: '4em',
    marginBottom: '0.7em'
  },
  profilePic: {
    position: 'absolute',
    left: '0',
    width: '4em',
    height: '4em',
    borderRadius: '2em',
    border: '3px solid lightblue'
  },
  info: {
    position: 'absolute',
    left: '5em',
    right: '0'
  },
  username: {
    display: 'inline-block',
    margin: '0.4em 0',
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    marginBottom: '1em'
  },
  link: {
    background: 'no-repeat no-repeat center center url(images/external-link.svg)',
    backgroundSize: '1em 1em',
    width: '1em',
    height: '1em',
    right: '0em',
    top: '0.6em',
    position: 'absolute',
  },
  content: {
  },
};

class Tweet extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const classes = this.props.classes;

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
            <img className={classes.profilePic} src="images/icon.png" />
            <div className={classes.info}>
                <div className={classes.username}>username</div>
                <div className={classes.date}>Feb 3 2019 10:22 am</div>
            </div>
            <a href="https://www.twitter.com" className={classes.link}></a>
            </div>
            <div className={classes.content}>
            tweet tweet tweet tweet tweet tweet
            </div>
        </div>
    );
  }
}


export default withStyles(styles)(Tweet);
