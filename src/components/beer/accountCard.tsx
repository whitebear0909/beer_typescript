import { FC } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {Chip, Grid, Card, CardContent, Typography, Link} from '@material-ui/core';
import {InsertLink} from '@material-ui/icons';
import { useEthers } from "@usedapp/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: 10,
      border: 1,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      borderColor: 'blue',
      margin:20,
    },
    mt_20: {
      marginTop: 20
    },
    link: {
      display: 'flex'
    }
  }),
);

interface AccountCardProps {
  setOpen: (open: boolean) => void;
}

const AccountCard: FC<AccountCardProps> = ({setOpen}) => {
  const classes = useStyles();
  const { account, deactivate } = useEthers();
  const handleClick = () => {
    deactivate();
    setOpen(false);
  }

  return (
    <Card className={classes.root}>
      <Grid container >
        <Grid>
            <CardContent>
              <Grid container>
                <Typography  variant="subtitle1">
                  Connected with MetaMask!
                </Typography>
              </Grid>
              <Grid container className={classes.mt_20}>
                <Grid item xs={7}>
                  <Typography  variant="subtitle1">
                    {account &&
                      `${account.slice(0, 6)}...${account.slice(
                        account.length - 4,
                        account.length
                      )}`}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Chip
                      color="primary"
                      size="medium"
                      label="Disconnect"
                      onClick={handleClick}
                    />
                </Grid>
              </Grid>
              <Grid container className={classes.mt_20}>
                <Link className={classes.link} target="_blank" href={`https://ropsten.etherscan.io/address/${account}`}>
                  <InsertLink/>View on Explorer
                </Link>
              </Grid>
            </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountCard;