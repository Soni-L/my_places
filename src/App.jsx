import "./App.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MapContainer from "./components/MapContainer";
import { useState } from "react";
import AddLocationDialog from "./components/AddLocationDialog";
import useLocalStorage from "use-local-storage";

const AlertDialog = ({ handleClose, handleAgree, dialogOptions }) => {
  return (
    <Dialog
      open={dialogOptions.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete :{" "}
          <span style={{ fontWeight: "bold" }}>{dialogOptions.name}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleAgree(dialogOptions.id);
            handleClose();
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function App() {
  const [items, setItems] = useLocalStorage("my_locations", []);
  const [addLocationDialog, setAddLocationDialog] = useState({ open: false });
  const [alertDialog, setAlertDialog] = useState({
    dialogOptions: addLocationDialog,
    open: false,
  });

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDelete = (item) => {
    setAlertDialog({ open: true, ...item });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "60px" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Places
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="page-content-container">
        <div className="page-content-container-map-container">
          <MapContainer
            addLocationClick={(event) => {
              setAddLocationDialog({ open: true, ...event });
            }}
          />
        </div>

        <div className="page-content-container-list-container">
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  margin: "3px",
                }}
              >
                <IconButton size="sm">
                  <ListItemIcon>
                    <LocationSearchingIcon />
                  </ListItemIcon>
                </IconButton>
                <ListItemText sx={{ color: "black" }} primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <AddLocationDialog
        dialogOptions={addLocationDialog}
        handleClose={() => setAddLocationDialog({ open: false })}
      />
      <AlertDialog
        handleClose={() => setAlertDialog({ open: false })}
        handleAgree={deleteItem}
        dialogOptions={alertDialog}
      />
    </>
  );
}

export default App;
