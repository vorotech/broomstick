import React from 'react'
import { signin, signout, useSession  } from 'next-auth/client'
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
    signin("google-extended")
  };

  const handleSignOut = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    await fetch(`/api/auth/revoke-access`);
    // TODO: Delay 5 sec due to eventual revoking of the access token by Google
    await signout({ callbackUrl: "/"});
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
          {!session &&
            <Button color="inherit" onClick={handleSignIn}>Sign In</Button>
          }
          {session && <>
            <Button color="inherit" onClick={handleSignOut}>Sign Out & Revoke Access</Button>
          </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MyAppBar
