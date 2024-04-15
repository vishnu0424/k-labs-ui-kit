import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  useTheme,
  Divider,
} from "@mui/material";
import {
  BackupTableOutlined as BackupTableIcon,
  FactCheckOutlined as FactCheckIcon,
  ScheduleOutlined as ScheduleIcon,
  AllInclusiveOutlined as AllInclusiveIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// import whiteLogo from "../../images/kitap-white.png";
// import darkLogo from "../../images/kitap-black.png";
// import Logo2 from "../../images/kitap-white.png";

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

const SideMenu = ({ openSideMenu }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const menuItems = [
    { to: "/", text: t("side_bar_applications"), Icon: BackupTableIcon },
    {
      to: "/testcaseslist",
      text: t("side_bar_testcases"),
      Icon: FactCheckIcon,
    },
    { to: "/testsuites", text: t("side_bar_testsuites"), Icon: FactCheckIcon },
    { to: "/agents", text: t("side_bar_agents"), Icon: AllInclusiveIcon },
    { to: "/engines", text: t("Engines"), Icon: AllInclusiveIcon },
    {
      to: "/executionsreport?source=all",
      text: "Execution Reports",
      Icon: FactCheckIcon,
    },
    {
      to: "/cicdpipeline",
      text: t("side_bar_cicdpipelines"),
      Icon: AllInclusiveIcon,
    },
    {
      to: "/scheduledtests",
      text: t("side_bar_scheduletests"),
      Icon: ScheduleIcon,
    },
  ];

  // const Logo1 = theme?.palette?.mode === "dark" ? whiteLogo : darkLogo;
  return (
    <Box>
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
          text={item.text}
          Icon={item.Icon}
        />
      ))}
    </Box>
  );
};

export default SideMenu;
