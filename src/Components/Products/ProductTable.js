import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationDemo from "../Common/Pagination/Pagination";
import Loader from "../Common/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ProductDialog from "./ProductDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import ProductEditForm from "./ProductEditForm";
import Tooltip from "@mui/material/Tooltip";

export default function ProductTable() {
  const [product, setProduct] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [productCount, setProductCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [offsetPage, setOffsetPage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((params) => {
        setProductCount(params.data.length);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.escuelajs.co/api/v1/products?offset=" +
          (page * rowsPerPage + 1) +
          "&limit=" +
          rowsPerPage
      )
      .then((params) => {
        setProduct(params.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [rowsPerPage, page, currentPage, offsetPage]);

  const viewHandler = (id) => {
    // product.id;
    // let foundRecord = {};
    // product.forEach((record) => {
    //   if (record.id == id) {
    //     foundRecord = record;
    //   }
    // });
    const foundRecord = product.find((record) => record.id == id);
    // const foundRecord = product.filter((record) => record.id == id);
    setShowDetails(foundRecord);
    setOpen(true);
  };

  const deleteHandler = (id) => {
    setProduct([...product].filter((product) => product.id !== id));
    alert("Recorde Deleted");
  };

  const editHandler = (row) => {
    setUpdatedProduct(row);
    setEditorOpen(true);
  };

  const onSubmitHandler = (productTitle, productPrice) => {
    const UpdatedRecord = product.map((record) => {
      if (record.id == updatedProduct.id) {
        record.title = productTitle;
        record.price = productPrice;
      }
      return record;
    });
    setProduct(UpdatedRecord);
  };

  //   let productRecord = {};
  //   const Data = props.product.map((record) => {
  //     if (record.id == props.editedData.id) {
  //       productRecord = record;
  //     }
  //   });
  // };

  // const EditedProductData = (productTitle, productPrice) => {
  //   console.log("productTitle=>", productTitle);
  //   console.log("productPrice=>", productPrice);
  // };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h3>Product Table</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductDialog
            open={open}
            setOpen={setOpen}
            showDetails={showDetails}
          />
          <ProductEditForm
            editorOpen={editorOpen}
            setEditorOpen={setEditorOpen}
            onSubmitHandler={onSubmitHandler}
            updatedProduct={updatedProduct}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr.No</TableCell>
                  <TableCell align="left">TITLE</TableCell>
                  <TableCell align="left">PRICE in $</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + 1 + index}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">$ {row.price}</TableCell>
                    <TableCell align="left">
                      <Stack
                        direction="row"
                        spacing={1.5}
                        style={{ cursor: "pointer" }}
                      >
                        <Tooltip title="View">
                          <VisibilityIcon
                            width={30}
                            onClick={() => {
                              viewHandler(row.id);
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <DeleteIcon
                            width={30}
                            onClick={() => {
                              deleteHandler(row.id);
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Edit">
                          <EditIcon
                            width={30}
                            onClick={() => {
                              editHandler(row);
                            }}
                          />
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationDemo
            page={page}
            setPage={setPage}
            totalCount={productCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
            setOffsetPage={setOffsetPage}
          />
        </>
      )}
    </div>
  );
}
