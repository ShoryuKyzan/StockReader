import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  errorBox: {
    margin: '0.5em 0',
    padding: '0.5em 1em',
    border: '1px solid red',
    borderRadius: '0.5em',
    background: 'pink'
  }
});

function Errors(props){
  const classes = useStyles();

  const messages = [];

  props.error.messages.forEach(message => {
    messages.push(
        <div className={classes.errorBox}>
            {props.error.symbol}: {message}
        </div>
    );
  })

  return (
    <div>
        {messages}
    </div>
  )
}

export default Errors;