import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function TablePaginationDemo(prop) {
  const handleChangePage = (event, newPage) => {
    prop.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    prop.setRowsPerPage(parseInt(event.target.value));
  };

  return (
    <TablePagination
      component="div"
      page={prop.page}
      count={prop.totalCount}
      rowsPerPage={prop.rowsPerPage}
      rowsPerPageOptions={[50, 100, 150, 200, 250]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onPageChange={handleChangePage}
      offsetPage={prop.offsetPage}
    />
  );
}
