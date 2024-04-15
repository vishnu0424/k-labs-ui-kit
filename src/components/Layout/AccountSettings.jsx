import React, { useContext, useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ListItemIcon,
  Avatar,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../../services/auth.service";
import { UserDetailsContext } from "../../services/UserDetailsContext";

const LANGUAGES = {
  ENGLISH: "en",
  SPANISH: "es",
};

const AccountSettings = () => {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    const reqData = {
      UserId: userDetails?.UserId,
      SessionId: userDetails?.SessionId,
    };

    const logoutPromise = authService.logout(reqData);

    localStorage.removeItem("userDataValidation");
    setUserDetails({});
    navigate("/login");

    logoutPromise.catch((error) => {
      console.error("Error during logout:", error);
    });
  };

  const handleLanguageChange = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    setSelectedLanguage(languageValue);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{ gap: 0.5, cursor: "pointer" }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className="v-center"
      >
        <Avatar alt="" sx={{ width: 26, height: 26 }} />
        <Typography variant="bold">
          {userDetails?.FirstName?.split(" ")?.[0]}
        </Typography>
        <KeyboardArrowDownRoundedIcon fontSize="small" />
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 0,
          },
          "&:before": {
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ px: 0 }}>
          <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
            <InputLabel>{t("Language")}</InputLabel>
            <Select
              value={selectedLanguage}
              label="Language"
              onChange={handleLanguageChange}
            >
              <MenuItem value={LANGUAGES.ENGLISH}>English</MenuItem>
              <MenuItem value={LANGUAGES.SPANISH}>Español</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          {t("Logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountSettings;
