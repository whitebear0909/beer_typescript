import { useEffect, useState, ReactElement, FC, Fragment } from "react";
import ReactPlayer from 'react-player';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles, Container, Grid, CircularProgress, Button, TextField, Box } from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { fetchBeers, fetchRandomBeer, Beer, addFavorite } from './beersSlice';
import BeerCard from '../../components/beer/beerCard';
import RandomBeerModal from "../../components/beer/randomBeerModal";

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    textAlign: 'center',
    minHeight: 'calc(100vh - 148px)'
  },
  pagination: {
    display: 'inline-block',
    marginTop: 15,
    marginBottom: 15,
  },
  random_btn: {
    float: 'right'
  },
  search_box: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const pagination = 10;

const soundUrls = [
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
]

const BeerList: FC<any> = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const beers: Beer[] = useAppSelector((state: RootState) => state.beer.beers);
  const randomBeer: Beer = useAppSelector((state: RootState) => state.beer.randomBeer);
  const favoriteIds: any = useAppSelector((state: RootState) => state.beer.favoriteIds);
  const loading: boolean = useAppSelector((state: RootState) => state.beer.loading);
  const [page, setPage] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [soundUrl, setSoundUrl] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBeers(searchStr));
  }, [dispatch]);

  const handleAddFavorite = (beer: Beer) => {
    dispatch(addFavorite(beer));
  }

  const handleClickBeer = () => {
    const randIndex = Math.floor(Math.random() * 5);
    setSoundUrl(soundUrls[randIndex]);
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  }

  const handleSearch = () => {
    dispatch(fetchBeers(searchStr));
    setOpen(true);
    setPage(0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  }

  const handleGetRandomBeer = () => {
    dispatch(fetchRandomBeer()).then(() => {
      setOpen(true);
    });
  }

  const data: Beer[] = beers.slice(page * pagination, (page + 1) * pagination);

  return (
    <div className={classes.root}>
      <Container>
        {loading ? <CircularProgress /> : (
          <Fragment>
              <Box className={classes.search_box}>
                <TextField onChange={handleChange} value={searchStr} variant="outlined" placeholder="Search for beer..." ></TextField>
                <Button onClick={handleSearch} color="primary" variant="contained">Search</Button>
              </Box>
              <Button className={classes.random_btn} onClick={handleGetRandomBeer} color="primary" variant="contained">
                Get Random Beer
              </Button>
            <Grid container>
              {data.map((beer: Beer) => (
                <Grid key={beer.id} item xs={4}>
                  <BeerCard
                    beer={beer}
                    handleAddFavorite={handleAddFavorite}
                    handleClickBeer={handleClickBeer}
                    isFavorited={favoriteIds.includes(beer.id) ? true : false}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(beers.length / pagination)}
              page={page + 1}
              variant="outlined"
              shape="rounded"
              classes={{ root: classes.pagination }}
              onChange={handlePageChange}
            />
            <ReactPlayer
              url={soundUrl}
              width="400px"
              height="50px"
              playing={true}
              control="true"
              preload="metadata"
            />
            {
              !!randomBeer && (
                <RandomBeerModal
                  open={open}
                  data={randomBeer}
                  setOpen={setOpen}
                  handleAddFavorite={handleAddFavorite}
                  handleClickBeer={handleClickBeer}
                />
              )
            }
          </Fragment>
        )}
      </Container>
    </div>
  );
};
export default BeerList;