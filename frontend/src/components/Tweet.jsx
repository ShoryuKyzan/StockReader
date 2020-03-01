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
  content: {
  },
};

class Tweet extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const classes = this.props.classes;

    var date = new Date(this.props.tweet.date);

    const month = date.toLocaleString('default', { month: 'short' })
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const day = date.getDay();
    const year = date.getFullYear();
    const formattedDate = month + ' ' + day + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
            <img className={classes.profilePic} src={this.props.tweet.icon} />
            <div className={classes.info}>
                <div className={classes.username}>{this.props.tweet.user}</div>
                <div className={classes.date}>{formattedDate}</div>
            </div>
            </div>
            <div className={classes.content} dangerouslySetInnerHTML={{ __html: this.props.tweet.content}}></div>
        </div>
    );
  }
}


export default withStyles(styles)(Tweet);
