import React from 'react';
import { Typography, Grid, Theme, makeStyles } from '@material-ui/core';
import { MicDrop } from './MicDrop';
import Link from '../../Link';

interface IErrorPageProps {
  status: string;
  statusMessage: string;
  additionalInfo?: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
      fontSize: 32,
    },
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
}));

export const ErrorPage = ({
  status,
  statusMessage,
  additionalInfo,
}: IErrorPageProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.container}>
      <MicDrop />
      <Grid item xs={12} sm={8} md={5}>
        <Typography variant="body1" className={classes.subtitle}>
          ERROR {status}: {statusMessage}
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          {additionalInfo}
        </Typography>
        <Typography variant="h2" className={classes.title}>
          Looks like someone dropped the mic!
        </Typography>
        <Typography variant="h6">
          <Link data-testid="go-home-link" href="/">
            Start again
          </Link>
          ... or if you think this is a bug, please file an{' '}
          <Link
            href="https://github.com/vorotech/broomstick/issues"
            rel="noopener noreferrer"
          >
            issue.
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};