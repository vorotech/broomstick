import React from 'react';
import { makeStyles } from '@material-ui/core';
import MicDropSvgUrl from './mic-drop.svg';

const useStyles = makeStyles(theme => ({
  micDrop: {
    maxWidth: '60%',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      maxWidth: '96%',
      position: 'relative',
      bottom: 'unset',
      right: 'unset',
      margin: `${theme.spacing(10)}px auto ${theme.spacing(4)}px`,
    },
  },
}));

export const MicDrop = () => {
  const classes = useStyles();
  return (
    <img
      src={MicDropSvgUrl}
      className={classes.micDrop}
      alt="Girl dropping mic from her hands"
    />
  );
};