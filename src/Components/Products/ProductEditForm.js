import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductTable from "./ProductTable";

export default function ProductEditForm(props) {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    setProductTitle(props.updatedProduct.title);
    setProductPrice(props.updatedProduct.price);
  }, [props]);

  const handleClickOpen = () => {
    props.setEditorOpen(true);
  };

  const handleClose = () => {
    props.setEditorOpen(false);
  };

  const handleChangeTitle = (event) => {
    setProductTitle(event.target.value);
  };
  const handleChangePrice = (event) => {
    setProductPrice(event.target.value);
  };

  return (
    <div>
      <Dialog open={props.editorOpen} onClose={handleClose}>
        <DialogTitle>Form</DialogTitle>
        <DialogContent>
          <DialogContentText>Title</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={productTitle}
            onChange={handleChangeTitle}
          />
          <DialogContentText>Price</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={productPrice}
            onChange={handleChangePrice}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onSubmitHandler(productTitle, productPrice);
              props.setEditorOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
