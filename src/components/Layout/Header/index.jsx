import React, { useContext } from "react";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  AppBar as MuiAppBar,
  Toolbar,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { SideBarContext } from "../../../utils";
import "./header.css";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 2,
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

const Header = ({ colorMode, accountSettings, children }) => {
  const theme = useTheme();
  const { drawerWidth, setDrawerWidth } = useContext(SideBarContext);
  const openSideMenu = drawerWidth === 200;

  const onClickMenuIcon = () => {
    setDrawerWidth((prevState) => (prevState === 200 ? 56 : 200));
  };

  return (
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
          >
            <Grid item sm={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: openSideMenu
                      ? `calc(200px - ${24}px)`
                      : "fit-content",
                  }}
                >
                  <IconButton
                    sx={{ mr: 2 }}
                    size="small"
                    onClick={onClickMenuIcon}
                    edge="start"
                  >
                    {openSideMenu ? <ChevronLeftIcon /> : <MenuIcon />}
                  </IconButton>
                </Box>
                <Box>
                  {/* <img src={Logo} height="26px" alt="logo-notavailable" /> */}
                  {/* <img src={ClientLogo} height="26px" alt="logo-notavailable" /> */}
                </Box>
              </Box>
            </Grid>

            <Grid item sm={4} textAlign="center"></Grid>

            <Grid item sm={4} className="headerIcons">
              {children}
              <Divider
                orientation="vertical"
                variant="string"
                flexItem
                style={{ backgroundColor: "#ccc", width: 2 }}
              />
              <Tooltip
                arrow
                placement="top"
                title={`${theme?.palette?.mode} mode`}
              >
                <IconButton
                  size="small"
                  sx={{
                    background: "linear-gradient(45deg, #611EB6, #66A2EE)",
                    color: "#fff",
                  }}
                  onClick={colorMode.toggleColorMode}
                >
                  {theme?.palette?.mode === "dark" ? (
                    <DarkModeOutlinedIcon fontSize="small" />
                  ) : (
                    <LightModeOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              {accountSettings}
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
