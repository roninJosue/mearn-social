import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Redirect } from "react-router";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        userId: props.userId,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
