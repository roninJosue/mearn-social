import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import unicornbikeImg from "./../assets/images/unicornbike.jpg";
import auth from "./../auth/auth-helper";
import FindPeople from "./../user/FindPeople";
import Newsfeed from "./../post/Newsfeed";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
}));

export default function Home({history}) {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);
  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div>
      {!defaultPage && (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia
                className={classes.media}
                image={unicornbikeImg}
                title="Unicorn Bicycle"
              />
              <CardContent>
                <Typography variant="body2" component="p">
                  Welcome to the MEARN Skeleton home page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {defaultPage &&
        <Grid container spacing={8}>
          <Grid item xs={8} sm={7}>
            {
              //<Newsfeed/>
            }
          </Grid>
          <Grid item xs={6} sm={5}>
            <FindPeople/>
          </Grid>
      </Grid>
      }
    </div>
  );
}
