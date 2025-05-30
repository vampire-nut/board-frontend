import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import { useState } from "react";
// import { css } from '@emotion/react';
import { CircularProgress, Typography, useTheme } from "@mui/material";

interface Props {
  openLoading?: boolean;
}

Loadding.propTypes = {
  openLoading: PropTypes.bool,
};

function Loadding({ openLoading }: Props) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      //@ts-ignore
      open={openLoading}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loadding;
