import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  useTheme,
  Divider,
  Drawer as MuiDrawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SideBarContext } from "../../../utils";
import "./sideMenu.css";

const defaultDrawerWidth = 200;

const openedMixin = (theme) => ({
  width: defaultDrawerWidth,
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

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: defaultDrawerWidth,
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  minHeight: "52px !important",
}));

const SideMenuItem = ({ to, text, Icon }) => (
  <NavLink to={to} style={{ textDecoration: "none" }}>
    <ListItem button>
      <Tooltip title={text} placement="top-end" arrow>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={text} color="inherit" />
    </ListItem>
  </NavLink>
);

const SideMenu = ({ menuItems, darkLogo, lightLogo, logoIcon }) => {
  const theme = useTheme();
  const { drawerWidth } = useContext(SideBarContext);
  const openSideMenu = drawerWidth === 200;
  const isDarkLogo = theme?.palette?.mode === "dark" ? lightLogo : darkLogo;

  return (
    <DrawerStyled
      variant="permanent"
      open={openSideMenu}
      className="sidemenuCus"
    >
      <DrawerHeader />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src={openSideMenu ? isDarkLogo : logoIcon}
          height="50px"
          alt="logo-notavailable"
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      {menuItems.map((item, index) => (
        <SideMenuItem
          key={index}
          to={item.to}
          text={item.text}
          Icon={item.Icon}
        />
      ))}
    </DrawerStyled>
  );
};

export default SideMenu;
