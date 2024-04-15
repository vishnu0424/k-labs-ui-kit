import React from "react";

import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  // NotificationsActiveOutlined as NotificationsIcon,
} from "@mui/icons-material";
// import Logo from "../../images/dq-gateway-logo.png";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import { ColorModeContext } from "../../theme/theme";
// import AccountSettings from "./AccountSettings";
// import ClientLogo from "../../images/client-logo.png";
// import ServiceStatusPopup from "./ServiceStatus/ServiceStatusPopup";
const Header = ({ openSideMenu, onClickMenuIcon }) => {
  const theme = useTheme();

  // const colorMode = useContext(ColorModeContext);

  // const [notification, setNotification] = useState(false);
  // const [msg, setMsg] = useState("");
  // const [aType, setAType] = useState("info");

  // const handleCloseNotification = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setNotification(false);
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="row" justifyContent="left" alignItems="center">
        <Grid item sm={4}>
          <Box className="v-center">
            <Box
              sx={{
                width: openSideMenu ? `calc(200px - ${24}px)` : " fit-content",
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

        <Grid item sm={4} textAlign="center">
          {/* <Typography
            variant="h5"
            marginBottom="0"
            gutterBottom
            component="div"
          >
            {t("DATA QUALITY GATEWAY")}
          </Typography> */}
        </Grid>
        <Grid item sm={4} className="headerIcons">
          {/* <Typography sx={{ minWidth: 30, fontSize: 25 }}>
              <Badge badgeContent={4} color="success">
                <NotificationsActiveOutlinedIcon />
              </Badge>
            </Typography> */}
          {/* <ServiceStatusPopup /> */}
          <Divider
            orientation="vertical"
            variant="string"
            flexItem
            style={{ backgroundColor: "#ccc", width: 2 }}
          />

          <Tooltip arrow placement="top" title={`${theme?.palette?.mode} mode`}>
            <IconButton
              size="small"
              sx={{
                background: "linear-gradient(45deg, #611EB6, #66A2EE)",
                color: "#fff",
              }}
              // onClick={colorMode.toggleColorMode}
            >
              {theme?.palette?.mode === "dark" ? (
                <DarkModeOutlinedIcon fontSize="small" />
              ) : (
                <LightModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* <AccountSettings /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
