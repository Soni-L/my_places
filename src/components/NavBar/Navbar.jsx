import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Navbar.module.css";
import useScreenSize from "../../hooks/useScreenSize";

export default function Navbar({
  items,
  selectedLocation,
  setSelectedLocation,
  handleDelete,
}) {
  const { width } = useScreenSize();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Places
          </Typography>
          <Tooltip title="My Saved Locations">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {width <= 768 && (
                <MenuIcon sx={{ width: 32, height: 32 }}></MenuIcon>
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflowY: "scroll",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: "10px",
                ml: "14px",
                height: "calc(100vh - 60px)",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {items.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "6px",
                  margin: "3px",
                  width: "200px",
                }}
              >
                <IconButton
                  size="xs"
                  onClick={() =>
                    setSelectedLocation({ id: item.id, selectSource: "list" })
                  }
                >
                  {selectedLocation.id === item.id ? (
                    <MyLocationIcon
                      sx={{ color: "#388e3c", height: "20px", width: "20px" }}
                    />
                  ) : (
                    <LocationSearchingIcon
                      style={{ height: "20px", width: "20px" }}
                    />
                  )}
                </IconButton>
                <ListItemText sx={{ color: "black" }} primary={item.name} />
                <IconButton
                  size="xs"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item)}
                >
                  <DeleteIcon
                    style={{ color: "red", height: "20px", width: "20px" }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
