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
import React, { useState, useMemo, createContext } from "react";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  borderRight: 0,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  minHeight: "52px !important",
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export const SideBarContext = createContext({});

const Layout = () => {
  const [drawerWidth, setDrawerWidth] = useState(200);
  const openSideMenu = drawerWidth === 200;

  // Memoize the context value
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
            <Header
              openSideMenu={openSideMenu}
              // onClickMenuIcon={onClickMenuIcon}
            />
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={openSideMenu} className="sidemenuCus">
          <DrawerHeader />
          <SideMenu openSideMenu={openSideMenu} />
        </Drawer>
      </Box>
    </SideBarContext.Provider>
  );
};

export default Layout;
