import { useEffect, useState, ReactElement, FC, Fragment } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { Container, Box, Grid, Card, CircularProgress, CardContent, Typography, Chip, makeStyles, Button } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchBeersByFavoriteIds, Beer } from '../beers/beersSlice';
import AccountModal from "../../components/beer/accountModal";

const useStyles = makeStyles({
  root: {
    minHeight: 'calc(100vh - 148px)',
    textAlign: 'center'
  },
  card: {
    display: 'flex',
    padding: 10,
    border: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    borderColor: 'blue',
    margin: 20,
    height: 250
  },
  img_cover: {
    padding: 20
  },
  img: {
    width: 50,
    height: 100,
    marginTop: 20
  },
  start_mark: {
    textAlign: 'right'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    marginLeft: 10,
    textAlign: 'left'
  },
  title: {
    fontWeight: 'bold',
  },
  wallet_box: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  btn_group: {
    padding: 10,
    display: 'flex',
    background: '#bf6fc9',
    borderRadius: 5
  }
});

const Favorites: FC<any> = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const favoriteBeers: Beer[] = useAppSelector((state: RootState) => state.beer.favoriteBeers);
  const favoriteIds: any = useAppSelector((state: RootState) => state.beer.favoriteIds);
  const loading: boolean = useAppSelector((state: RootState) => state.beer.loading);

  const [open, setOpen] = useState(false);
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const cutString = (input: string) => {
    return input.length > 70 ? input.substring(0, 70) + '...' : input;
  }

  useEffect(() => {
    dispatch(fetchBeersByFavoriteIds(favoriteIds));
  }, [dispatch, favoriteIds]);

  const handleConnectWallet = () => {
    activateBrowserWallet();
  }

  const handleOpenModal = () => {
    setOpen(true);
  }

  return (
    <div className={classes.root}>
      <Container>
        {loading ? <CircularProgress /> : (
          <Fragment>
            <Box className={classes.wallet_box}>
              {account ? (
                <Box className={classes.btn_group} color="primary" >
                  <Typography variant="subtitle1" color="textSecondary">
                    {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
                  </Typography>
                  <Button onClick={handleOpenModal} variant="contained" color="primary" size="small">
                    {account &&
                      `${account.slice(0, 6)}...${account.slice(
                        account.length - 4,
                        account.length
                      )}`}
                  </Button>
                </Box>
              ) : (
                <Button onClick={handleConnectWallet} variant="contained" color="primary" size="medium">Connect to a wallet</Button>
              )}
            </Box>
            <Grid container>
              {favoriteBeers.map((beer: any) => (
                <Grid key={beer.id} item xs={4}>
                  <Card className={classes.card}>
                    <Grid container >
                      <Grid className={classes.img_cover} item xs={4}>
                        <img src={beer.image_url} className={classes.img} alt={beer.name} />
                      </Grid>
                      <Grid item xs={8}>
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Typography className={classes.start_mark}>
                              <Chip label={beer.changed ? "changed" : "not changed"} color={beer.changed ? "secondary" : "primary"} />
                            </Typography>
                            <Typography className={classes.title} component="h5" variant="h5">
                              {beer.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                              {cutString(beer.description)}
                            </Typography>
                          </CardContent>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <AccountModal
              open={open}
              setOpen={setOpen}
            />
          </Fragment>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
