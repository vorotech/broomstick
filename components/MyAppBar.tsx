import React from 'react'
import { signin, signout, useSession } from 'next-auth/client'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Link from './Link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const MyAppBar = () => {
  const classes = useStyles()
  const [session, loading] = useSession()

  const handleSignIn = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    signin()
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Broomstick
          </Typography>
          <Button component={Link} style={{ textDecoration: 'none' }} color="inherit" href="/api/auth/signin/google-extended">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MyAppBar
