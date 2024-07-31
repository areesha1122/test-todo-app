import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const AppLoader = ({ height = "100%" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: height,
      }}
    >
      <CircularProgress size={48} style={{ color: '#fff' }} />
    </Box>
  );
};
