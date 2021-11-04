import { FC } from 'react';
import { Beer } from '../../module/beers/beersSlice';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import { Star } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

  }),
);

interface BeerCardProps {
  beer: Beer;
  handleAddFavorite: (beer: Beer) => void;
  handleClickBeer: () => void;
  isFavorited: boolean;
}

const cutString = (input: string) => {
  return input.length > 100 ? input.substring(0, 70) + '...' : input;
}

const BeerCard: FC<BeerCardProps> = ({ beer, handleAddFavorite, handleClickBeer, isFavorited }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container >
        <Grid className={classes.img_cover} item xs={4}>
          <Button onClick={() => handleClickBeer()}>
            <img src={beer.image_url} className={classes.img} alt={beer.name}/>
          </Button>
        </Grid>
        <Grid item xs={8}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.start_mark}>
                <Button disabled={isFavorited ? true : false} onClick={() => handleAddFavorite(beer)}><Star color={isFavorited ? "primary" : "inherit"} /></Button>
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
  );
}

export default BeerCard;