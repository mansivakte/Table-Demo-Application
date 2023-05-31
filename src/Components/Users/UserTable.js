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
import TablePaginationDemo from "../Common/Pagination/Pagination";
import Loader from "../Common/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserDialog from "./UserDialog";

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

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  // Loader
  const [isLoading, setIsLoading] = useState(true);
  // Dialog
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [offsetPage, setOffsetPage] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((params) => {
        setUserCount(params.data.length);
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
      .then((record) => {
        setUsers(record.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [page, rowsPerPage, offsetPage, currentPage]);

  const detailsHandler = (id) => {
    const foundUser = users.find((record) => record.id == id);
    setUserDetails(foundUser);
    setOpen(true);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h3>Users Table</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <UserDialog setOpen={setOpen} open={open} userDetails={userDetails} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">USER NAME</StyledTableCell>
                  <StyledTableCell align="left">
                    USER WEIGHT in gm
                  </StyledTableCell>
                  <StyledTableCell align="left">VIEW DETAILS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {page * rowsPerPage + 1 + index}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.price} gm
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <VisibilityIcon
                        onClick={() => {
                          detailsHandler(row.id);
                        }}
                      ></VisibilityIcon>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationDemo
            page={page}
            setPage={setPage}
            totalCount={userCount}
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
