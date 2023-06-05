import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    setBrandName(props.updatedBrand.title);
  }, [props]);

  const handleClickOpen = () => {
    props.setEditorOpen(true);
  };

  const handleClose = () => {
    props.onSubmitHandler(brandName);
    props.setEditorOpen(false);
  };

  const BrandNameHandler = (event) => {
    setBrandName(event.target.value);
  };

  return (
    <div>
      <Dialog open={props.editorOpen} onClose={handleClose}>
        <DialogTitle>Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand Name"
            type="text"
            fullWidth
            variant="standard"
            value={brandName}
            onChange={BrandNameHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
