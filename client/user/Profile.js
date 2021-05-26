import React, { useState, useEffect } from "react";
import { read } from "./api-user";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import DeleteUser from './DeleteUser'
import { Link } from "react-router-dom";
import FollowProfileButton from "./FollowProfileButton";
import FollowGrid from "./FollowGrid";
import FindPeople from "./FindPeople";

const useStyles = makeStyles(theme=>({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
}))

export default function Profile({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: {following: [], followers: []},
    redirectToSignin: false,
    following: false
  })

  const jwt = auth.isAuthenticated();
  

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        let following = checkFollow(data)
        setValues({...values, user: data, following: following})
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === jwt.user._id
    })

    return match
  }

  const clickFollowButton = (callApi) => {
    callApi({
      userId: jwt.user._id
    },{
      t: jwt.token
    }, values.user._id).then((data) => {
      if(data.error){
        setValues({...values, error:data.error})
      }else{
        setValues({...values, user: data, following: !values.following})
      }
    })
  }

  const photoUrl = values.user._id 
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : '/api/users/defaultPhoto'

  if (values.redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar}/>
          </ListItemAvatar>
          <ListItemText primary={values.user.name} secondary={values.user.email} />
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id == values.user._id 
            ? (<ListItemSecondaryAction>
                <Link to={`/user/edit/${values.user._id}`}>
                    <IconButton aria-label='Edit' color='primary'>
                        <Edit />
                    </IconButton>
                </Link>
                <DeleteUser userId={values.user._id} />
              </ListItemSecondaryAction>)
            :(<FollowProfileButton following={values.following} onButtonClick={clickFollowButton} />)
          }
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={values.user.about}
            secondary={`Joined: ${new Date(values.user.created).toDateString()}`}
          />
        </ListItem>
        <FollowGrid people={values.user.following}/>
        <FollowGrid people={values.user.followers}/>
        <FindPeople />
      </List>
    </Paper>
  );
}
