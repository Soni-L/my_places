import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useLocalStorageArray from "../hooks/useLocalStorageArray";

export default function AddLocationDialog({ dialogOptions, handleClose }) {
  const { items, addItem } = useLocalStorageArray();

  return (
    <React.Fragment>
      <Dialog
        open={dialogOptions.open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            addItem({
              name: formJson.name,
              lat: dialogOptions.lat,
              lng: dialogOptions.lng,
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Location Name"
            fullWidth
            variant="standard"
          />
          <Typography id="lat" variant="body2">
            Lat: {dialogOptions.lat}
          </Typography>
          <Typography id="lng" variant="body2">
            Lng: {dialogOptions.lng}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add Location</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
