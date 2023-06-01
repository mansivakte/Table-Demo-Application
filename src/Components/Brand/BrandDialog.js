import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function BrandDialog(props) {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Title : {props.brandDetails.title}
            <br />
            Description : {props.brandDetails.description}
            <br />
            Price : ${props.brandDetails.price}
            <br />
            {/* Created At : {props.brandDetails.category.creationAt}
            <br />
            Updated At : {props.brandDetails.category.updatedAt}
            <br /> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
