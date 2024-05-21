import React from "react";
import { Pagination } from "@mui/material";

function Paginations(props) {
  return (
    <>
      {props.totalPages > 1 && (
        <Pagination
          count={props.totalPages}
          page={props.currentPage}
          onChange={props.handlePageChange}
          color="secondary"
          variant="outlined"
          //   showFirstButton
          //   showLastButton
        />
      )}
    </>
  );
}

export default Paginations;
