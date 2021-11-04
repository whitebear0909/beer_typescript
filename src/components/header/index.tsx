import { FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="body1">
              Beans Love Beers
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" spacing={1}>
              <Grid item>
                <Typography variant="body1" align="center" data-test-id="header-events">
                  <NavLink to="/home" style={{ textDecoration: 'none', color: (pathname === '/home') ? "white" : "black" }} data-test-id="events-link">Beers</NavLink>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="center" data-test-id="header-about">
                  <NavLink to="/favorites" style={{ textDecoration: 'none', color: (pathname === '/favorites') ? "white" : "black" }} data-test-id="about-link">Favorites</NavLink>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header