import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { follow, unFollow } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    position: "sticky",
    top: theme.spacing(13),
  },
  user: {
    marginBottom: theme.spacing(2.5),
  },
  userName: {
    cursor: "pointer",
  },
  suggestsSection: {
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  suggest: {
    color: "#8e8e8e",
  },
  suggestUser: {
    padding: theme.spacing(0.5, 0),
  },
  gray: {
    color: "#a7a7a7",
  },
  noSuggest: {
    color: "#a7a7a7",
    marginTop: theme.spacing(3),
  },
  btn: {
    textTransform: "none",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    cursor: "pointer",
  },
  cursor: {
    cursor: "pointer",
  },
}));

function SuggestItem({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleFollow = () => {
    dispatch(follow(user._id));
  };

  const handleUnfollow = () => {
    dispatch(unFollow(user._id));
  };

  return (
    <div className={classes.suggestUser}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Avatar
                src={user.avatar}
                alt="avatar"
                className={classes.cursor}
                onClick={() => history.push(`/users/${user?.userName}`)}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                className={classes.cursor}
                onClick={() => history.push(`/users/${user?.userName}`)}
              >
                {user.userName}
              </Typography>
              <Typography variant="body2" className={classes.gray}>
                Popular
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {currentUser.following.includes(user._id) ? (
            <Button className={classes.btn} onClick={handleUnfollow}>
              Following
            </Button>
          ) : (
            <Button
              className={classes.btn}
              color="primary"
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default function SideSuggestions({ users }) {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div className={classes.root}>
      <div className={classes.user}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              src={currentUser.avatar}
              alt="avatar"
              className={classes.large}
              onClick={() => history.push(`/users/${currentUser?.userName}`)}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              className={classes.userName}
              onClick={() => history.push(`/users/${currentUser?.userName}`)}
            >
              {currentUser.userName}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {currentUser.displayName}
            </Typography>
          </Grid>
        </Grid>
      </div>
      {users.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          className={classes.noSuggest}
        >
          Right now, there's no suggestions for you
        </Typography>
      ) : (
        <>
          <div className={classes.suggestsSection}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.suggest} variant="subtitle2">
                  Suggestions For You
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  component={NavLink}
                  to="/explore/people/suggested"
                  underline="none"
                  variant="subtitle2"
                  color="inherit"
                >
                  See All
                </Link>
              </Grid>
            </Grid>
          </div>

          {users.map((user, index) => (
            <SuggestItem key={index} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
