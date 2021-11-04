import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CircularProgress, makeStyles } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const Header = React.lazy(() => import('./components/header'));
const Footer = React.lazy(() => import('./components/footer'));
const BeerList = React.lazy(() => import('./module/beers'));
const Favorites = React.lazy(() => import('./module/favorites'));

const useStyles = makeStyles({
  root: {
    minHeight: 'calc(100vh - 148px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

function App() {
  const classes = useStyles();
  return (
    <React.StrictMode>
     
      <Suspense fallback={<div className={classes.root}><CircularProgress/></div>}>
        <Provider store={store}>
          <Router>
            <Header />
            <Switch>
              <Route path="/home">
                <BeerList />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Redirect to="/home" />
            </Switch>
            <Footer />
          </Router>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
}

export default App;
