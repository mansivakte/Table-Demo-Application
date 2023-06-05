import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserEditForm(props) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(props.updatedUser.title);
  }, [props]);

  const UserNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const handleClickOpen = () => {
    props.setEditorOpen(true);
  };

  const handleClickClose = () => {
    props.onSubmitHandler(userName);
    props.setEditorOpen(false);
  };

  return (
    <div>
      <Dialog open={props.editorOpen} onClose={handleClickClose}>
        <DialogTitle>Form</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={UserNameHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
