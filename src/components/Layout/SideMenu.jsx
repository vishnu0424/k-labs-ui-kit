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
import {
  BackupTableOutlined as BackupTableIcon,
  FactCheckOutlined as FactCheckIcon,
  ScheduleOutlined as ScheduleIcon,
  AllInclusiveOutlined as AllInclusiveIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { SideBarContext } from "../../utils";
// import whiteLogo from "../../images/dq-gateway-logo.png";
// import darkLogo from "../../images/dq-gateway-logo-dark.png";
// import Logo2 from "../../images/DQG - Logo-small.svg";

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
      <ListItemText primary={text} color="white" />
    </ListItem>
  </NavLink>
);

const menuItems = [
  { to: "/", text: "side_bar_applications", Icon: BackupTableIcon },
  { to: "/testcaseslist", text: "side_bar_testcases", Icon: FactCheckIcon },
  { to: "/testsuites", text: "side_bar_testsuites", Icon: FactCheckIcon },
  { to: "/agents", text: "side_bar_agents", Icon: AllInclusiveIcon },
  { to: "/engines", text: "Engines", Icon: AllInclusiveIcon },
  {
    to: "/executionsreport?source=all",
    text: "Execution Reports",
    Icon: FactCheckIcon,
  },
  {
    to: "/cicdpipeline",
    text: "side_bar_cicdpipelines",
    Icon: AllInclusiveIcon,
  },
  { to: "/scheduledtests", text: "side_bar_scheduletests", Icon: ScheduleIcon },
];

const SideMenu = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { drawerWidth } = useContext(SideBarContext);
  const openSideMenu = drawerWidth === 200;

  return (
    <DrawerStyled
      variant="permanent"
      open={openSideMenu}
      className="sidemenuCus"
    >
      <DrawerHeader />
      <Box className="center">
        {/* {openSideMenu ? (
          <img src={Logo1} height="50px" alt="logo-notavailable" />
        ) : (
          <img src={Logo2} height="50px" alt="logo-notavailable" />
        )} */}
      </Box>
      <Divider sx={{ my: 1 }} />
      {menuItems.map((item, index) => (
        <SideMenuItem
          key={index}
          to={item.to}
          text={t(item.text)}
          Icon={item.Icon}
        />
      ))}
    </DrawerStyled>
  );
};

export default SideMenu;
