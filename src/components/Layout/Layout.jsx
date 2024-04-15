import { styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  Paper,
} from "@mui/material";
import Header from "./Header";
import SideMenu from "./SideMenu";
import React, { useState, useMemo } from "react";
import { SideBarContext } from "../../utils";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 3,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Layout = () => {
  const [drawerWidth, setDrawerWidth] = useState(200);
  const openSideMenu = drawerWidth === 200;
  const contextValue = useMemo(
    () => ({ setDrawerWidth, drawerWidth }),
    [setDrawerWidth, drawerWidth]
  );
  return (
    <SideBarContext.Provider value={contextValue}>
      <Box>
        <AppBar
          enableColorOnDark
          position="fixed"
          open={openSideMenu}
          className="headerCus"
          sx={{ backgroundColor: "transparent !important" }}
        >
          <Toolbar
            component={Paper}
            sx={{ border: 0, boxShadow: 0, borderRadius: 0 }}
          >
            <Header />
          </Toolbar>
        </AppBar>

        <SideMenu />
      </Box>
    </SideBarContext.Provider>
  );
};

export default Layout;
