import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Box, Typography, CircularProgress } from "@mui/material";
import DiscFullOutlinedIcon from "@mui/icons-material/DiscFullOutlined";
import { useState, useEffect } from "react";
import ApiService from "../../../services/app.service";
import { useTranslation } from "react-i18next";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Avatar from "@mui/material/Avatar";

import CircleIcon from "@mui/icons-material/Circle";

export default function ServiceStatusPopup() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [services, setServices] = useState({
    DQGEngine: true,
    DQGService: true,
  });

  const [loaderService, setLoaderService] = useState(false);
  const [loaderEngine, setLoaderEngine] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDataServer = async () => {
    try {
      await ApiService.DQGServerHealthcheck();
      setServices({ ...services, DQGService: true });
      setLoaderService(true);
    } catch (e) {
      setLoaderService(true);
      setServices({ ...services, DQGService: false });
    }
  };
  const getDataEngine = async () => {
    try {
      setLoaderEngine(true);
      await ApiService.DQGEngineHealthcheck();
      setServices({ ...services, DQGEngine: true });
    } catch (e) {
      setLoaderEngine(true);
      setServices({ ...services, DQGEngine: false });
    }
  };

  useEffect(() => {
    if (open) {
      getDataServer();
      getDataEngine();
    } else {
      setServices({
        DQGEngine: true,
        DQGService: true,
      });
      setLoaderService(false);
      setLoaderEngine(false);
    }
  }, [open]);

  const DQGServiceStatus = services?.DQGService ? "Online" : "Offline";
  const DQGEngineStatus = services?.DQGEngine ? "Online" : "Offline";
  return (
    <Box>
      <Tooltip title={t("service_status")} arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            background: "linear-gradient(45deg, #611EB6, #66A2EE)",
            color: "#fff",
          }}
          aria-controls={open ? "service-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <DiscFullOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Menu
        className="notItems statusItems"
        anchorEl={anchorEl}
        id="service-menu"
        open={open}
        onClose={handleClose}
        sx={{ elevation: 0 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography variant="h6">Status of DQG Services : </Typography>
        <Box className="listBox webSerStatus">
          <MenuItem className={services?.DQGService && "statusOnline"}>
            {loaderService ? (
              <>
                <Avatar sx={{ width: 20, height: 20 }}>
                  <CircleIcon />
                </Avatar>

                <Typography>
                  DQG Service - <Box component="span">{DQGServiceStatus}</Box>
                </Typography>
              </>
            ) : (
              <CircularProgress
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              />
            )}
          </MenuItem>
          <MenuItem className={services?.DQGEngine && "statusOnline"}>
            {loaderEngine ? (
              <>
                <Avatar sx={{ width: 20, height: 20 }}>
                  <CircleIcon />
                </Avatar>
                <Typography>
                  DQG Engine - <Box component="span">{DQGEngineStatus}</Box>
                </Typography>
              </>
            ) : (
              <CircularProgress
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              />
            )}
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
}
