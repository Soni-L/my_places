import "./App.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MapContainer from "./components/MapContainer";
import { useState } from "react";
import AddLocationDialog from "./components/AddLocationDialog";
import useLocalStorage from "use-local-storage";
import Navbar from "./components/NavBar/Navbar";
import LocationsListView from "./components/LocationsListView";

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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState({ id: null });
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
      <Navbar />
      <div className="page-content-container">
        <div className="page-content-container-map-container">
          <MapContainer
            selectedLocation={selectedLocation}
            setSelectedLocation={(location) => setSelectedLocation(location)}
            addLocationClick={(event) => {
              setAddLocationDialog({ open: true, ...event });
            }}
          />
        </div>

        <div className="page-content-container-list-container">
          <LocationsListView
            items={items}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            handleDelete={handleDelete}
          />
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
