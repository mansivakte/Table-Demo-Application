import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../Common/Loader/Loader";
import Pagination from "../Common/Pagination/Pagination";
import BrandDialog from "./BrandDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, Tooltip } from "@mui/material";
import BrandEditForm from "./BrandEditForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BrandTable() {
  const [brand, setBrand] = useState([]);
  const [brandCount, setBrandCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [brandDetails, setBrandDetails] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [offsetPage, setOffsetPage] = useState(0);

  const [updatedBrand, setUpdatedBrand] = useState({});
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((record) => {
        setBrandCount(record.data.length);
      })
      .catch((error) => {
        console.log("error", error);
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
      .then((record) => {
        setBrand(record.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [page, rowsPerPage, currentPage, offsetPage]);

  const viewHandler = (id) => {
    const foundRecord = brand.find((record) => record.id == id);
    setBrandDetails(foundRecord);
    console.log("Found Brand Record=>", foundRecord);
    setOpen(true);
  };

  const editorHandler = (row) => {
    setUpdatedBrand(row);
    setEditorOpen(true);
  };

  const onSubmitHandler = (brandName) => {
    const changedRecored = brand.map((record) => {
      if (record.id == updatedBrand.id) {
        record.category.name = brandName;
      }
      return record;
    });
    setBrand(changedRecored);
  };

  const deleteHandler = (id) => {
    setBrand([...brand].filter((brand) => brand.id !== id));
    alert("Recorde Deleted");
  };

  return (
    <>
      <h3>Brand Table</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BrandDialog
            open={open}
            setOpen={setOpen}
            brandDetails={brandDetails}
          />
          <BrandEditForm
            editorOpen={editorOpen}
            setEditorOpen={setEditorOpen}
            updatedBrand={updatedBrand}
            onSubmitHandler={onSubmitHandler}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left"> Brand Name</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Updated At</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brand.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {page * rowsPerPage + 1 + index}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.category.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.category.creationAt}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.category.updatedAt}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Stack
                        direction="row"
                        spacing={1.5}
                        style={{ cursor: "pointer" }}
                      >
                        <Tooltip title="view">
                          <VisibilityIcon
                            onClick={() => {
                              viewHandler(row.id);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <EditIcon
                            onClick={() => {
                              editorHandler(row);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon
                            onClick={() => {
                              deleteHandler(row.id);
                            }}
                          />
                        </Tooltip>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={brandCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
            setOffsetPage={setOffsetPage}
          />
        </>
      )}
    </>
  );
}
