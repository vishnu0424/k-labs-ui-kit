import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { SideBarContext } from "../../../utils";
import "./innerheader.css";

const InnerHeader = ({ children }) => {
  const { drawerWidth } = useContext(SideBarContext);
  return (
    <Paper
      className="innerHeaderContainer"
      sx={{
        height: "58px",
        width: `calc(100% - ${200}px)`,
        maxWidth: `calc(100% - ${200}px)`,
        boxSizing: "border-box",
      }}
    >
      <Box className="innerHeader">{children}</Box>
    </Paper>
  );
};

export default InnerHeader;
